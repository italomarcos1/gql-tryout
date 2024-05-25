import crypto from "crypto"
import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Root,
  type SubscribeResolverData,
  Subscription,
  Int,
} from "type-graphql";
import { Notification, NotificationPayload } from "../models/Notification";
import { pubSub } from "../pubsub";

@Resolver()
export class NotificationResolver {
  @Query(() => String)
  async healthCheck(): Promise<string> {
    return "OK"
  }

  // @Mutation(_returns => Boolean)
  @Mutation(() => Boolean)
  async pubSubMutation(@Arg("message") message: string): Promise<boolean> {
    const payload: NotificationPayload = {
      id: crypto.randomUUID(),
      message
    };

    pubSub.publish("NOTIFICATIONS", payload);

    return true;
  }

  @Subscription({ topics: "NOTIFICATIONS" })
  normalSubscription(@Root() { id, message }: NotificationPayload): Notification {
    return { id, message };
  }


  @Mutation(() => Boolean)
  async publishWithDynamicTopicId(
    @Arg("topicId", () => Int) topicId: number,
    @Arg("message") message: string,
  ): Promise<boolean> {
    const payload: NotificationPayload = {
      id: crypto.randomUUID(),
      message
    };
    
    pubSub.publish("DYNAMIC_ID_TOPIC", topicId, payload);
    
    return true;
  }

  @Subscription({
    topics: "DYNAMIC_ID_TOPIC",
    topicId: ({ args }: SubscribeResolverData<any, { topicId: number }, any>) => args.topicId,
  })
  subscribeToTopicIdFromArg(
    @Arg("topicId", () => Int) _topicId: number,
    @Root() { id, message }: NotificationPayload,
  ): Notification {
    return { id, message };
  }
}