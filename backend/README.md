# Food Express — Backend

This is a standalone Express/MongoDB API added **beside** the existing
`FoodExpressFinal` frontend. No frontend files were modified, renamed, or
moved.

## Setup

```bash
cd backend
npm install
```

Edit `.env` (already created) and set your real `MONGO_URI` and `JWT_SECRET`.

## Run

```bash
npm run dev    # nodemon, auto-restart
npm start      # plain node
```

API runs at `http://localhost:5000` by default. Health check: `GET /api/health`.

## Folder structure

```
backend/
├── src/
│   ├── config/        # db.js — MongoDB connection
│   ├── controllers/    # auth, restaurants, foodItems, cart, orders
│   ├── middleware/    # authMiddleware (JWT), errorMiddleware
│   ├── models/         # User, Restaurant, FoodItem, Cart, Order
│   ├── routes/          # one router per feature
│   ├── app.js          # express app + route mounting
│   └── server.js       # connects DB, starts the server
├── package.json
└── .env
```

## API overview

| Method | Endpoint                          | Auth | Description              |
|--------|------------------------------------|------|---------------------------|
| POST   | /api/auth/register                | -    | Create account             |
| POST   | /api/auth/login                   | -    | Login, returns JWT         |
| GET    | /api/auth/me                      | yes  | Current user                |
| GET    | /api/restaurants                  | -    | List restaurants            |
| GET    | /api/restaurants/:id              | -    | Restaurant detail            |
| POST   | /api/restaurants                  | -    | Create restaurant (admin)  |
| PUT    | /api/restaurants/:id              | -    | Update restaurant (admin)  |
| DELETE | /api/restaurants/:id              | -    | Delete restaurant (admin)  |
| GET    | /api/food-items                   | -    | List food items (filter by `?restaurant=` / `?category=`) |
| GET    | /api/food-items/:id               | -    | Food item detail            |
| POST   | /api/food-items                   | -    | Create food item (admin)   |
| PUT    | /api/food-items/:id               | -    | Update food item (admin)   |
| DELETE | /api/food-items/:id               | -    | Delete food item (admin)   |
| GET    | /api/cart                         | yes  | Get current user's cart    |
| POST   | /api/cart                         | yes  | Add item `{ foodItemId, quantity }` |
| PUT    | /api/cart/:foodItemId             | yes  | Update item quantity        |
| DELETE | /api/cart/:foodItemId             | yes  | Remove item                 |
| DELETE | /api/cart                         | yes  | Clear cart                  |
| POST   | /api/orders                       | yes  | Place order from cart       |
| GET    | /api/orders                       | yes  | List my orders              |
| GET    | /api/orders/:id                   | yes  | Order detail                 |
| PUT    | /api/orders/:id/status            | yes  | Update order status         |

Authenticated routes expect `Authorization: Bearer <token>`.

## Connecting the existing frontend

No frontend code was changed. To wire it up later, you'd typically add a
small `src/services/api.ts` file inside the frontend that calls
`http://localhost:5000/api/...`, but that step was intentionally left out
here since it would mean touching the frontend `src/` folder. Let me know
when you want that wired in and I'll add it without altering anything else.
