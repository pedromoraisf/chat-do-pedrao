import { Name } from "@entities/user/values"
import { InvalidNameError } from "@entities/user/errors"

const makeSut = () => {
  const sut = Name;

  return {
    sut
  }
}

describe("Value Name Tests", () => {
  test("should be returns isLeft containing InvalidNameError if invalid name has been inputed", () => {
    const { sut } = makeSut();

    const wrongName = "  "
    expect(sut.create(wrongName).value).toEqual(new InvalidNameError(wrongName))
  })
})
