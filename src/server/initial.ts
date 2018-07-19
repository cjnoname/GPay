import * as express from 'express';
import { config, DotenvResult } from 'dotenv';
import { ITheme, IDecrypt } from './models/config';

const dotenvResult: DotenvResult = config();

const themes = JSON.parse(dotenvResult.parsed!.theme) as ITheme;
const decrypt = JSON.parse(dotenvResult.parsed!.decrypt) as IDecrypt;

const initial = express.Router();

initial.use(express.static('static'));
initial.use(express.json());

export { initial, themes, decrypt };
