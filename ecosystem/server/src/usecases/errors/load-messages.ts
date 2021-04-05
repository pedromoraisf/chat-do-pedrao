import { ARCHITECTURE_DISCLAIMER } from '@config/architecture-disclaimer';

const { USE_CASES } = ARCHITECTURE_DISCLAIMER;

export class LoadMessagesError extends Error {
  readonly layer: string;

  constructor(cause: string) {
    super(`Messages could not be loaded.\nCause: ${cause}`);
    this.layer = USE_CASES.errorPattern;
    this.name = 'LoadMessagesError';
  }
}
