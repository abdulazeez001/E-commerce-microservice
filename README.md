# Microservice E-commerce

An e-commerce firm that is currently migrating their api-driven architecture to microservices which requires making the customer, product, order and payment services communicate seamlessly

## Architecture

The project uses a Microservices Architecture with RabbitMq as a message queue to communicate between services.
Each Services as 3 Layers: Routes, Services and Data Access.
The Date Access layer has 3 sub-layers: Repository, Model, Database.
The business logic of takes place in the Service layer which interacts with
all layers of the architecture. The Utilities component takes care of the
basic needs of all layers. Third-Party Services component are included in the Service
layer, they interact with APIs needed by the system.

## Procedure

- When a customer makes an order, a message/request (containing data like customerId, productId, amount etc.) should be sent to the order service using a REST (RESTful) base communication.

- The order service in turn sends a request (containing customerId, orderId, amount) to the payment service, the order (which should contain the customerId, productId, orderId, amount and orderStatus [pending]) should be saved in the database and also a response (this response should contain the customerId, orderId, productId, and orderStatus) be sent back to the customer.

- The payment service should publish transaction details (customerId, orderId, productId, and amount) to a rabbitmq messaging queue and a worker at the end of the queue should save the queued data in the database transaction history.

## Technologies

- [NodeJS (Typescript)](https://nodejs.org/) - Runtime Environment
- [ExpressJs](https://expressjs.com/) - Web Application Framework
- [Joi]() - Validation library
- [MongoDB]() - Database
- [jsonwebtoken]() - For Authentication
- [bcryptjs]() - For password hashing
- [RabbitMq]() - Message Queue

## Ports

### Local

- Customer /4000
- Product /4001
- Order /4002
- Payment /4003

### Docker

- Customer /8080
- Product /8081
- Order /8082
- Payment /8083

## How To Test

### Without docker

- Clone Repo
- Ensure you have node, mongodb and rabbitmq installed
- Navigate into EACH services and run:

  ```bash
    npm run start:dev
  ```

- Go to postman or any api tester
- Login customer :

  ```js
  POST http://localhost:4000/login
  Payload {
      email: 'jonsnow@gmail.com'
      password: 'Testing#1'
  }
  ```

- To place an order, retrieve a list of products to choose from:

  ```js
    GET http://localhost:4001/products
  ```

- Copy the token from the login and productId of the product you wish to order:

  ```js
    POST http://localhost:4001/products/:productId/orders
  ```

  ### With docker (Not totally tested saw this late )

- Clone Repo
- Ensure you have docker installed
- Ensure that you have internet connect.
- Navigate to the project root and run:

  ```bash
    docker-compose up
  ```

- Go to postman or any api tester
- Login customer :

  ```js
  POST http://localhost:8080/login
  Payload {
      email: 'jonsnow@gmail.com'
      password: 'Testing#1'
  }
  ```

- To place an order, retrieve a list of products to choose from:

  ```js
    GET http://localhost:8081/products
  ```

- Copy the token from the login and productId of the product you wish to order:

  ```js
    POST http://localhost:8081/products/:productId/orders
  ```

## NOTE

- The Sample customer is already seeded you don't have to create yours though you can.

```js
 Without Docker
  POST http://localhost:4000/sign-up
  Payload (Example) {
      firstName: 'Arthur',
      lastName: 'Dyne'
      email: 'arthurdyne@gmail.com'
      password: 'Testing#1'
  }
```

```js
 Docker
  POST http://localhost:8080/sign-up
  Payload (Example) {
      firstName: 'Arthur',
      lastName: 'Dyne'
      email: 'arthurdyne@gmail.com'
      password: 'Testing#1'
  }
```

- The products are also seeded you can create your yours

```js
Without Docker
  POST http://localhost:4001/products
  Payload (Example) {
      name: 'Bean',
      description: 'Food of thought'
      price: 5000
  }
```

```js
Docker
  POST http://localhost:8081/products
  Payload (Example) {
      name: 'Bean',
      description: 'Food of thought'
      price: 5000
  }
```

- The are also lots of useful endpoints check the codes to see : )
