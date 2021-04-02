import { InfraError } from '@usecases/output-ports/errors';
import { Either } from '@shared/either';

export interface SavedUser {
  id: string;
  name: string;
  username: string;
  password: string;
}

export type FindAllResponse = Either<InfraError, Array<SavedUser>>;

export interface UsersRepository {
  findAll(): Promise<FindAllResponse>;
}
