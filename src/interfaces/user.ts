import { IGame } from "./game";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  imageUrl?: string;
  favourites?: IGame[];
  createdAt: string;
  updatedAt: string;
}
