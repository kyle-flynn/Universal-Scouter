import {Router, Request, Response} from 'express';
import Database from '../Database';
import {SchemaEntry} from 'universal-scouter-shared';

const router: Router = Router();

/* GET requests for entries */
router.get('/all/:schema_id', async (req: Request, res: Response) => {
  const values = await Database.getAllSchemaEntries(req.params.schema_id);
  res.send({response: values});
});

router.get('/:entry_id', async (req: Request, res: Response) => {
  const values = await Database.getEntry(req.params.entry_id);
  if (values.length > 0) {
    res.send({response: values[0]});
  } else {
    res.status(404).send('Unable to locate schema entry.');
  }
});

/* POST requests for entries */
router.post('/:schema_id', async (req: Request, res: Response) => {
  await Database.insertEntry(new SchemaEntry().fromJSON(req.body));
  const values = Database.getAllSchemaEntries(req.params.schema_id);
  res.send({response: values});
});

/* PUT requests for entries */
router.post('/:schema_id', async (req: Request, res: Response) => {
  await Database.updateEntry(new SchemaEntry().fromJSON(req.body));
  const values = Database.getAllSchemaEntries(req.params.schema_id);
  res.send({response: values});
});

/* DELETE requests for entries */
router.delete('/all/:schema_id', async (req: Request, res: Response) => {
  await Database.deleteAllEntries(req.params.schema_id);
  const values = Database.getAllSchemaEntries(req.params.schema_id);
  res.send({response: values});
});

router.delete('/:entry_id', async (req: Request, res: Response) => {
  await Database.deleteEntry(req.params.entry_id);
  const values = Database.getAllSchemaEntries(req.params.schema_id);
  res.send({response: values});
});

export default router;