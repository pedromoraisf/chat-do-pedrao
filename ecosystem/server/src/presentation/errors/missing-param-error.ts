import { ARCHITECTURE_DISCLAIMER } from '@config/architecture-disclaimer';

const { PRESENTATION } = ARCHITECTURE_DISCLAIMER;

export class MissingParamError extends Error {
  readonly layer: string;

  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.layer = PRESENTATION.errorPattern;
    this.name = 'MissingParamError';
  }
}
