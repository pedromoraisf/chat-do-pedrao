import { SavedUser } from "@usecases/output-ports/repositories"
import { InfraError } from "@usecases/output-ports/errors"
import { Either } from "@shared/either"

export interface SavedMessage {
  user: SavedUser;
  message: string;
}

export type RetrievMessagesResponse = Either<InfraError, Array<SavedMessage>>

export interface MessagesRepository {
  retrievMessages(): Promise<RetrievMessagesResponse>
}
