
# Management Service

This service is part of the Algonquin Pet Store system. It provides management functionalities that integrate with RabbitMQ for message-based communication. It also exposes API endpoints to perform certain management-related tasks.

## Features

- **API Endpoints** for management services.
- **RabbitMQ Integration** for message passing.
- **Node.js** based service.
- Includes testing instructions and setup steps.

## Prerequisites

Before setting up the service, ensure the following software is installed:

- **Node.js** (version 14.x or above)
- **RabbitMQ** (for message queue integration)
- **npm** (Node Package Manager)

## Setup Instructions

1. Clone the repository and navigate into the project directory:

   ```bash
   git clone <repository-url>
   cd management-service-main
   ```

2. Install the required dependencies using npm:

   ```bash
   npm install
   ```

3. Start RabbitMQ on your local machine. You can follow the official [RabbitMQ setup instructions](https://www.rabbitmq.com/download.html).

4. Create a `.env` file in the root directory of the project and set up the required environment variables:

   ```bash
   RABBITMQ_URL=amqp://localhost
   ```

5. Start the service:

   ```bash
   npm start
   ```

   The service will be accessible at `http://localhost:4000`.

## API Endpoints

Here are the available API endpoints:

1. **GET /status**  
   Returns the current status of the management service.

   **Example Request:**

   ```bash
   curl -X GET http://localhost:4000/status
   ```

2. **POST /message**  
   Sends a message through RabbitMQ.

   **Example Request:**

   ```bash
   curl -X POST http://localhost:4000/message -H "Content-Type: application/json" -d '{"message": "Sample message"}'
   ```

## RabbitMQ Integration

The service integrates with RabbitMQ to handle message-based tasks. Ensure RabbitMQ is running before starting the service. The service connects to RabbitMQ via the `RABBITMQ_URL` environment variable. Make sure to set this in your `.env` file.

For more details on RabbitMQ configuration, refer to the official [RabbitMQ documentation](https://www.rabbitmq.com/documentation.html).

## Running Locally

1. Follow the setup instructions mentioned above to install dependencies and start RabbitMQ.
2. Start the service:

   ```bash
   npm start
   ```

3. Test the API using the provided `.http` file, or manually via `curl` commands or Postman.

   Example:

   ```bash
   curl -X GET http://localhost:4000/status
   ```

## Testing

You can manually test the endpoints using the provided HTTP file `Test-management-service.http` or by using tools like Postman.

For automated tests (if available), run:

```bash
npm test
```

## Deployment

To deploy the service:

1. Ensure the environment is set up with Node.js and RabbitMQ.
2. Set the environment variables in the production environment (`RABBITMQ_URL`).
3. Use a process manager like **PM2** to keep the service running in production:

   ```bash
   npm install -g pm2
   pm2 start index.js
   ```

4. Ensure RabbitMQ is running on the production server.

5. Optionally, configure a reverse proxy like NGINX for better performance and security.
