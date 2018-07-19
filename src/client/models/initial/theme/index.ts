import { Record } from 'immutable';

interface Interface {
  primaryColor: string,
  secondaryColor: string
}

const initialValue = Record<Interface>({
  primaryColor: '',
  secondaryColor: ''
});

export class Theme extends initialValue { }
