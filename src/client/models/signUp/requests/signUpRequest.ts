export interface ISignUpRequest {
  firstName: string,
  lastName: string,
  mobile: string,
  email: string,
  confirmedEmail: string,
  password: string;
  optInItems?: boolean[];
  consentItems?: boolean[];
  [key: string]: any;
}
