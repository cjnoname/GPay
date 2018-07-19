import { Field } from 'models/shared/field';

export const validateAny = (field: Field, value: any, values?: any) => {
  if (field.required && !value) {
    return field.requiredPrompt;
  } else if (field.sameAs && values && value && values[field.sameAs] && values[field.sameAs].toLowerCase() !== value.toLowerCase()) {
    return field.sameAsPrompt;
  } else if (field.isPhone && !/^\+?[\d\s-()x]+$/i.test(value)) {
    return field.isPhonePrompt;
  } else if (field.isEmail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return field.isEmailPrompt;
  } else if (field.maxLength > 0 && value && value.length > field.maxLength) {
    return field.maxLengthPrompt;
  } else if (field.minLength > 0 && value && value.length < field.minLength) {
    return field.minLengthPrompt;
  } else if (field.regex && !new RegExp(field.regex, 'i').test(value)) {
    return field.regexPrompt;
  }
};
