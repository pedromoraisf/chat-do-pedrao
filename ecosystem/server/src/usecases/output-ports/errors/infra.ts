export class InfraError extends Error {
  constructor() {
    super(`External infra error.`)
    this.name = "InfraError"
  }
}
