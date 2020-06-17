import { Models } from ".";
import { ContextParameters } from "graphql-yoga/dist/types";
import { AuthUser } from "./userTypes";
export interface Context extends ContextParameters {
  authUser: AuthUser;
  db: Models;
}
