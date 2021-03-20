import { SavedUser } from "@usecases/output-ports/repositories"

export interface SavedMessage {
  user: SavedUser;
  message: string;
}

export interface MessagesRepository {
  retrievMessages(): Promise<Array<SavedMessage>>
}
