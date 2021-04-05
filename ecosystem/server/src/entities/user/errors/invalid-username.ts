import { ARCHITECTURE_DISCLAIMER } from '@config/architecture-disclaimer';

const { ENTITIES } = ARCHITECTURE_DISCLAIMER;

export class InvalidUsernameError extends Error {
  readonly layer: string;

  constructor(username: string) {
    super(`The username "${username}" is invalid.`);
    this.layer = ENTITIES.errorPattern;
    this.name = 'InvalidUsernameError';
  }
}
