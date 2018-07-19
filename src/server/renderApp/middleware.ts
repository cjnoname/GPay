import { Request } from 'express';
import server from 'sharedUtils/server';
import { InitialState } from 'models/initial';
import { ITheme } from '../models/config';

export const fetchTheme = (req: Request, themes: ITheme) => {
  try {
    const path = req.hostname.split('.')[0];
    const url = themes[path] ? themes[path] : themes['default'];
    return server.simpleGet<InitialState>(url);
  } catch (e) {
    console.log(e);
  }
};
