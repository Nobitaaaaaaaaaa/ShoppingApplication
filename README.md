# Forever E-Commerce Platform

A complete, full-stack E-Commerce application (MERN stack) consisting of a user-facing storefront, an administrative dashboard, and a robust backend REST API. This application integrates secure token-based authentication, real-time image uploads, dynamic cart management, and multiple payment methods (including Stripe, Razorpay, and Cash on Delivery).

---

## 🛠️ Integrated Technologies & Architecture

The project is structured as a monorepo consisting of three main modules:
```
ShoppingApplication/
├── frontend/     # Vite + React 19 Customer Storefront
├── admin/        # Vite + React 19 Store Management Panel
└── backend/       # Express + Node.js API Service with MongoDB
```

### 💻 Frontend & Admin Dashboard
*   **Framework**: [React 19](https://react.dev/) – Component-driven client-side application.
*   **Build Tool**: [Vite 8](https://vite.dev/) – Lightning-fast development server and asset bundling.
*   **Styling**: [TailwindCSS v4](https://tailwindcss.com/) – Modern utility-first CSS framework.
*   **Routing**: [React Router DOM v7](https://reactrouter.com/) – Client-side routing for seamless page navigation.
*   **HTTP Client**: [Axios](https://axios-http.com/) – Promised-based HTTP client to consume Backend REST APIs.
*   **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/) – Elegant toast messages for real-time status alerts (e.g. cart addition, payment failures).
*   **State Management**: React Context API (`ShopContext`) – Manages global state including search parameters, cart items, products list, and user authorization token.

### ⚙️ Backend (API Server)
*   **Runtime**: [Node.js](https://nodejs.org/) & [Express v5](https://expressjs.com/) – High-performance RESTful routing and server-side logic.
*   **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose v9](https://mongoosejs.com/) – Document-oriented NoSQL database and Object Data Modeling (ODM).
*   **Image Hosting**: [Cloudinary SDK](https://cloudinary.com/) – Cloud-based media storage and image optimization.
*   **File Uploads**: [Multer](https://github.com/expressjs/multer) – Node.js middleware for handling multipart/form-data (used for uploading product images).
*   **Authentication & Security**:
    *   `jsonwebtoken` (JWT) – Securing APIs and managing login sessions for users and admins.
    *   `bcryptjs` – Secure password hashing.
    *   `validator` – Email and input format validation.
    *   `cors` – Cross-Origin Resource Sharing middleware.
*   **Development Utility**: `nodemon` – Monitors for server file modifications and restarts automatically.

### 💳 Integrated Payment Gateways
*   **Stripe**: Uses Stripe Checkout Session redirect flow for secure credit/debit card transactions.
*   **Razorpay**: Uses Razorpay's custom overlay/checkout modal script inside the browser, verifying payments through backend API signature fetching.
*   **Cash on Delivery (COD)**: Supports traditional manual checkout that directly registers orders in the system.

---

## 🚀 Key Features

### 🛒 Customer Storefront (`frontend`)
*   **Home Page**: Features hero sliders, latest collections, and best sellers.
*   **Dynamic Collection Filtering**: Browse products with search functionality, category selection (e.g., Men, Women, Kids), and sub-category sorting (e.g., Topwear, Bottomwear, Winterwear).
*   **Product Details**: Individual product pages showing price, sizes available (with validation alerts), description, and related products listing.
*   **Shopping Cart**: Edit quantities, calculate real-time totals, apply delivery fees, and sync database values in real-time when authenticated.
*   **Multi-Gateway Checkout**: Choose between Stripe, Razorpay, or COD.
*   **Order Tracking**: View purchase history, payment status (paid/unpaid), and shipping updates.
*   **Responsive UI**: Optimized layout for mobile, tablet, and desktop screens.

### 📊 Admin Panel (`admin`)
*   **Secure Admin Login**: Restricts access to authorized administrators using predefined credentials.
*   **Add Product**: Upload up to 4 images concurrently (uploaded to Cloudinary). Set properties including Category, Subcategory, Price, Sizes (S, M, L, XL, XXL), and highlight as "Bestseller".
*   **Inventory List**: View list of all active products in the system with one-click removal.
*   **Order Management**: Track orders across the entire application. View detailed customer addresses, items ordered, payment statuses, and change order delivery status (e.g., Order Placed, Packing, Shipped, Out for Delivery, Delivered).

## ⚙️ Detailed Integration Workflows

### 🗄️ MongoDB & Mongoose (Database Integration)
MongoDB acts as the persistent storage layer of the application. The backend uses Mongoose to perform database operations:
*   **Persistent Shopping Carts**: When an authenticated user adds items to their cart or changes quantities, the data is instantly synchronized with their MongoDB user document (`cartData` object). This allows their cart to persist across different browsers and devices.
*   **Order History**: Every checkout session (Stripe, Razorpay, or COD) creates an order document inside the `orders` collection containing full shipment details, products purchased, payment status, and tracking info.
*   **Dynamic Products List**: All product cards displayed on the store landing page and collection filters are dynamically queried from the MongoDB database.

### ☁️ Cloudinary & Multer (Media Upload Integration)
Rather than hosting heavy images on your server or database, the system uses Cloudinary's cloud storage:
*   **Admin Upload Flow**: When an administrator submits a new product form with up to 4 images, the request is parsed by Multer middleware.
*   **Temporary Server Processing**: Multer temporarily receives the uploaded files on disk.
*   **Cloudinary Upload**: The product controller uploads each image to Cloudinary using the Cloudinary SDK, retrieving a secure URL.
*   **Reference Storage**: The server saves only the lightweight secure URL array inside the MongoDB product document, maintaining database efficiency and fast image loading.

### 💳 Stripe Payments (Redirect Flow)
Stripe handles secure international debit/credit card transactions:
*   **Checkout Session**: The backend creates a Stripe Checkout session with the itemized cart, prices, and shipping fee.
*   **Stripe Hosting**: The user is redirected to a pre-built secure payment checkout page hosted on Stripe's domain.
*   **Redirect Verification**: Upon completion or cancellation, Stripe redirects the client back to the storefront's `/verify` route. The frontend then calls the `/api/order/verifyStripe` API to verify payment validity, update the order in MongoDB as paid, and empty the user's cart.

### 💳 Razorpay Payments (Modal Overlay Flow)
Razorpay handles localized payments through a custom overlay script:
*   **Order Initialization**: The backend API creates a Razorpay transaction order and returns a unique `order_id` and public key.
*   **JS SDK Checkout Modal**: The frontend calls Razorpay's JavaScript SDK to display a payment popup overlay directly on the checkout screen.
*   **Signature Verification**: After the payment finishes, transaction signatures are validated by the backend's `/api/order/verifyRazorpay` API before the order status is updated.

### 🔒 JWT Authentication & Security
*   **Bcryptjs Encryption**: User passwords are securely hashed using Bcrypt before saving to MongoDB, preventing data theft leaks.
*   **State Auth Token**: Standard user sessions are authenticated via JWTs containing user IDs. The JWT is saved in local storage and sent in the HTTP headers to secure routes like `/api/cart/*` and `/api/order/*`.
*   **Admin Access Control**: The Admin panel passes a JWT containing admin credentials. The backend's `adminAuth` middleware decrypts and compares the payload against server environment variables (`ADMIN_EMAIL` & `ADMIN_PASSWORD`) to authorize management tasks.

---

## 🗄️ Database Schemas (Mongoose)

### 1. User Schema (`userModel.js`)
Stores user profiles, credentials, and persistent cart objects.
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object, default: {} } // Format: { [productId]: { [size]: quantity } }
}
```

### 2. Product Schema (`productModels.js`)
Stores detailed product specs.
```javascript
{
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },     // Cloudinary secure URLs
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },     // e.g. ["S", "M", "L"]
  bestseller: { type: Boolean },
  date: { type: Number, required: true }      // Timestamp format
}
```

### 3. Order Schema (`orderModels.js`)
Keeps track of purchases, delivery details, and payment state.
```javascript
{
  userId: { type: String, required: true },
  items: { type: Array, required: true },       // List of product items with size and quantity
  amount: { type: Number, required: true },     // Total cost (including delivery charges)
  address: { type: Object, required: true },    // Shipping address detailed object
  status: { type: String, default: "order Placed" }, // Current delivery status
  paymentMethod: { type: String, required: true }, // "COD", "Stripe", or "Razorpay"
  payment: { type: Boolean, required: true, default: false }, // Paid or Unpaid
  date: { type: Number, default: Date.now }
}
```

---

## 🔌 API Reference

### 🧑‍💻 User Routes (`/api/user`)
*   `POST /register` - Registers a new user. Expects `name`, `email`, `password`.
*   `POST /login` - User login. Returns JWT Auth Token.
*   `POST /admin` - Admin login. Verifies email/password and returns Admin JWT.

### 👗 Product Routes (`/api/product`)
*   `POST /add` *(Admin JWT Required)* - Uploads product details and files (images 1-4) via Multer, updates database.
*   `POST /remove` *(Admin JWT Required)* - Deletes a product by `id`.
*   `POST /single` *(Admin JWT Required)* - Gets details of a single product.
*   `GET /list` - Retrieves all products in the database.

### 🛒 Cart Routes (`/api/cart`)
*   `POST /get` *(User JWT Required)* - Fetches current user's cart object.
*   `POST /add` *(User JWT Required)* - Adds an item to the cart. Expects `itemId`, `size`.
*   `POST /update` *(User JWT Required)* - Updates the quantity of a specific item/size. Expects `itemId`, `size`, `quantity`.

### 📦 Order Routes (`/api/order`)
*   `POST /list` *(Admin JWT Required)* - Retrieves all orders.
*   `POST /status` *(Admin JWT Required)* - Updates delivery status of an order. Expects `orderId`, `status`.
*   `POST /place` *(User JWT Required)* - Places a COD order.
*   `POST /stripe` *(User JWT Required)* - Initiates Stripe payment session and returns Checkout Session URL.
*   `POST /razorpay` *(User JWT Required)* - Creates a Razorpay order in the gateway and returns details.
*   `GET /userOrders` *(User JWT Required)* - Fetches order history for the logged-in user.
*   `POST /verifyStripe` *(User JWT Required)* - Verifies a Stripe Checkout redirect success/failure status.
*   `POST /verifyRazorpay` *(User JWT Required)* - Validates Razorpay payment signature and marks order as paid.

---

## ⚙️ Environment Configuration

Set up environment variable files inside each component directory:

### 1. Backend Config (`backend/.env`)
```env
PORT=4000
MONGODB_URI="your-mongodb-connection-string"
JWT_SECRET="your-jwt-secret-key"

# Cloudinary Credentials
CLOUDINARY_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-cloudinary-key"
CLOUDINARY_API_SECRET="your-cloudinary-secret"

# Admin Access Credentials
ADMIN_EMAIL="admin@forever.com"
ADMIN_PASSWORD="admin_secure_password"

# Payment Gateway Secrets
STRIPE_SECRET_KEY="your-stripe-secret-key"
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
```

### 2. Frontend Config (`frontend/.env`)
```env
VITE_BACKEND_URL="http://localhost:4000"
VITE_RAZORPAY_KEY_ID="your-razorpay-key-id"
```

### 3. Admin Config (`admin/.env`)
```env
VITE_BACKEND_URL="http://localhost:4000"
```

---

## 🏃 Local Installation & Setup

Follow these steps to run the application locally on your computer.

### Prerequisites
*   [Node.js](https://nodejs.org/) installed (v18 or higher recommended).
*   [MongoDB Atlas](https://www.mongodb.com/) cluster or a local MongoDB community server running.
*   Accounts on [Cloudinary](https://cloudinary.com/), [Stripe](https://stripe.com/), and [Razorpay](https://razorpay.com/) for API keys (optional, but required to test active payments and image uploads).

### Step 1: Install Dependencies
Open three terminals (one for each folder) or install individually:

#### Backend:
```bash
cd backend
npm install
```

#### Frontend (Storefront):
```bash
cd frontend
npm install
```

#### Admin Dashboard:
```bash
cd admin
npm install
```

### Step 2: Start Development Servers

#### 1. Launch Backend API Server
In the `backend` terminal:
```bash
npm run server
```
*   The server will run on `http://localhost:4000` by default.

#### 2. Launch Client Storefront
In the `frontend` terminal:
```bash
npm run dev
```
*   The store will be available on `http://localhost:5173` (or the next available port).

#### 3. Launch Admin Panel
In the `admin` terminal:
```bash
npm run dev
```
*   The admin dashboard will be available on the specified Vite development port (typically `http://localhost:5174` or check your terminal output).

---

## 📂 Project Structure Walkthrough

### Backend Architecture
*   `server.js`: Application setup, middleware declarations (CORS, Express JSON parser), database connection invocations, and main route bindings.
*   `config/`: Setup configurations for connecting database client (`mongodb.js`) and initializing Cloudinary SDK (`cloudinary.js`).
*   `controllers/`: Contains core handlers that process client requests, run business logic (validation, password hashing, payment session creations), and return JSON responses.
*   `middleware/`: Helper functions like JWT decoders (`auth.js`), Administrator checks (`adminAuth.js`), and file destination handlers (`multer.js`).
*   `models/`: Mongoose structures mapping to MongoDB collections.
*   `routes/`: Express routers dispatching routes to corresponding controller actions.

### Frontend & Admin Applications
*   `src/components/`: Reusable graphical UI structures such as navigation bars, sidebar widgets, product sliders, newsletter signups, search bars, and footer segments.
*   `src/pages/`: Complete view definitions (e.g. Products list, Collection filters, Cart management, Place Order forms, Order verification).
*   `src/context/`: Context Provider wrapper enabling standard access to state objects, api helper functions (`addToCart`, `getCartAmount`), and variables across components.
*   `src/assets/`: Graphical properties like logos, banner slide resources, and icons.
