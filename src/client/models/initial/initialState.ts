import { Record } from 'immutable';
import { Social } from './social';
import { Footer } from './footer';
import { Icons } from './icons';
import { Theme } from './theme';
import { Images } from './images';
import { Account } from 'models/shared/account';
import { toImmutable } from 'utils/immutable';

export interface Interface {
  isLoading: boolean,
  footer: Footer,
  icons: Icons,
  images: Images,
  theme: Theme,
  signIn: Account
  signUp: Account,
  forgotPassword: Account,
  social: Social
}

const initialValue = Record<Interface>({
  isLoading: true,
  footer: new Footer(),
  icons: new Icons(),
  images: new Images(),
  theme: new Theme(),
  signIn: new Account(),
  signUp: new Account(),
  forgotPassword: new Account(),
  social: new Social()
});

export class InitialState extends initialValue {
  constructor(args: Interface = {} as any) {
    super({
      ...args,
      footer: toImmutable(args.footer, Footer),
      icons: toImmutable(args.icons, Icons),
      images: toImmutable(args.images, Images),
      theme: toImmutable(args.theme, Theme),
      signIn: toImmutable(args.signIn, Account),
      signUp: toImmutable(args.signUp, Account),
      forgotPassword: toImmutable(args.forgotPassword, Account),
      social: toImmutable(args.social, Social)
    });
  }
}
