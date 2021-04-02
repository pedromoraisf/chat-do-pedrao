export class LoadMessagesError extends Error {
  constructor(cause: string) {
    super(`Messages could not be loaded.\nCause: ${cause}`);
    this.name = 'LoadMessagesError';
  }
}
