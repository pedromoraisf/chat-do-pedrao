import { UsersRepository, SavedUser, FindAllResponse } from "@usecases/output-ports/repositories/users"
import { right } from "@shared/either"

export const makeFakeSavedUser = (): SavedUser => ({
  id: "any_id",
  name: "any_name",
  username: "any_username",
  password: "any_password",
})

export class FakeUsersRepository implements UsersRepository {
  async findAll(): Promise<FindAllResponse> {
    const res = [makeFakeSavedUser()]
    return new Promise(resolve => resolve(right(res)))
  }
}
