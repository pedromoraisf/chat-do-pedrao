import { ARCHITECTURE_DISCLAIMER } from '@config/architecture-disclaimer';

const { PRESENTATION } = ARCHITECTURE_DISCLAIMER;

export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = `${PRESENTATION.errorPattern}/MissingParamError`;
  }
}
