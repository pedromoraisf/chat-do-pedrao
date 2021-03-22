import { User } from "@entities/user"
import { InvalidNameError, InvalidUsernameError, InvalidPasswordError } from "@entities/user/errors"

const makeUserData = () => ({
  id: "any_id",
  name: "any_name",
  username: "any_username",
  password: "any_password"
})

const makeSut = () => {
  const sut = User;

  return {
    sut
  }
}

describe("Entitiy User Tests", () => {
  test("should be returns an User instance if all properties containing in userData is correct", () => {
    const { sut } = makeSut();

    const testable = sut.create(makeUserData())
    expect(testable.isRight()).toBeTruthy()
  })

  describe("Mapping Error Cases", () => {
    test("should be returned an InvalidNameError in composition if name inputed has been wrong", () => {
      const { sut } = makeSut();

      const userDataWithWrongName = makeUserData()
      userDataWithWrongName.name = "  "
      const testable = sut.create(userDataWithWrongName);

      expect(testable.isLeft).toBeTruthy();
      expect(testable.value).toEqual(new InvalidNameError(userDataWithWrongName.name));
    })

    test("should be returned an InvalidUsernameError in composition if username inputed has been wrong", () => {
      const { sut } = makeSut();

      const userDataWithWrongUsername = makeUserData()
      userDataWithWrongUsername.username = "  "
      const testable = sut.create(userDataWithWrongUsername);

      expect(testable.isLeft).toBeTruthy();
      expect(testable.value).toEqual(new InvalidUsernameError(userDataWithWrongUsername.username));
    })

    test("should be returned an InvalidPasswordError in composition if password inputed has been wrong", () => {
      const { sut } = makeSut();

      const userDataWithWrongPassword = makeUserData()
      userDataWithWrongPassword.password = ""
      const testable = sut.create(userDataWithWrongPassword);

      expect(testable.isLeft).toBeTruthy();
      expect(testable.value).toEqual(new InvalidPasswordError(userDataWithWrongPassword.password));
    })
  })
})
