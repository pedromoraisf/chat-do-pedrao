import { ARCHITECTURE_DISCLAIMER } from '@config/architecture-disclaimer';

const { EXTERNAL } = ARCHITECTURE_DISCLAIMER;

export class InfraError extends Error {
  readonly layer: string;

  constructor(message = '') {
    super(`External infra error.\n${message}`);
    this.layer = EXTERNAL.errorPattern;
    this.name = 'InfraError';
  }
}
