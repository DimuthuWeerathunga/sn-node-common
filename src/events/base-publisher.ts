import { Channel } from 'amqplib';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];
  protected channel: Channel;
  protected exchange = 'sn_event_exchange';

  constructor(channel: Channel) {
    this.channel = channel;
  }

  async publish(data: T['data']): Promise<void> {
    const msg = JSON.stringify(data);

    await this.channel.assertExchange(this.exchange, 'direct', {
      durable: false,
    });
    this.channel.publish(this.exchange, this.subject, Buffer.from(msg));
  }
}
