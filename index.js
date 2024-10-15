const express = require('express'); 
const amqp = require('amqplib/callback_api'); 
const cors = require('cors'); 

const app = express();
app.use(express.json()); 
app.use(cors()); 

let orders = []; 

// URL for connecting to RabbitMQ 
const RABBITMQ_CONNECTION_STRING = process.env.RABBITMQ_CONNECTION_STRING || 'amqp://localhost';
const queue = 'order_queue'; 

amqp.connect(RABBITMQ_CONNECTION_STRING, (err, conn) => {
  if (err) {
    console.error('Error connecting to RabbitMQ', err);
    return;
  }

  conn.createChannel((err, channel) => {
    if (err) {
      console.error('Error creating channel', err);
      return;
    }

    channel.assertQueue(queue, { durable: false });

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const order = JSON.parse(msg.content.toString()); 
        orders.push(order); 
        console.log('Received order:', order);
        channel.ack(msg); 
      }
    }, { noAck: false });
  });
});

app.get('/orders', (req, res) => {
  res.json(orders); 
});

const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => {
  console.log(`Management Service - http://localhost:${PORT}`);
});