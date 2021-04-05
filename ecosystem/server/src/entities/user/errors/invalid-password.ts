import { ARCHITECTURE_DISCLAIMER } from '@config/architecture-disclaimer';

const { ENTITIES } = ARCHITECTURE_DISCLAIMER;

export class InvalidPasswordError extends Error {
  readonly layer: string;

  constructor(password: string) {
    super(`The password "${password}" is invalid.`);
    this.layer = ENTITIES.errorPattern;
    this.name = 'InvalidPasswordError';
  }
}
