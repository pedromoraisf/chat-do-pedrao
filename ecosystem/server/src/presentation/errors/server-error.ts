import { ARCHITECTURE_DISCLAIMER } from '@config/architecture-disclaimer';

const { PRESENTATION } = ARCHITECTURE_DISCLAIMER;

export class ServerError extends Error {
  readonly layer: string;

  constructor(stack: string = '') {
    super('Internal server error');
    this.layer = PRESENTATION.errorPattern;
    this.name = 'ServerError';
    this.stack = stack;
  }
}
