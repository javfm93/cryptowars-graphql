export class InvalidEmailError extends Error {
  constructor(email: string) {
    super(`The format of the email ${email} is not valid`);
  }
}
