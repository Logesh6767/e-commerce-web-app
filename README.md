# ShopEase - E-Commerce Web Application

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

### Customer Features
- Browse product catalog with search and category filters
- Add to cart, update quantities, remove items
- Checkout with shipping address
- Order history and order tracking
- User registration and login

### Admin Features
- Dashboard with sales statistics
- Product management (CRUD)
- Order management with status updates
- User management

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, Vite, React Router v6    |
| Backend    | Node.js, Express.js                |
| Database   | MongoDB with Mongoose               |
| Auth       | JWT (JSON Web Tokens), bcryptjs     |
| Styling    | Custom CSS (no frameworks)          |

## Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd e-commerce-web-app
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Set Up MongoDB

Make sure MongoDB is running locally on the default port (27017).

**Windows:**
```bash
# If installed as a service, it should be running automatically
# Otherwise, start it manually:
mongod
```

**macOS (Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 4. Seed the Database

```bash
cd backend
npm run seed
```

This creates:
- **Admin account:** admin@example.com / admin123
- **User account:** user@example.com / user123
- **12+ sample products** across various categories

### 5. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs at: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs at: http://localhost:3000

### 6. Open in Browser

Navigate to http://localhost:3000

## Project Structure

```
e-commerce-web-app/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/       # Auth & error middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── seed.js          # Database seeder
│   └── server.js        # Entry point
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/         # Axios configuration
│       ├── components/  # Reusable components
│       ├── context/     # React Context providers
│       ├── pages/       # Page components
│       └── utils/       # Helper functions
└── README.md
```

## API Endpoints

### Authentication
| Method | Endpoint            | Description          | Access  |
|--------|---------------------|----------------------|---------|
| POST   | /api/auth/register  | Register new user    | Public  |
| POST   | /api/auth/login     | Login user           | Public  |
| GET    | /api/auth/me        | Get current user     | Private |

### Products
| Method | Endpoint            | Description          | Access  |
|--------|---------------------|----------------------|---------|
| GET    | /api/products       | Get all products     | Public  |
| GET    | /api/products/:id   | Get single product   | Public  |
| POST   | /api/products       | Create product       | Admin   |
| PUT    | /api/products/:id   | Update product       | Admin   |
| DELETE | /api/products/:id   | Delete product       | Admin   |

### Cart
| Method | Endpoint            | Description          | Access  |
|--------|---------------------|----------------------|---------|
| GET    | /api/cart           | Get user's cart      | Private |
| POST   | /api/cart           | Add item to cart     | Private |
| PUT    | /api/cart/:itemId   | Update cart item     | Private |
| DELETE | /api/cart/:itemId   | Remove cart item     | Private |
| DELETE | /api/cart           | Clear cart           | Private |

### Orders
| Method | Endpoint            | Description          | Access  |
|--------|---------------------|----------------------|---------|
| POST   | /api/orders         | Create order         | Private |
| GET    | /api/orders         | Get user's orders    | Private |
| GET    | /api/orders/:id     | Get single order     | Private |

### Admin
| Method | Endpoint              | Description          | Access  |
|--------|-----------------------|----------------------|---------|
| GET    | /api/admin/stats      | Dashboard statistics | Admin   |
| GET    | /api/admin/orders     | All orders           | Admin   |
| PUT    | /api/admin/orders/:id | Update order status  | Admin   |
| GET    | /api/admin/users      | All users            | Admin   |

## Demo Credentials

| Role  | Email              | Password |
|-------|--------------------|----------|
| Admin | admin@example.com  | admin123 |
| User  | user@example.com   | user123  |

## License

MIT
