import { ARCHITECTURE_DISCLAIMER } from '@config/architecture-disclaimer';

const { EXTERNAL } = ARCHITECTURE_DISCLAIMER;

export class InfraError extends Error {
  constructor(message?: string) {
    super(`External infra error.\n${message}`);
    this.name = `${EXTERNAL.errorPattern}/InfraError`;
  }
}
