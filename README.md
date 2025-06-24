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


# Backend API Documentation

All API responses follow this structure:
```json
{
  "result": true/false,
  "data": ...,
  "error": "..." // only present if there is an error
}
```

---

## Authentication
All endpoints (except `/signup` and `/login`) require a JWT in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## Auth APIs

### Signup
- **POST** `/signup`
- **Body:**
```json
{
  "username": "string",
  "password": "string"
}
```
- **Response:**
```json
{
  "result": true,
  "data": { "message": "User registered successfully." }
}
```

### Login
- **POST** `/login`
- **Body:**
```json
{
  "username": "string",
  "password": "string"
}
```
- **Response:**
```json
{
  "result": true,
  "data": { "token": "<JWT_TOKEN>" }
}
```

---

## Camp APIs

### Create Camp
- **POST** `/api/camp`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "string",
  "date": "YYYY-MM-DD"
}
```
- **Response:**
```json
{
  "result": true,
  "data": { ...campObject }
}
```

### List Camps
- **GET** `/api/camp`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "result": true,
  "data": [ ...campObjects ]
}
```

---

## Lead APIs

### Create Lead
- **POST** `/api/lead`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "string",
  "phone": "string",
  "camp": "camp_id",
  "note": "string (optional)"
}
```
- **Response:**
```json
{
  "result": true,
  "data": { ...leadObject }
}
```

### Update Lead
- **PUT** `/api/lead/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "string (optional)",
  "phone": "string (optional)",
  "note": "string (optional)",
  "status": "new | pending | waiting for payment | confirmed | cancelled (optional)"
}
```
- **Response:**
```json
{
  "result": true,
  "data": { ...leadObject }
}
```

### List Leads
- **GET** `/api/lead/:campId`
- **Headers:** `Authorization: Bearer <token>`
- **URL Param:** `campId` (the camp's MongoDB ObjectId)
- **Response:**
```json
{
  "result": true,
  "data": [ ...leadObjects ]
}
```

---

## Error Response Example
```json
{
  "result": false,
  "data": null,
  "error": "Error message here"
}
```

---

## Notes
- All date fields are ISO8601 strings.
- All IDs are MongoDB ObjectIds.
- `createdBy`, `updatedBy`, and `assignedTo` are user IDs taken from the JWT.
- On lead creation, status is always `new` and not assigned to anyone.
- On lead update, `assignedTo` becomes the user making the request.

---

For any further questions or sample requests, contact the backend team.

