export class InfraError extends Error {
  constructor(message?: string) {
    super(`External infra error.\n${message}`)
    this.name = "InfraError"
  }
}
