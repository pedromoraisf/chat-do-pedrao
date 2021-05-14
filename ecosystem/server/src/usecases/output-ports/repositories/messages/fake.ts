import {
  MessagesRepository,
  SavedMessage,
  makeFakeSavedUser,
  RetrievMessagesResponse,
  MessageToSave,
  SaveMessageResponse
} from '@usecases/output-ports/repositories';
import { right } from '@shared/either';

export const makeFakeSavedMessage = (): SavedMessage => ({
  id: 'any_id',
  user: makeFakeSavedUser(),
  message: 'any_message'
});

export class FakeMessagesRepository implements MessagesRepository {
  async retrievMessages(): Promise<RetrievMessagesResponse> {
    const response = [makeFakeSavedMessage()];
    return new Promise((resolve) => resolve(right(response)));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async saveMessage(messageToSave: MessageToSave): Promise<SaveMessageResponse> {
    const response = makeFakeSavedMessage();
    return new Promise((resolve) => resolve(right(response)));
  }
}
