import { UsersRepository, SavedUser } from "@usecases/output-ports/repositories/users"

export const makeFakeSavedUser = (): SavedUser => ({
  id: "any_id",
  name: "any_name",
  username: "any_username",
  password: "any_password",
})

export class FakeUsersRepository implements UsersRepository {
  async findAll(): Promise<Array<SavedUser>> {
    return new Promise(resolve => resolve([makeFakeSavedUser()]))
  }
}
