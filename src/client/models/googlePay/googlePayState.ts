import { Record } from 'immutable';
import { toImmutable } from 'utils/immutable';
import { GooglePayResponse } from './responses/googlePayResponse';
import { DecryptResponse } from './responses/decryptResponse';

interface Interface {
  isLoading: boolean
  googlePayResponse?: GooglePayResponse,
  decryptResponse?: DecryptResponse
}

const initialValue = Record<Interface>({
  isLoading: false,
  googlePayResponse: undefined,
  decryptResponse: undefined
});

export class GooglePayState extends initialValue {
  constructor(args: Interface = {} as any) {
    super({
      ...args,
      googlePayResponse: args.googlePayResponse ? toImmutable(args.googlePayResponse, GooglePayResponse) : undefined,
      decryptResponse: args.decryptResponse ? toImmutable(args.decryptResponse, DecryptResponse) : undefined
    });
  }
}
