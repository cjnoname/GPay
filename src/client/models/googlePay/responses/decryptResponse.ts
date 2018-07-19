import { Record } from 'immutable';
import { toImmutable } from 'utils/immutable';
import { PaymentMethodDetails } from './paymentMethodDetails';

export interface Interface {
  messageExpiration: string,
  messageId: string,
  paymentMethod: string,
  paymentMethodDetails: PaymentMethodDetails
}

const initialValue = Record<Interface>({
  messageExpiration: '',
  messageId: '',
  paymentMethod: '',
  paymentMethodDetails: new PaymentMethodDetails()
});

export class DecryptResponse extends initialValue {
  constructor(args: Interface = {} as any) {
    super({
      ...args,
      paymentMethodDetails: toImmutable(args.paymentMethodDetails, PaymentMethodDetails)
    });
  }
}
