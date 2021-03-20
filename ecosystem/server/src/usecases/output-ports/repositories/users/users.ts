export interface SavedUser {
  id: string;
  name: string;
  username: string;
  password: string;
}

export interface UsersRepository {
  findAll(): Promise<Array<SavedUser>>
}
