import { ARCHITECTURE_DISCLAIMER } from '@config/architecture-disclaimer';

const { ENTITIES } = ARCHITECTURE_DISCLAIMER;

export class InvalidNameError extends Error {
  readonly layer: string;

  constructor(name: string) {
    super(`The name "${name}" is invalid.`);
    this.layer = ENTITIES.errorPattern;
    this.name = 'InvalidNameError';
  }
}
