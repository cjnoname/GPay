import { Record } from 'immutable';

interface Interface {
  cardClass: string,
  cardDescription: string,
  cardDetails: string,
  cardImageUri: string,
  cardNetwork: string
}

const initialValue = Record<Interface>({
  cardClass: '',
  cardDescription: '',
  cardDetails: '',
  cardImageUri: '',
  cardNetwork: ''
});

export class CardInfo extends initialValue { }
