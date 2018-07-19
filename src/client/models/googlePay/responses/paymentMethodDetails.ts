import { Record } from 'immutable';

export interface IPaymentMethodDetails {
  expirationYear: number,
  expirationMonth: number,
  pan: string
}

const initialValue = Record<IPaymentMethodDetails>({
  expirationYear: 0,
  expirationMonth: 0,
  pan: ''
});

export class PaymentMethodDetails extends initialValue { }
