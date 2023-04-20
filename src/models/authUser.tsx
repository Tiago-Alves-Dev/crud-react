import { UserI } from "./user";

export interface AuthUserI {
  access_token: string;
  user: UserI;
}
