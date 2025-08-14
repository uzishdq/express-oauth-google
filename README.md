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
