import { Channel } from 'amqplib';
import { Subjects } from './subjects';
import exchange from './rabbitmq-exchange';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];
  protected channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  async publish(data: T['data']): Promise<boolean> {
    const msg = JSON.stringify(data);

    await this.channel.assertExchange(exchange, 'direct', {
      durable: false,
    });
    return this.channel.publish(exchange, this.subject, Buffer.from(msg));
  }
}
