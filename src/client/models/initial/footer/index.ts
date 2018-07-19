import { Record } from 'immutable';
import { Privacy } from './privacy';
import { toImmutable } from 'utils/immutable';

interface Interface {
  copyright: string,
  pipe: string,
  security: string,
  termsAndConditions: Privacy,
  privacy: Privacy
}

const initialValue = Record<Interface>({
  copyright: '',
  pipe: '',
  security: '',
  termsAndConditions: new Privacy(),
  privacy: new Privacy()
});

export class Footer extends initialValue {
  constructor(args: any = {}) {
    super({
      ...args,
      termsAndConditions: toImmutable(args.termsAndConditions, Privacy),
      privacy: toImmutable(args.privacy, Privacy)
    });
  }
}
