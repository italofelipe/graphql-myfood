import { GraphQLServer } from "graphql-yoga";
import { resolve } from "path";
import { models as db } from "./models";
import resolvers from "./resolvers";
import { logMiddleware, catchErrorsMiddleware } from "./middlewares";
const typeDefs = resolve(__dirname, "schema.graphql");

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { db },
  middlewares: [catchErrorsMiddleware],
});
export default server;
