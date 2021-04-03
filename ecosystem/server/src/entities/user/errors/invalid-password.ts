import { ARCHITECTURE_DISCLAIMER } from '@config/architecture-disclaimer';

const { ENTITIES } = ARCHITECTURE_DISCLAIMER;

export class InvalidPasswordError extends Error {
  constructor(password: string) {
    super(`The password "${password}" is invalid.`);
    this.name = `${ENTITIES.errorPattern}/InvalidPasswordError`;
  }
}
