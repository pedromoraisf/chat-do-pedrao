import { User } from '@entities/user';
import { Id, Name, Username, Password } from '@entities/user/values';

export const makeFakeUser = (): User => {
  const id = new Id('any_id');
  const name = new Name('any_name');
  const username = new Username('any_username');
  const password = new Password('any_password');

  return new User(id, name, username, password);
};
