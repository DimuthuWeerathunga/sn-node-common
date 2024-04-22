"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
const rabbitmq_exchange_1 = __importDefault(require("./rabbitmq-exchange"));
class Listener {
    constructor(client) {
        this.channel = client;
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertExchange(rabbitmq_exchange_1.default, 'direct', {
                durable: false,
            });
            const qAssertion = yield this.channel.assertQueue('', {
                exclusive: true,
            });
            const queueName = qAssertion.queue;
            this.channel.bindQueue(queueName, rabbitmq_exchange_1.default, this.subject);
            this.channel.consume(queueName, (msg) => {
                if (!msg) {
                    return;
                }
                const event = this.parseMessage(msg);
                this.onMessage(event, msg);
            }, {
                noAck: true,
            });
        });
    }
    parseMessage(msg) {
        const data = msg.content.toString();
        return JSON.parse(data);
    }
}
exports.Listener = Listener;
