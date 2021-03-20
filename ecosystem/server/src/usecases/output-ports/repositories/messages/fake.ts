import { MessagesRepository, SavedMessage, makeFakeSavedUser, RetrievMessagesResponse } from "@usecases/output-ports/repositories"
import { right } from "@shared/either"

export const makeFakeSavedMessage = (): SavedMessage => ({
  user: makeFakeSavedUser(),
  message: "any_message",
})

export class FakeMessagesRepository implements MessagesRepository {
  async retrievMessages(): Promise<RetrievMessagesResponse> {
    const res = [makeFakeSavedMessage()]
    return new Promise(resolve => resolve(right(res)))
  }
}
