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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
class Publisher {
    constructor(channel) {
        this.exchange = 'sn_event_exchange';
        this.channel = channel;
    }
    publish(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = JSON.stringify(data);
            yield this.channel.assertExchange(this.exchange, 'direct', {
                durable: false,
            });
            this.channel.publish(this.exchange, this.subject, Buffer.from(msg));
        });
    }
}
exports.Publisher = Publisher;
