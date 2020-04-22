import {Router, Request, Response} from 'express';
import Database from '../Database';
import {SchemaEntry} from 'universal-scouter-shared';

const router: Router = Router();

/* GET requests for entries */
router.get('/all/:schema_id', async (req: Request, res: Response) => {
  const rawValues = await Database.getAllSchemaEntries(req.params.schema_id);
  const entries: SchemaEntry[] = [];
  for (const value of rawValues) {
    entries.push(createEntry(value));
  }
  res.send({response: entries.map((e: SchemaEntry) => e.toJSON())});
});

router.get('/:entry_id', async (req: Request, res: Response) => {
  const values = await Database.getEntry(req.params.entry_id);
  if (values.length > 0) {
    const entry: SchemaEntry = createEntry(values[0]);
    res.send({response: entry.toJSON()});
  } else {
    res.status(404).send('Unable to locate schema entry.');
  }
});

/* POST requests for entries */
router.post('/:schema_id', async (req: Request, res: Response) => {
  const entries = (await Database.getAllSchemaEntries(req.params.schema_id));
  let highestId: number = -1;
  for (const entry of entries) {
    const id: number = parseInt((entry as any).entry_id.split('-')[1], 10);
    if (id > highestId) {
      highestId = id;
    }
  }
  const schema: SchemaEntry = new SchemaEntry().fromJSON(req.body);
  schema.entryId = `${req.params.schema_id}-${highestId + 1}`;
  await Database.insertEntry(schema);
  const values = await Database.getAllSchemaEntries(req.params.schema_id);
  res.send({response: values.map((e: any) => createEntry(e).toJSON())});
});

/* PUT requests for entries */
router.put('/:schema_id', async (req: Request, res: Response) => {
  await Database.updateEntry(new SchemaEntry().fromJSON(req.body));
  const values = await Database.getAllSchemaEntries(req.params.schema_id);
  res.send({response: values.map((e: any) => createEntry(e).toJSON())});
});

/* DELETE requests for entries */
router.delete('/all/:schema_id', async (req: Request, res: Response) => {
  await Database.deleteAllEntries(req.params.schema_id);
  const values = await Database.getAllSchemaEntries(req.params.schema_id);
  res.send({response: values.map((e: any) => createEntry(e).toJSON())});
});

router.delete('/:entry_id', async (req: Request, res: Response) => {
  try {
    const id: string = req.params.entry_id.split('-')[0];
    await Database.deleteEntry(req.params.entry_id);
    const values = await Database.getAllSchemaEntries(id);
    res.send({response: values.map((e: any) => createEntry(e).toJSON())});
  } catch {
    res.status(400).send('Unable to convert entry id to schema id.');
  }
});

function createEntry(value: any): SchemaEntry {
  const entry: SchemaEntry = new SchemaEntry();
  entry.entryId = (value as any).entry_id;
  entry.match = (value as any).match;
  entry.team = (value as any).team;
  delete (value as any).entry_id;
  delete (value as any).match;
  delete (value as any).team;
  for (const field in value) {
    if (value.hasOwnProperty(field)) {
      (entry.properties as any)[field] = (value as any)[field];
    }
  }
  return entry;
}

export default router;