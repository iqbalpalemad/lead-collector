# Express JWT Auth App

A simple Express backend API with signup, login, and JWT authentication.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file (already included) and set your JWT secret.
3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

- `POST /signup` — Register a new user (body: `{ "username": string, "password": string }`)
- `POST /login` — Authenticate and get JWT (body: `{ "username": string, "password": string }`)
- `GET /protected` — Example protected route (requires `Authorization: Bearer <token>` header)

## Notes
- This demo uses in-memory user storage. Use a database for production.
