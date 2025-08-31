# Shopshop

## Overview

**Shopshop** is a full stack e-commerce web app built with **Angular + NestJS** in an **Nx monorepo**.\
It offers product browsing, shopping cart & checkout, admin product management, and sales analytics.\
The project’s main goal was to **learn TypeScript web development**, especially **Angular** on the frontend and **NestJS** on the backend.

Built collaboratively by [Itapit](https://github.com/Itapit) and [RonenShot](https://github.com/RonenShot)

---

## Tech Stack

- **Frontend:** Angular, NgRx, PrimeNG, Chart.js
- **Backend:** NestJS, MongoDB (Mongoose), JWT Auth
- **Monorepo & Tooling:** Nx, Docker Compose
- **UI/UX:** PrimeFlex, PrimeIcons, toast notifications, skeleton loaders

---

## Core Features

### Authentication & Roles

- JWT based login/logout stored as secure cookie
- Role based guards (Admin vs Client vs Guest)
- Admin only endpoints for product management & analytics

### Shopping

- Option to view the catalog while not logged in
- Browse products with search and pagination
- Add/update/remove items in cart
- Real time feedback with skeleton loaders and toast notifications  

### Orders

- Clients: place orders, clear cart
- Admins: view orders, calculate total profit

### Admin Dashboard

- Full Crud management of products (add/edit/delete)
- Create new user accounts
- Sales analytics dashboard with Chart.js: revenue, orders, top products

---

## Design Patterns & Decisions

- **Nx Monorepo:** Both frontend and backend live in one workspace, with a shared `common` library for interfaces and enums.
- **Angular Modules (not Standalone):** We deliberately use the **traditional NgModule structure** for clear boundaries between feature areas. 
- **NgRx State Management:** Chosen for predictable state handling across complex features. Selectors and facades provide clean data access.
- **Repository Pattern (Backend):** NestJS services delegate persistence to repositories. This isolates database logic and makes it easier to test and extend.
- **DTO Validation (class-validator):** All request payloads are validated and transformed at the boundary
- **Mongo Aggregation Pipelines:** Used for analytics (e.g., sales over time, top products). Offloads computation to the database for efficiency.

---

## Setup

### Local Development

```bash
npm install --legacy-peer-deps
npx nx serve backend   # starts NestJS at http://localhost:3000
npx nx serve frontend  # starts Angular at http://localhost:4200
```

> Requires MongoDB running (`MONGO_URI` in `.env`).

### Docker Compose

```bash
# nx serve
docker-compose -f docker-compose-itamar.yml up --build

# nginx serve
docker-compose -f docker-compose.yml up --build
```

`.env` example:

```env
MONGO_URI=mongodb://localhost:27017/shopshop-db
JWT_SECRET=supersecret
```

---
