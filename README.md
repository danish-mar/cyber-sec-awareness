# 🐅 CyberSafe India - Public Utility Portal

[![AOS](https://img.shields.io/badge/Animations-AOS-orange?style=flat-square)](https://michalsnik.github.io/aos/)
[![Chart.js](https://img.shields.io/badge/Analytics-Chart.js-red?style=flat-square)](https://www.chartjs.org/)
[![Stack](https://img.shields.io/badge/Stack-MEN%20(Mongo%2C%20Express%2C%20Node)-green?style=flat-square)](https://expressjs.com/)

**CyberSafe India** is a dedicated public utility portal designed for high-intensity cyber security awareness, focusing on the protection and education of women and children across the nation. The application features a **"Sharp Material UI"** aesthetic, inspired by the Indian National Flag, combining premium design with robust tactical monitoring tools.

---

## 🏛️ Strategic Features

### 📡 National Signal Hub
- **Incident Reporting**: A secure, streamlined interface for reporting cyber incidents. Supports both **Anonymous Signals** and logged-in user reports.
- **Multilingual Support**: Instant toggle between **English** and **Hindi**, ensuring accessibility for every citizen.
- **Dynamic Awareness Modules**: Dedicated sections for Women's Safety, Child Safety, and Official Intelligence Resources.

### 🛡️ National Admin Matrix 2.0
- **Intelligence Analytics**: Integrated **Chart.js** dashboard visualizing:
  - **7-Day Signal Trend**: Monitoring the intensity of reported incidents over time.
  - **Mandate Distribution**: Real-time breakdown of investigation statuses (Pending, Investigating, Resolved).
- **Master Control Table**: Comprehensive view of all national signals with "Intervene" capabilities.
- **Intervention Modal**: High-intensity inspection unit for analyzing incident details and updating operational mandates.

### 🔐 Multi-Role Security
- **Role-Based Access Control (RBAC)**: Distinct paths for regular citizens (`user`) and safety officials (`admin`).
- **Cryptographic Protection**: Secure password hashing using **bcrypt** and session-based authentication.
- **Seed-Ready Intelligence**: Dedicated CLI tool (`seedAdmin.js`) for initializing administrative accounts.

---

## 🏗️ Technical Stack

- **Backend**: Node.js & Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend Engine**: EJS (Embedded JavaScript)
- **Styling**: Vanilla CSS + Tailwind CSS (Tactical CDN usage)
- **Visuals**: Chart.js for data intelligence
- **Animations**: AOS (Animate On Scroll) for premium feel
- **Icons**: FontAwesome 6 (Strategic implementation)

---

## 📂 Project Structure

```text
.
├── app.js               # Tactical Core (Server Entry)
├── models/              # Intelligence Blueprints (Mongoose Data Models)
│   ├── User.js          # Personnel Management
│   └── Report.js        # Signal Management
├── routes/              # Operational Vectors
│   ├── index.js         # Core Intelligence & Admin Routes
│   └── auth.js          # Security Clearance Routes
├── views/               # Visual Interface
│   ├── admin.ejs        # National Admin Matrix 2.0
│   ├── auth.ejs         # Security Checkpoint
│   ├── dashboard.ejs    # User Intelligence Hub
│   ├── index.ejs        # National Portal Gateway
│   └── partials/        # Tactical Components (Navbar/Footer)
├── scripts/             # Strategic Utilities
│   └── seedAdmin.js     # Admin Initialization Script
└── public/              # Global Assets
```

---

## ⚙️ Deployment Protocol

### 1. Prerequisites
- **Node.js**: v14+ recommended
- **MongoDB**: Local instance or MongoDB Atlas URI

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/cybersec
SESSION_SECRET=tiranga-secret-key-high-alert
```

### 3. Tactical Setup
```bash
# Install dependencies
npm install

# Seed the first Administrative Account
node scripts/seedAdmin.js "National Admin" "9999999999" "admin123"

# Launch Protocol
npm start
```

---

## 🐯 Patriotic Aesthetic (Sharp Material UI)
The interface employs a palette inspired by the **Tiranga**:
- 🟠 **Saffron (#FF9933)**: For strength and high-alert actions.
- ⚪ **White (#FFFFFF)**: For clarity, peace, and clean data surfaces.
- 🟢 **India Green (#138808)**: For successful growth and "Resolved" status.
- 🔵 **Navy Blue (#000080)**: Integrated via charts representing the Ashoka Chakra's precision.

---

## ⚖️ License
This project is an open-access public utility under the **ISC License**.

*Jai Hind.* 🇮🇳
