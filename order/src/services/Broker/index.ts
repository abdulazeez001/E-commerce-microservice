import amqplib from 'amqplib';

const AMQP_URL = (process.env.AMQP_URL as string) || 'amqp://localhost:5672';
export default class RabbitMqBroker {
  public static async sendToQueue(queueName: string, data: string): Promise<void> {
    const connection = amqplib.connect(AMQP_URL);
    connection
      .then(function (conn) {
        return conn.createChannel();
      })
      .then(async function (ch) {
        const ok = await ch.assertQueue(queueName, { durable: false });
        return ch.sendToQueue(queueName, Buffer.from(data));
      })
      .catch(console.warn);

    // connection.close();
  }
}
