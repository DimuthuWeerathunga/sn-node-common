import { Subjects } from './subjects';
import { Channel, ConsumeMessage } from 'amqplib';
interface Event {
    subject: Subjects;
    data: any;
}
export declare abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract onMessage(data: T['data'], msg: ConsumeMessage): void;
    protected channel: Channel;
    constructor(client: Channel);
    listen(): Promise<void>;
    parseMessage(msg: ConsumeMessage): any;
}
export {};
