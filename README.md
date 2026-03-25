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

### Frontend

* React.js
* HTML, CSS, JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Tools

* Git & GitHub

---

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

* Built a full-stack healthcare system using MERN stack
* Implemented role-based access for secure operations
* Designed modular backend architecture (MVC pattern)
* Focused on real-world usability in public healthcare systems
