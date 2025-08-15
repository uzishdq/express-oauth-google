# 🔐 Authentication with Express, TypeScript & Google OAuth

A authentication backend built with **Express.js** and **TypeScript**, featuring **Google OAuth (via Passport.js)**, **JWT-based authentication**, and modern best practices for enterprise-grade applications.

This project focuses **exclusively** on authentication, ensuring high-quality, maintainable, and testable code using **Object-Oriented Programming (OOP)** principles.

---

## ✨ Features

- **Google OAuth 2.0** using [Passport.js](http://www.passportjs.org/)
- **JWT authentication** (access & refresh tokens)
- **Secure password hashing** with `bcrypt`
- **Input validation** with `Zod`
- **Environment variable management** with `dotenv`
- **Security enhancements**: Helmet, CORS, rate limiting
- **Error handling & logging** (centralized middleware)
- **HTTP-only cookies** for tokens
- **PostgreSQL + Drizzle ORM** for type-safe database queries
- **OOP architecture**: Controllers, Services, Repositories, Middleware

---

## 🛠 Tech Stack

- **Backend Framework:** [Express.js](https://expressjs.com/) with [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) + [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** [Passport.js](http://www.passportjs.org/) (Google OAuth 2.0), JWT
- **Validation:** [Zod](https://zod.dev/)
- **Security:** Helmet, CORS, Rate Limiter

---

## 📂 Project Structure

```plaintext
src/
 ├── config/        # Environment configs
 ├── controllers/   # Request handling
 ├── database/      # Database schema
 ├── services/      # Business logic
 ├── repositories/  # Database access
 ├── middleware/    # Auth, validation, error handling
 ├── utils/         # Helpers & constants
 ├── routes/        # Express route definitions
 └── server.ts        # App entry point
```

## 📌 API Routes

| HTTP Method | Path                    | Description                                                                     | Middleware                                                           | Controller / Handler                     |
| ----------- | ----------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------- |
| **POST**    | `/auth/register`        | Register a new user with email and password, returns access and refresh tokens. | None                                                                 | `AuthController.register`                |
| **POST**    | `/auth/login`           | Log in a user with email and password, returns access and refresh tokens.       | None                                                                 | `AuthController.login`                   |
| **GET**     | `/auth/google`          | Initiates Google OAuth flow, redirects to Google consent screen.                | Passport (`passport.authenticate('google')`)                         | Passport Google Strategy                 |
| **GET**     | `/auth/google/callback` | Handles Google OAuth callback, returns tokens and user data.                    | Passport (`passport.authenticate('google')`)                         | Custom callback handler (returns tokens) |
| **POST**    | `/auth/refresh`         | Refreshes JWT access token using refresh token from HTTP-only cookie.           | None                                                                 | `AuthController.refresh`                 |
| **POST**    | `/auth/logout`          | Logs out user by clearing refresh token cookie.                                 | None                                                                 | `AuthController.logout`                  |
| **GET**     | `/auth/protected`       | Protected route accessible only to users with `admin` role (RBAC example).      | `AuthMiddleware.authenticate`, `AuthMiddleware.authorize(['admin'])` | Inline handler (returns success message) |
