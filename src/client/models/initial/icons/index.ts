import { Record } from 'immutable';

interface Interface {
  ticket: string,
  secure: string,
  help: string,
  numberOne: string,
  numberTwo: string
}

const initialValue = Record<Interface>({
  ticket: '',
  secure: '',
  help: '',
  numberOne: '',
  numberTwo: ''
});

export class Icons extends initialValue { }
