import { Record } from 'immutable';

interface Interface {
  id: string,
  label: string,
  defaultValue: boolean,
  requiredPrompt: string
}

const initialValue = Record<Interface>({
  id: '',
  label: '',
  defaultValue: false,
  requiredPrompt: ''
});
export class CustomerItem extends initialValue { }
