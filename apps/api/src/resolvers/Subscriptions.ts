import { withFilter } from "graphql-yoga";
import {
  Order,
  Resolver,
  SubscriptionArgs,
  SubscriptionPayload,
  SubscriptionResovler,
  UserRole,
} from "../types";

const orderSubscribeFn: Resolver<SubscriptionArgs> = (_, args, ctx) => {
  const { mutationIn } = args.where;
  const { pubsub } = ctx;
  const channels = mutationIn.map((mut) => `ORDER_${mut}`);
  return pubsub.asyncIterator(channels);
};

const orderFilterFn: Resolver<SubscriptionArgs, SubscriptionPayload<Order>> = (
  payload,
  args,
  ctx,
) => {
  const { _id, role } = ctx.authUser;
  return role === UserRole.ADMIN ? true : payload.node.user === _id;
};
const order: SubscriptionResovler<Order> = {
  subscribe: withFilter(orderSubscribeFn, orderFilterFn),
  resolve: (payload) => {
    return payload;
  },
};

export default {
  order,
};
