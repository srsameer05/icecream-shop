# ScoopBill 🍦

ScoopBill is a modern, full-stack Point of Sale (POS) and billing system designed originally for ice cream shops but extensible to any retail store. Built meticulously with Next.js 16 (App Router), Tailwind CSS v4, and MongoDB.

## ✨ Features

- **Dashboard**: Quick glance at today's revenue, units sold, and top-selling categories.
- **Billing System**: A robust cart-based interface enabling dynamic additions, quantity tuning, dynamic tax calculations, and instant checkout.
- **PDF Invoices**: Real-time professional invoice generation featuring dynamic store details, timestamps, detailed breakdowns, and an embedded PDF downloader (powered by `jsPDF` and `jspdf-autotable`).
- **Products CRUD**: A sleek modal-based interface to manage everything on your menu.
- **Inventory Management**: Easy quick-click additions (+1, +5, +10, etc.) for instant stock updates mapped to live database entries.
- **Analytics View**: Dive deep into periodic (Today/Week/Month) business insights seamlessly backed by `chart.js`.
- **Admin Settings**: A dedicated configuration page to globally update Shop Name, Owner details, Address, GST configuration, and live Default Tax % tracking.

## 🛠 Tech Stack

- **Frontend**: Next.js 16, React, Tailwind CSS 4, Chart.js
- **Backend / API**: Next.js API Routes (`/api/products`, `/api/bills`, `/api/settings`)
- **Database**: MongoDB (managed seamlessly via Mongoose)

## 🚀 Getting Started

1. **Prerequisites**: Ensure you have Node.js and a MongoDB instance (local or MongoDB Atlas) running.
2. **Environment**: Create a `.env` file in the root directory mapping your database:
   ```env
   MONGODB_URI=mongodb://localhost:27017/scoopbill
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   # Installs Next.js dependencies, Mongoose, and jsPDF
   ```
4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` with your browser to experience the application. Data seeding is automatic; 10 demo products will automatically populate your database on the first boot.

## 📜 Project Architecture

```
scoopbill/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # DB controllers & REST API hooks
│   │   ├── analytics/          # Analytics charts
│   │   ├── billing/            # Core checkout & formatting
│   │   ├── inventory/          # Stock adjustment tools
│   │   ├── products/           # Menu CRUD tables
│   │   └── settings/           # App-wide global settings
│   ├── components/             # Reusable UI (Sidebar, Modals, Toast)
│   └── lib/                    # Mongoose Models (Bill, Product, Settings), DB driver
└── .env                        # Private credentials layer
```

---

_ScoopBill — crafted efficiently with clean boundaries between server functionality and high-quality UI design constraints._
