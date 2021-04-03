import { mapError } from '@presentation/controllers/wss/helpers/error-mapper';
import { ARCHITECTURE_DISCLAIMER } from '@config/architecture-disclaimer';

const makeSut = () => {
  const sut = mapError;

  return {
    sut
  };
};

describe('Error Mapper Tests', () => {
  test('should be map function corretly', () => {
    const { sut } = makeSut();
    const fakeTestableErrorName = `${ARCHITECTURE_DISCLAIMER.PRESENTATION.errorPattern}/AnyError`;
    const testable = sut(fakeTestableErrorName)(new Error());

    expect(testable.statusCode).toBe(400);
  });
});
