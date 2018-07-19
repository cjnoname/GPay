import { Record } from 'immutable';
import { toImmutable } from 'utils/immutable';
import { Link } from './link';

interface Interface {
  link: Link
}

const initialValue = Record<Interface>({
  link: new Link()
});

export class Privacy extends initialValue {
  constructor(args: any = {}) {
    super({
      ...args,
      link: toImmutable(args.link, Link)
    });
  }
}
