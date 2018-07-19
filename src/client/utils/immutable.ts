import { List } from 'immutable';

export const toImmutable = (value: any, Class: any, isList: boolean = false) => {
  if (Class === 'string') {
    return (value && value.length > 0) ? List<string>(value) : List<string>();
  } else if (Class === 'number') {
    return (value && value.length > 0) ? List<number>(value) : List<number>();
  } else if (isList) {
    return (value && value.length > 0) ? List(value.map((val: any) => new Class(val))) : List();
  } else {
    return value ? new Class(value) : new Class();
  }
};
