import { Record, List } from 'immutable';
import { toImmutable } from 'utils/immutable';
import { CustomerItem } from './customerItem';
import { Field } from 'models/shared/field';

interface Interface {
  title: string,
  intro: string,
  help: string,
  button: string,
  bottomUrlText: string,
  fields: List<Field>,
  forgotPassword?: string,
  authenticators: List<string>,
  customerOptInItems: List<CustomerItem>,
  customerConsentItems: List<CustomerItem>
}

const initialValue = Record<Interface>({
  title: '',
  intro: '',
  help: '',
  button: '',
  bottomUrlText: '',
  fields: List<Field>(),
  forgotPassword: undefined,
  authenticators: List<string>(),
  customerOptInItems: List<CustomerItem>(),
  customerConsentItems: List<CustomerItem>()
});

export class Account extends initialValue {
  constructor(args: any = {}) {
    super({
      ...args,
      authenticators: toImmutable(args.authenticators, 'string'),
      fields: toImmutable(args.fields, Field, true),
      customerOptInItems: toImmutable(args.customerOptInItems, CustomerItem, true),
      customerConsentItems: toImmutable(args.customerConsentItems, CustomerItem, true),
    });
  }
}
