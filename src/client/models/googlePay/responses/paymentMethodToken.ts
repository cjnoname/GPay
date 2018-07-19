import { Record } from 'immutable';

interface Interface {
  token: string,
  tokenizationType: string
}

const initialValue = Record<Interface>({
  token: '',
  tokenizationType: ''
});

export class PaymentMethodToken extends initialValue { }
