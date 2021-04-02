import {
  MessagesRepository,
  RetrievMessagesResponse,
  MessageToSave,
  SaveMessageResponse
} from '@usecases/output-ports/repositories/messages';
import { MongoHelper } from '@external/mongodb/helpers';
import { left, right } from '@shared/either';
import { InfraError } from '@usecases/output-ports/errors';
import { SavedMessage } from '@usecases/output-ports/repositories';

export class MessagesRepo implements MessagesRepository {
  public readonly COLLECTION_NAME = 'messages';

  async retrievMessages(): Promise<RetrievMessagesResponse> {
    try {
      const messagesCollection = await MongoHelper.getCollection(this.COLLECTION_NAME);
      const result = await messagesCollection.find().toArray();
      return right(result);
    } catch {
      return left(new InfraError());
    }
  }

  async saveMessage(messageToSave: MessageToSave): Promise<SaveMessageResponse> {
    const adaptedMessageToSave: Omit<SavedMessage, 'id'> = {
      user: {
        id: messageToSave.sender.id.value,
        name: messageToSave.sender.name.value,
        username: messageToSave.sender.username.value,
        password: messageToSave.sender.password.value
      },
      message: messageToSave.content.value
    };

    try {
      const messagesCollection = await MongoHelper.getCollection(this.COLLECTION_NAME);
      const result = await messagesCollection.insertOne(adaptedMessageToSave);
      return right(result.ops[0]);
    } catch {
      return left(new InfraError());
    }
  }
}
