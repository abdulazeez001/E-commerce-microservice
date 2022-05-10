/**
 * @file Handles related product activities
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 * @lastModified Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <// 00:00am>
 */

import * as amqp from 'amqplib/callback_api';
import TransactionRepository from '../data/repository/TransactionRepository';
import RabbitMqPaymentBroker from './Broker';

const AMQP_URL = (process.env.AMQP_URL as string) || 'amqp://localhost:5672';
export default class PaymentService extends TransactionRepository {
  constructor() {
    super();
  }

  public static async publishAndSaveTransaction() {
    // Establish connection to Rabbitmq and Handle Callback
    amqp.connect(AMQP_URL, (err, conn) => {
      if (err) {
        console.log('couldnt connect to rabbitmq server, retrying..');
        process.exit(0);
      }

      console.log('Payment Service RabbitMq Connected');
      conn.createChannel(async (err, channel) => {
        const queueName = 'PAYMENT';
        channel.assertQueue(queueName, { durable: false });

        channel.consume(
          queueName,
          (data) => {
            if (data?.content) {
              const info = data?.content as Buffer;
              const payload = data?.content.toString('utf-8') as string;
              console.log('Consuming PAYMENT queue...');
              console.log(`Data received from ORDER Service ${info}`);

              /**
               * Publishes DATA to a Rabbitmq Messaging Queue
               */
              if (payload) {
                new TransactionRepository().createTransaction(JSON.parse(payload));
              }

              RabbitMqPaymentBroker.transactionPublisher(channel, 'TRANSACTION', info);
            }
          },
          { noAck: true }
        );
      });
    });
  }
}
