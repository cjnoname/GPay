import { Record } from 'immutable';
import { toImmutable } from 'utils/immutable';
import { Image } from 'models/shared/image';

interface Interface {
  logoMain: Image
}

const initialValue = Record<Interface>({
  logoMain: new Image()
});

export class Images extends initialValue {
  constructor(args: any = {}) {
    super({
      ...args,
      logoMain: toImmutable(args.logoMain, Image)
    });
  }
}
