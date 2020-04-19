import parser from 'body-parser';
import cors from 'cors';
import express, {Application, Request, Response} from 'express';
import SchemaController from './controllers/SchemaController';

const app: Application = express();
const port = 8080;

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

app.use('/api/schemas', SchemaController);

app.get('/api//ping', (req: Request, res: Response) => {
  res.send('pong!');
});

app.listen(port, () => {
  console.log(`Universal Scouting server listening on port ${port}`);
});