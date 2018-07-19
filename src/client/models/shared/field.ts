import { Record } from 'immutable';

interface Interface {
  name: string,
  type: string,
  label: string,
  required: boolean,
  requiredPrompt: string,
  isEmail: boolean,
  isEmailPrompt: string,
  isPhone: boolean,
  isPhonePrompt: string,
  maxLength: number,
  maxLengthPrompt: string,
  minLength: number,
  minLengthPrompt: string,
  regex: string,
  regexPrompt: string,
  sameAs: string,
  sameAsPrompt: string
}

const initialValue = Record<Interface>({
  name: '',
  type: '',
  label: '',
  required: false,
  requiredPrompt: '',
  isEmail: false,
  isEmailPrompt: '',
  isPhone: false,
  isPhonePrompt: '',
  maxLength: 0,
  maxLengthPrompt: '',
  minLength: 0,
  minLengthPrompt: '',
  regex: '',
  regexPrompt: '',
  sameAs: '',
  sameAsPrompt: ''
});

export class Field extends initialValue { }
