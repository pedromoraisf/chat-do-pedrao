import { badRequest, serverError } from '@presentation/controllers/wss/helpers/responses';
import { ARCHITECTURE_DISCLAIMER } from '@config/architecture-disclaimer';

const errorMapper = {
  [ARCHITECTURE_DISCLAIMER.ENTITIES.errorPattern]: badRequest,
  [ARCHITECTURE_DISCLAIMER.PRESENTATION.errorPattern]: badRequest,
  [ARCHITECTURE_DISCLAIMER.USE_CASES.errorPattern]: badRequest,
  [ARCHITECTURE_DISCLAIMER.EXTERNAL.errorPattern]: serverError
};

export const mapError = (errorName: string) => {
  const layer = errorName.split('/')[0];
  return errorMapper[layer];
};
