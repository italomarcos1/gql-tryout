"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationResolver = void 0;
const crypto_1 = __importDefault(require("crypto"));
const type_graphql_1 = require("type-graphql");
const Notification_1 = require("../models/Notification");
const pubsub_1 = require("../pubsub");
let NotificationResolver = class NotificationResolver {
    async healthCheck() {
        return "OK";
    }
    // @Mutation(_returns => Boolean)
    async pubSubMutation(message) {
        const payload = {
            id: crypto_1.default.randomUUID(),
            message
        };
        pubsub_1.pubSub.publish("NOTIFICATIONS", payload);
        return true;
    }
    normalSubscription({ id, message }) {
        return { id, message };
    }
    async publishWithDynamicTopicId(topicId, message) {
        const payload = {
            id: crypto_1.default.randomUUID(),
            message
        };
        pubsub_1.pubSub.publish("DYNAMIC_ID_TOPIC", topicId, payload);
        return true;
    }
    subscribeToTopicIdFromArg(_topicId, { id, message }) {
        return { id, message };
    }
};
exports.NotificationResolver = NotificationResolver;
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "healthCheck", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("message")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "pubSubMutation", null);
__decorate([
    (0, type_graphql_1.Subscription)({ topics: "NOTIFICATIONS" }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Notification_1.Notification)
], NotificationResolver.prototype, "normalSubscription", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("topicId", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("message")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "publishWithDynamicTopicId", null);
__decorate([
    (0, type_graphql_1.Subscription)({
        topics: "DYNAMIC_ID_TOPIC",
        topicId: ({ args }) => args.topicId,
    }),
    __param(0, (0, type_graphql_1.Arg)("topicId", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Notification_1.Notification)
], NotificationResolver.prototype, "subscribeToTopicIdFromArg", null);
exports.NotificationResolver = NotificationResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], NotificationResolver);
