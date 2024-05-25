"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const type_graphql_1 = require("type-graphql");
const graphql_yoga_1 = require("graphql-yoga");
const NotificationResolver_1 = require("./resolvers/NotificationResolver");
const pubsub_1 = require("./pubsub");
(async () => {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [NotificationResolver_1.NotificationResolver],
        emitSchemaFile: path_1.default.resolve(__dirname, "schema.graphql"),
        pubSub: pubsub_1.pubSub
    });
    const yoga = (0, graphql_yoga_1.createYoga)({
        schema,
        graphqlEndpoint: "/graphql"
    });
    const httpServer = http_1.default.createServer(yoga);
    httpServer.listen(4000, () => console.log("Up and running"));
})();
