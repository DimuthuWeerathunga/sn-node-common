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
exports.Publisher = void 0;
const rabbitmq_exchange_1 = __importDefault(require("./rabbitmq-exchange"));
class Publisher {
    constructor(channel) {
        this.channel = channel;
    }
    publish(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = JSON.stringify(data);
            yield this.channel.assertExchange(rabbitmq_exchange_1.default, 'direct', {
                durable: false,
            });
            return this.channel.publish(rabbitmq_exchange_1.default, this.subject, Buffer.from(msg));
        });
    }
}
exports.Publisher = Publisher;
