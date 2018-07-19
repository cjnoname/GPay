import { Record } from 'immutable';

interface Interface {
  facebookLabel: string,
  googleLabel: string
}

const initialValue = Record<Interface>({
  facebookLabel: '',
  googleLabel: ''
});

export class Social extends initialValue { }
