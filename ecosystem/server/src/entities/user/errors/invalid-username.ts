import { ARCHITECTURE_DISCLAIMER } from '@config/architecture-disclaimer';

const { ENTITIES } = ARCHITECTURE_DISCLAIMER;

export class InvalidUsernameError extends Error {
  constructor(username: string) {
    super(`The username "${username}" is invalid.`);
    this.name = `${ENTITIES.errorPattern}/InvalidUsernameError`;
  }
}
