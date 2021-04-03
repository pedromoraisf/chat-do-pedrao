import { ARCHITECTURE_DISCLAIMER } from '@config/architecture-disclaimer';

const { ENTITIES } = ARCHITECTURE_DISCLAIMER;

export class InvalidNameError extends Error {
  constructor(name: string) {
    super(`The name "${name}" is invalid.`);
    this.name = `${ENTITIES.errorPattern}/InvalidNameError`;
  }
}
