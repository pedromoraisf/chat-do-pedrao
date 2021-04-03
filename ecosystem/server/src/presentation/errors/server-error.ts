import { ARCHITECTURE_DISCLAIMER } from '@config/architecture-disclaimer';

const { PRESENTATION } = ARCHITECTURE_DISCLAIMER;

export class ServerError extends Error {
  constructor(stack: string = '') {
    super('Internal server error');
    this.name = `${PRESENTATION.errorPattern}/ServerError`;
    this.stack = stack;
  }
}
