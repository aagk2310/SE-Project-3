import mongoose from 'mongoose';
import { runConsumer } from './services/kafkaService';

mongoose.connect('mongodb://localhost:27017/kalakritiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  runConsumer().catch(error => {
    console.error('Failed to run Kafka consumer:', error);
    process.exit(1);
  });
})
.catch(err => console.error('MongoDB connection error:', err));
