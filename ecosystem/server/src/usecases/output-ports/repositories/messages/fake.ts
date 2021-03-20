import { MessagesRepository, SavedMessage, makeFakeSavedUser } from "@usecases/output-ports/repositories"

export const makeFakeSavedMessage = (): SavedMessage => ({
  user: makeFakeSavedUser(),
  message: "any_message",
})

export class FakeMessagesRepository implements MessagesRepository {
  async retrievMessages(): Promise<Array<SavedMessage>> {
    return new Promise(resolve => resolve([makeFakeSavedMessage()]))
  }
}
