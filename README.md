

````markdown
# WorkPulse - Enterprise Attendance Management System


**WorkPulse** is a robust, full-stack Attendance Management System designed to streamline workforce tracking. Built with the **MERN Stack**, it features strictly enforced **Role-Based Access Control (RBAC)**, real-time data visualization, and automated payroll reporting.

---

## 🚀 Key Features

### 🛡️ Security & Authentication
- **JWT-Based Auth:** Stateless, secure authentication using JSON Web Tokens.
- **Role-Based Access Control (RBAC):** Distinct dashboards and route protection for **Employees** vs. **Managers**.
- **Secure Sessions:** Persistent login state management using Zustand.

### 👥 Employee Portal
- **One-Click Attendance:** Seamless Check-in/Check-out interface.
- **Real-Time Feedback:** Instant toast notifications for actions.
- **History Tracking:** Visual timeline of past attendance records.
- **Timezone Synchronization:** Custom server-side logic handles UTC vs. Local Time (IST) discrepancies to ensure accurate logging.

### 📊 Manager Dashboard
- **Interactive Analytics:** Real-time charts showing workforce trends using **Recharts**.
- **Data Filtering:** Instant search and filter capabilities for employee logs.
- **Payroll Export:** Generate and download attendance reports as **CSV files** instantly.
- **Status Monitoring:** Auto-calculation of "Late", "Half-Day", and "Absent" statuses.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Data Viz:** Recharts

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Cloud)
- **ODM:** Mongoose
- **Security:** Helmet, CORS, JWT

---

## ⚡ Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account (or local MongoDB)

### 2. Clone the Repository
```bash
git clone [https://github.com/Ganesh-parella/WorkPulse-Attendance-System.git](https://github.com/Ganesh-parella/WorkPulse-Attendance-System.git)
cd WorkPulse-Attendance-System
````

### 3\. Backend Setup

```bash
cd attendance-backend
npm install

# Create a .env file in attendance-backend/ and add your keys:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_super_secret_key
# PORT=5000

# Start the Server
npm run dev
```

### 4\. Frontend Setup

Open a new terminal in the root folder:

```bash
cd attendance-frontend
npm install

# Start the React App
npm run dev
```

Visit `http://localhost:5173` in your browser.

-----

## 📂 Project Structure

```bash
WorkPulse/
├── attendance-backend/     # Express API
│   ├── src/
│   │   ├── config/        # DB Connections
│   │   ├── controllers/   # Business Logic (MVC)
│   │   ├── middlewares/   # Auth & Role checks
│   │   ├── models/        # Mongoose Schemas
│   │   └── routes/        # API Endpoints
│   └── scripts/           # Seeding scripts
│
└── attendance-frontend/    # React Client
    ├── src/
    │   ├── components/    # Reusable UI (Sidebar, Loaders)
    │   ├── pages/         # Dashboard Views
    │   ├── services/      # Axios Config
    │   └── store/         # Zustand Store
```

## 👨‍💻 Author

**Ganesh Parella**

  - **GitHub:** [Ganesh-parella](https://www.google.com/search?q=https://github.com/Ganesh-parella)
  - **Project Type:** Internship Submission (Full Stack Development)

-----

*This project was built to demonstrate proficiency in Full Stack Architecture, API Design, and Modern UI Development.*

```
```
