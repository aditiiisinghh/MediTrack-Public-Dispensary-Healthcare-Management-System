🏥 MediTrack – Public Dispensary Healthcare Management System

A full-stack healthcare management system for public dispensaries that enables secure medicine inventory tracking, patient data management, and role-based access control.

The system helps dispensaries manage patient records, monitor medicine stock, and streamline daily healthcare operations efficiently.

📌 Features
👩‍⚕️ Patient Management

Register new patients

Store and manage patient medical records

Track patient visit history

Search and update patient details

💊 Medicine Inventory Management

Add and update medicine stock

Monitor available medicines in the dispensary

Track medicine usage and availability

Prevent stock shortages

👨‍⚕️ Role-Based Access Control

Different roles have different permissions:

Admin

Manage system users

Monitor overall system activity

Doctor

Access patient records

Prescribe medicines

Pharmacist

Manage medicine inventory

Dispense medicines to patients

🛠️ Tech Stack
Frontend

React.js

HTML

CSS

JavaScript

Backend

Node.js

Express.js

Database

MongoDB

Version Control

Git

GitHub

🏗️ Project Structure
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
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/aditiisinghh/MediTrack-Public-Dispensary-System.git
2️⃣ Backend Setup
cd backend
npm install
npm start

Backend runs on:

http://localhost:5000
3️⃣ Frontend Setup
cd frontendDispensary
npm install
npm start

Frontend runs on:

http://localhost:3000
📊 System Architecture
User (Doctor / Admin / Pharmacist)
           │
           ▼
      Frontend (React)
           │
           ▼
     Backend (Node + Express)
           │
           ▼
        MongoDB
🔐 Security Features

Role-based authentication

Secure API communication

Controlled access to patient data

🚀 Future Improvements

Appointment scheduling system

Medicine expiry alerts

Advanced analytics dashboard

SMS notifications for patients

Integration with digital health records

🤝 Contributing

Contributions are welcome!
If you'd like to improve this project, feel free to fork the repository and submit a pull request.

📄 License

This project is licensed under the MIT License.

👩‍💻 Author

Aditi Singh

GitHub:
https://github.com/aditiisinghh
