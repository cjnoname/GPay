import * as express from 'express';
import { renderPage } from './controller';
import { InitialState } from 'models/initial';
import { fetchTheme } from './middleware';
import { themes } from '../initial';

const render = express.Router();

let initialState: InitialState;
render.use(async (req, res, next) => {
  if (req.originalUrl.includes('/api/theme') || !req.originalUrl.includes('/api/')) {
    initialState = (await fetchTheme(req, themes))!;
  }
  next();
});

render.get('/api/theme', (req, res) => res.send(initialState));

render.get('*', (req, res) => renderPage(req, res, initialState));

export { render };
