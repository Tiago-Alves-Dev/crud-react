import { User } from "./user";

export interface AuthUser {
  access_token: string;
  user: User;
}
