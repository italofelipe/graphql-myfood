import { IMiddlewareResolver } from "graphql-middleware/dist/types";
import { Context } from "../types";

const logMiddleware: IMiddlewareResolver<any, Context> = async (
  resolve,
  source,
  args,
  ctx,
  info,
) => {
  const {
    fieldName,
    operation: { operation },
  } = info;
  console.log(`Log: Before '${operation} ${fieldName}' `);
  const result = await resolve(source, args, ctx, info);

  console.log(`Log: After '${operation} ${fieldName}' `);
  return result;
};

export { logMiddleware };
