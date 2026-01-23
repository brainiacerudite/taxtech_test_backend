# Taxtech Test Shipment Management API (Backend)

This is the backend service for the Taxtech Technical Assessment. It is a RESTful API built with **Node.js**, **Express**, and **TypeScript**, designed to manage shipment data efficiently and securely.

## 🚀 Key Features
- **Architecture:** Modular MVC with a dedicated Service Layer and "Hub & Spoke" routing.
- **Validation:** Robust request validation using **Zod**.
- **Database:** MongoDB with Mongoose (Indexed for performance).
- **Security:** Implemented `helmet`, `hpp`, `cors`, and `express-rate-limit`.
- **Testing:** Full Integration and Unit test suites using **Jest** and **Supertest**.
- **Logging:** Structured logging with `winston` and daily log rotation.

---

## 🛠️ Prerequisites
- **Node.js** (v16+ recommended)
- **MongoDB** (Local instance or Atlas URI)

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-link>
   cd taxtech_test_backend
   ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Environment Configuration**
    
    Copy the example environment file and configure your settings:
    
    ```bash
    cp .env.example .env
    ```
    
    Then update the values in `.env` as needed for your environment.

---

## 🏃‍♂️ Running the Application

**Development Mode**

Runs the server with hot-reloading (Nodemon).
```bash
npm run dev
```

**Production Mode**

Builds the TypeScript source and runs the compiled JavaScript.
```bash
npm run build
npm start
```

**Testing**

Run the comprehensive test suite (Unit + Integration).
```bash
npm test
```

- **Unit Tests:** `npm run test:unit` (Fast, logic-only)
- **Integration Tests:** `npm run test:int` (Full API flow with Test DB)

---

## 📡 API Documentation

**Base URL:** `http://localhost:8000/api`

| Method | Endpoint | Description | Validations |
|--------|----------|-------------|-------------|
| GET | `/health` | API Health Check | N/A |
| GET | `/shipments` | Retrieve all shipments (Paginated) | Query params (page, limit, status) |
| POST | `/shipments` | Create a new shipment | Body must match schema |
| GET | `/shipments/:id` | Get details of specific shipment | Valid MongoDB ID required |
| PUT | `/shipments/:id` | Update a shipment | Valid ID + Body validation |
| DELETE | `/shipments/:id` | Delete a shipment | Valid MongoDB ID required |

---

## 📂 Project Structure

```
src/
├── config/         # Environment & DB Configuration
├── controllers/    # Request Handlers (HTTP Layer)
├── middleware/     # Error Handling, Validation, Rate Limiting
├── models/         # Mongoose Schemas & Indexes
├── routes/         # API Route Definitions
├── services/       # Business Logic (Database Interactions)
├── types/          # TypeScript Interfaces & Enums
├── utils/          # Logger & Helper Functions
└── validations/    # Zod Validation Schemas
```

---

## 👤 Author

**Oluwasegun Thomas (Brainiac Erudite)**  
Full Stack Engineer