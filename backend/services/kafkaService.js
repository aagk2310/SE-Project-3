import { Kafka } from 'kafkajs';
import mongoose from 'mongoose';
import Product from '../models/productModel.js';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'] // Your Kafka broker addresses
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'product-group' });

export const kafkaConnect = async () => {
  await producer.connect();
  await consumer.connect();
  console.log('Kafka Producer and Consumer Connected!');
};

export const kafkaDisconnect = async () => {
  await producer.disconnect();
  await consumer.disconnect();
  console.log('Kafka Producer and Consumer Disconnected!');
};

export const sendEvent = async (topic, messages) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(messages) }],
  });
};

export const consumeMessages = async (topic, callback) => {
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
      const content = JSON.parse(message.value.toString());
      
      // Process message (example: save to MongoDB)
      try {
        const product = new Product(content);
        await product.save();
        console.log('Product saved to MongoDB:', product);
      } catch (err) {
        console.error('Error saving product to MongoDB:', err);
      }

      // Additional processing logic can be added here
      if (callback) {
        callback(content);
      }
    }
  });
};

