import { Message } from "@entities/message"
import { SavedUser } from "@usecases/output-ports/repositories"
import { InfraError } from "@usecases/output-ports/errors"
import { Either } from "@shared/either"

export interface SavedMessage {
  user: SavedUser;
  message: string;
}

export type MessageToSave = Message

export type RetrievMessagesResponse = Either<InfraError, Array<SavedMessage>>
export type SaveMessageResponse = Either<InfraError, SavedMessage>

export interface MessagesRepository {
  retrievMessages(): Promise<RetrievMessagesResponse>
  saveMessage(messageToSave: MessageToSave): Promise<SaveMessageResponse>
}
