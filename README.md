# Node API Platform

A production-ready Node.js REST API built with Express.js, featuring security best practices, comprehensive error handling, logging, and testing.

## Features

- ✅ **Express.js** - Fast, unopinionated web framework
- ✅ **Security** - Helmet, CORS, rate limiting
- ✅ **Validation** - Request validation with express-validator
- ✅ **Error Handling** - Centralized error handling middleware
- ✅ **Logging** - Winston logger with file rotation
- ✅ **Testing** - Jest with Supertest
- ✅ **Code Quality** - ESLint + Prettier
- ✅ **Environment Config** - dotenv for configuration
- ✅ **Compression** - Response compression
- ✅ **ES Modules** - Modern JavaScript syntax

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

## Installation

```bash
# Clone the repository
git clone https://github.com/mr-adonis-jimenez/node-api-platform.git
cd my-node-project

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

## Usage

### Development Mode

```bash
npm run dev
```

This starts the server with nodemon for auto-reloading.

### Production Mode

```bash
npm start
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Linting & Formatting

```bash
# Check for linting errors
npm run lint

# Fix linting errors
npm run lint:fix

# Format code
npm run format
```

### Security Audit

```bash
# Check for vulnerabilities
npm run security:audit

# Attempt to fix vulnerabilities
npm run security:fix
```

## API Endpoints

### Health Check
- **GET** `/health` - Server health status

### Users
- **GET** `/api/users` - Get all users
- **GET** `/api/users/:id` - Get user by ID
- **POST** `/api/users` - Create new user
- **PUT** `/api/users/:id` - Update user
- **DELETE** `/api/users/:id` - Delete user

### Example Requests

#### Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

#### Get All Users
```bash
curl http://localhost:3000/api/users
```

#### Get User by ID
```bash
curl http://localhost:3000/api/users/1
```

#### Update User
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "email": "jane@example.com"}'
```

#### Delete User
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## Project Structure

```
node-api-platform/
├── src/
│   ├── __tests__/          # Test files
│   │   └── users.test.js
│   ├── middleware/         # Custom middleware
│   │   └── errorHandler.js
│   ├── routes/            # Route definitions
│   │   ├── index.js
│   │   └── userRoutes.js
│   ├── utils/             # Utility functions
│   │   └── logger.js
│   └── index.js           # Application entry point
├── logs/                  # Log files (auto-generated)
├── .env.example          # Environment variables template
├── .eslintrc.json        # ESLint configuration
├── .gitignore           # Git ignore rules
├── jest.config.js       # Jest configuration
├── package.json         # Project dependencies
└── README.md           # This file
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production) | development |
| `PORT` | Server port | 3000 |
| `ALLOWED_ORIGINS` | CORS allowed origins | * |
| `LOG_LEVEL` | Logging level (error/warn/info/debug) | info |

## Security Features

- **Helmet** - Sets various HTTP headers for security
- **CORS** - Configurable Cross-Origin Resource Sharing
- **Rate Limiting** - Prevents abuse (100 requests per 15 minutes)
- **Input Validation** - Validates and sanitizes all inputs
- **Error Handling** - Doesn't leak sensitive info in production

## Best Practices Implemented

- ✅ ES Modules syntax
- ✅ Async/await error handling
- ✅ Graceful shutdown handling
- ✅ Request validation
- ✅ Structured logging
- ✅ Environment-based configuration
- ✅ Comprehensive test coverage
- ✅ Code linting and formatting
- ✅ Security headers
- ✅ Rate limiting

## Next Steps / Enhancements

Consider adding:

1. **Database Integration** (PostgreSQL, MongoDB, etc.)
2. **Authentication & Authorization** (JWT, OAuth)
3. **API Documentation** (Swagger/OpenAPI)
4. **Caching** (Redis)
5. **Docker** containerization
6. **CI/CD** pipeline (GitHub Actions)
7. **Monitoring** (Prometheus, Grafana)
8. **File Upload** handling
9. **Email** service integration
10. **WebSocket** support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Author

Adonis Jimenez

## Support

For issues and questions, please open an issue on GitHub.
