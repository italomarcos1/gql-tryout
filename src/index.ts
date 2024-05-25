import "reflect-metadata"
import path from "path"
import http from "http"

import { buildSchema } from "type-graphql"
import { createYoga } from "graphql-yoga";

import { NotificationResolver } from "./resolvers/NotificationResolver";
import { pubSub } from "./pubsub";

(async () => {
  const schema = await buildSchema({
    resolvers: [NotificationResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
    pubSub
  })

  const yoga = createYoga({
    schema,
    graphqlEndpoint: "/graphql"
  });

  const httpServer = http.createServer(yoga)

  httpServer.listen(4000, () => console.log("Up and running"))
})();