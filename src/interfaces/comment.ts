import { IGame } from "./game";
import { IUser } from "./user";

export interface IComment {
  text: string;
  author: IUser;
  game: IGame;
  createdAt: string;
  updatedAt: string;
}
