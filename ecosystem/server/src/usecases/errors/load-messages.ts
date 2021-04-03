import { ARCHITECTURE_DISCLAIMER } from '@config/architecture-disclaimer';

const { USE_CASES } = ARCHITECTURE_DISCLAIMER;

export class LoadMessagesError extends Error {
  constructor(cause: string) {
    super(`Messages could not be loaded.\nCause: ${cause}`);
    this.name = `${USE_CASES.errorPattern}/LoadMessagesError`;
  }
}
