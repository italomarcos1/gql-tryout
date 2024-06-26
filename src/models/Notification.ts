import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: string;

  @Field()
  message: string;
}

export interface NotificationPayload {
  id: string;
  message: string;
}