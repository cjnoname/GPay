import { Record } from 'immutable';

interface Interface {
  url: string,
  alt: string,
  href: string
}

const initialValue = Record<Interface>({
  url: '',
  alt: '',
  href: ''
});

export class Image extends initialValue { }
