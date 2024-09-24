import { IUser } from "./user";

export interface IGame {
  _id: string;
  title: string;
  imageUrl?: string;
  creator: IUser;
  description: string;
  gameSetup: string;
  howToPlay: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}
