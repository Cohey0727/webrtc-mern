import { IUser } from "../src/models";

declare module "express-serve-static-core" {
  export interface Request {
    user?: IUser;
  }
}
