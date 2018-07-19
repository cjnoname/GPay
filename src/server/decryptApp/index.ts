import * as express from 'express';
import { decryptGooglePay } from './controller';

const decrpty = express.Router();

decrpty.post('/api/decrypt', (req, res) => decryptGooglePay(req, res));

export { decrpty };
