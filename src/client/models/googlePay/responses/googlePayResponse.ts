import { Record } from 'immutable';
import { toImmutable } from 'utils/immutable';
import { CardInfo } from './cardInfo';
import { PaymentMethodToken } from './paymentMethodToken';

export interface Interface {
  cardInfo: CardInfo,
  paymentMethodToken: PaymentMethodToken
}

const initialValue = Record<Interface>({
  cardInfo: new CardInfo(),
  paymentMethodToken: new PaymentMethodToken()
});

export class GooglePayResponse extends initialValue {
  constructor(args: Interface = {} as any) {
    super({
      ...args,
      cardInfo: toImmutable(args.cardInfo, CardInfo),
      paymentMethodToken: toImmutable(args.paymentMethodToken, PaymentMethodToken)
    });
  }
}
