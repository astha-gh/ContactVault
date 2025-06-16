# 📇 ContactVault

**ContactVault** is a full-stack contact management app allowing users to securely store, search, edit, and delete personal or professional contacts. Built for ease-of-use and security, it includes photo uploads, real-time updates, and responsive UI.

---

## 🚀 Live Demo

- 🌐 Frontend (Netlify): [https://contactvault202.netlify.app](https://contactvault202.netlify.app)
- 🔧 Backend (Railway): [https://my-contacts-backend-production.up.railway.app](https://my-contacts-backend-production.up.railway.app)

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Folder Structure](#folder-structure)
- [Author](#author)

---

## ✨ Features

- ✅ User authentication (JWT)  
- ✅ CRUD operations for contacts  
- ✅ Cloudinary image uploads  
- ✅ Responsive UI (mobile-first design)  
- ✅ Error handling and form validation  
- ✅ Search and filter contacts  
- ✅ REST API built with Express  

---

## 🧰 Tech Stack

### Frontend
- React
- React Router

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

### Other Tools & Libraries
- Cloudinary (image storage)
- Dotenv
- Postman
- jsonwebtoken
- cors

---

## ⚙️ Installation

### 🔄 Clone the Repository

```bash
git clone https://github.com/astha-gh/ContactVault
cd ContactVault
🛠️ Backend Setup
bash
Copy
Edit
cd mycontacts-backend
npm install
npm run dev
💻 Frontend Setup
bash
Copy
Edit
cd mycontacts-frontend
npm install
npm start

---

## 🧪 Usage

Register or log in to start managing your contact list.
You can upload contact photos, update information, or delete entries.

---

## 📡 API Reference

# 📁 Contact Routes /api/contact

| Method | Route  | Description          |
| ------ | ------ | -------------------- |
| GET    | `/`    | Get all contacts     |
| POST   | `/`    | Create new contact   |
| GET    | `/:id` | Get contact by ID    |
| PUT    | `/:id` | Update contact by ID |
| DELETE | `/:id` | Delete contact by ID |


# 👤 User Routes /api/users

| Method | Route       | Description             |
| ------ | ----------- | ----------------------- |
| POST   | `/register` | Register a new user     |
| POST   | `/login`    | Log in an existing user |
| GET    | `/current`  | Get current user info   |


## 🗂️ Folder Structure

# 📦 Backend – mycontacts-backend

mycontacts-backend/
├── config/
│   └── dbConnection.js
├── controller/
│   ├── contactController.js
│   └── userController.js
├── middleware/
│   ├── errorHandler.js
│   └── validateTokenHandler.js
├── models/
│   ├── contactModel.js
│   └── userModel.js
├── routes/
│   ├── contactRoutes.js
│   └── userRoutes.js
├── .env
├── .gitignore
├── constants.js
├── package.json
└── server.js

# 🌐 Frontend – mycontacts-frontend

mycontacts-frontend/
├── public/
├── src/
│   ├── Pages/
│   │   ├── Dashboard.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Navbar.js
│   │   └── Signup.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .env
├── .gitignore
├── package.json
└── README.md

# Astha Devadiga
🔗 [GitHub Profile](https://github.com/astha-gh)  
🔗 [LinkedIn Profile](https://www.linkedin.com/in/astha-devadiga-327a68286/)
