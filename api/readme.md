# Orenda Backend

Typescript Express Backend to serve API for React Client.

## Installation

Install dependancy packages first

```bash
npm install
```

Create a `.env` inside the api folder file to setup the required environment variables, you can copy the value from below

```python
PORT=7000
# development | production | testing
NODE_ENV=development
JWT_SECRET=xae1a12

DB_USER=postgres
DB_PASSWORD=admin
DB_DATABASE=orenda
DB_HOST=127.0.0.1
```

Run the script below to execute in development
```
npm run dev
```

Read the API documentation schema from below endpoints
```
http://localhost:7000/docs
```