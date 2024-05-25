import { createPubSub } from '@graphql-yoga/subscription'
import { NotificationPayload } from './models/Notification';

export const pubSub = createPubSub<
  {
    "NOTIFICATIONS": [NotificationPayload];
    "DYNAMIC_ID_TOPIC": [number, NotificationPayload];
  } & Record<string, [NotificationPayload]> // Fallback for dynamic topics
>();