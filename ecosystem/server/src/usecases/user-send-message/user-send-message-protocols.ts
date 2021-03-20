import { UserData } from "@entities/user"

export interface MessagePack {
  userData: UserData;
  message: string;
}
