import { GraphQLFieldResolver } from "graphql";
import { Context } from ".";

// eslint-disable-next-line @typescript-eslint/ban-types
export type Resolver<TArgs, TSource = {}> = GraphQLFieldResolver<
  TSource,
  Context,
  TArgs
>;
