# 🏥 MediTrack – Public Dispensary Healthcare Management System

A full-stack healthcare management system designed to digitize and streamline operations in public dispensaries. The platform enables efficient patient record management, real-time medicine inventory tracking, and secure role-based access control.

---

## 📌 Key Features

### 👩‍⚕️ Patient Management

* Register and manage patient profiles
* Maintain detailed medical records
* Track patient visit history
* Search and update patient information

---

### 💊 Medicine Inventory Management

* Add, update, and monitor medicine stock
* Track medicine usage and availability
* Low-stock tracking to prevent shortages
* (Future-ready) Expiry date monitoring

---

### 👨‍⚕️ Role-Based Access Control (RBAC)

Secure access based on user roles:

* **Admin**

  * Manage users and system activity

* **Doctor**

  * Access patient records
  * Prescribe medicines

* **Pharmacist**

  * Manage inventory
  * Dispense medicines

---

### 🔐 Security Features

* Role-based authentication
* Protected API routes
* Secure handling of patient data
* Input validation and error handling

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React.js, HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Tools | Git, GitHub, Postman |

## 🏗️ System Architecture

User (Admin / Doctor / Pharmacist)
    ⬇
Frontend (React)
    ⬇
Backend (Node.js + Express)
    ⬇
Database (MongoDB)

---

## 📂 Project Structure

```
MediTrack-Public-Dispensary-System
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
├── frontendDispensary
│   ├── components
│   ├── pages
│   ├── services
│   └── App.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/aditiisinghh/MediTrack-Public-Dispensary-System.git
cd MediTrack-Public-Dispensary-System
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
npm start
```

Runs on:
👉 http://localhost:5000

---

### 3️⃣ Frontend Setup

```
cd frontendDispensary
npm install
npm start
```

Runs on:
👉 http://localhost:3000

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /login | User Login |
| GET | /patients | Fetch all patients |
| POST | /patients | Add new patient |
| GET | /medicines | Fetch medicine inventory |
| PUT | /medicines/:id | Update medicine stock |

## 🚀 Core Functionalities

✔ Patient registration and medical record management

✔ Real-time medicine inventory tracking

✔ Secure authentication and authorization

✔ RESTful API integration

✔ Responsive frontend UI using React

✔ CRUD operations with MongoDB

## 🧩 Challenges Faced

- Implementing role-based authentication
- Managing medicine inventory efficiently
- Securing patient data
- Connecting frontend with backend APIs


## 📊 Future Enhancements

* 📅 Appointment scheduling system
* 💊 Medicine expiry alerts
* 📈 Advanced analytics dashboard
* 🔔 SMS/email notifications
* 🏥 Integration with digital health records

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repository and submit a pull request.

---


## 👩‍💻 Author

**Aditi Singh**

🔗 GitHub: https://github.com/aditiiisinghh

---
## 💡 Highlights

✔ Developed a full-stack MERN healthcare management platform

✔ Implemented JWT-based authentication and role-based authorization

✔ Built scalable REST APIs with Express.js and MongoDB

✔ Designed modular MVC architecture for clean backend structure

✔ Optimized dispensary workflow through digital patient and inventory management

✔ Improved maintainability using reusable React components
