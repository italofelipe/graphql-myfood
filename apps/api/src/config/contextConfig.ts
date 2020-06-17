import { ContextParameters } from "graphql-yoga/dist/types";
import { Context } from "../types";
import { models as db } from "../models";

const context = (ctx: ContextParameters): Context => {
  return {
    ...ctx,
    authUser: null,
    db,
  };
};

export { context };
