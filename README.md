# Products Lab API

A NestJS REST API for managing users, authentication, categories, and products with MongoDB and JWT-based route protection.

## Features

- User registration and login
- JWT authentication
- Protected CRUD endpoints for categories
- Protected CRUD endpoints for products
- Request validation with `class-validator` and `ValidationPipe`
- MongoDB integration through Mongoose

## Tech Stack

- NestJS
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt

## Project Structure

```text
src/
  auth/         Authentication, JWT, login, register
  categories/   Categories module, controller, service, schema, DTOs
  products/     Products module, controller, service, schema, DTOs
  users/        User schema and service
```

## Environment Variables

Create a `.env` file in the project root and define:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600
```

## Installation

```bash
npm install
```

## Running the App

```bash
# development
npm run start:dev

# production build
npm run build
npm run start:prod
```

The API runs by default on `http://localhost:3000`.

## API Overview

### Auth

`POST /auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

`POST /auth/login`

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Successful authentication returns an `accessToken` that should be sent as:

```http
Authorization: Bearer <token>
```

### Categories

All category endpoints require a valid JWT.

- `GET /categories`
- `GET /categories/:id`
- `POST /categories`
- `PATCH /categories/:id`
- `DELETE /categories/:id`

Create example:

```json
{
  "name": "Electronics"
}
```

### Products

All product endpoints require a valid JWT.

- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PATCH /products/:id`
- `DELETE /products/:id`

Create example:

```json
{
  "name": "Laptop",
  "price": 1500,
  "categoryId": "64f0c8f0c2b7c1a234567890"
}
```

## Validation Notes

- Unknown request fields are rejected
- Invalid MongoDB object IDs return `400 Bad Request`
- Missing entities return `404 Not Found`
- Invalid login credentials return `401 Unauthorized`

## Available Scripts

```bash
npm run build
npm run start
npm run start:dev
npm run start:debug
npm run start:prod
npm run lint
npm run test
npm run test:e2e
npm run test:cov
```

## Testing

```bash
npm run test
npm run test:e2e
```
