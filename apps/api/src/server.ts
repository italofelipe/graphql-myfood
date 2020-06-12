import { GraphQLServer } from "graphql-yoga";
import { resolve } from "path";
import { models as db } from "./models";
import resolvers from "./resolvers";
const typeDefs = resolve(__dirname, "schema.graphql");

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { db },
});
export default server;
