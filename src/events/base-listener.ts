import { Subjects } from './subjects';
import { Channel, ConsumeMessage } from 'amqplib';
import exchange from './rabbitmq-exchange';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T['subject'];
  abstract onMessage(data: T['data'], msg: ConsumeMessage): void;
  protected channel: Channel;

  constructor(client: Channel) {
    this.channel = client;
  }

  async listen() {
    await this.channel.assertExchange(exchange, 'direct', {
      durable: false,
    });

    const qAssertion = await this.channel.assertQueue('', {
      exclusive: true,
    });
    const queueName = qAssertion.queue;

    this.channel.bindQueue(queueName, exchange, this.subject);
    this.channel.consume(
      queueName,
      (msg) => {
        if (!msg) {
          return;
        }
        const event = this.parseMessage(msg);
        this.onMessage(event, msg);
      },
      {
        noAck: true,
      }
    );
  }

  parseMessage(msg: ConsumeMessage) {
    const data = msg.content.toString();
    return JSON.parse(data);
  }
}
