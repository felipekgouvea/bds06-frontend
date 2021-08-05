import { Users } from "./users";

export type Reviews = {
  id: number;
  text: string;
  movieId: number;
  user: Users;
};
