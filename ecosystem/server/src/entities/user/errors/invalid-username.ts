export class InvalidUsernameError extends Error {
  constructor(username: string) {
    super(`The username "${username}" is invalid.`)
    this.name = "InvalidUsernameError"
  }
}
