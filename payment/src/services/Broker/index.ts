import * as amqplib from 'amqplib/callback_api';

export default class RabbitMqPaymentBroker {
  public static async transactionPublisher(
    channel: amqplib.Channel,
    exchangeName: string,
    data: Buffer
  ): Promise<void> {
    channel.assertExchange(exchangeName, 'fanout', { durable: false });
    channel.publish(exchangeName, '', data);
    console.log(`Data PUBLISHED to Rabbit Messaging Queue on Exchange ${exchangeName} : ${data}`);
  }
}
