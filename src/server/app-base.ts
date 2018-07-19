import * as express from 'express';
import { initial } from './initial';
import { render } from './renderApp';
import { decrpty } from './decryptApp';

const app = express();

app.use(initial);

app.use(decrpty);
app.use(render);

export default app;
