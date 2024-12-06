# Nest Server

Backend server for the Nest application built with Node.js and Express.

## Project Structure

```
server/
├── config/             # Configuration files and environment setup
├── controllers/        # Route controllers (business logic)
├── models/            # Database models
├── routes/            # Route definitions
├── middleware/        # Custom middleware
├── utils/             # Utility functions and helpers
├── .env               # Environment variables
├── index.js           # Application entry point
└── package.json       # Project dependencies and scripts
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Copy `.env.example` to `.env` and update the values.

3. Start the development server:
```bash
npm start
```

## API Documentation

The API documentation will be available at `http://localhost:5000/api-docs` when the server is running.
