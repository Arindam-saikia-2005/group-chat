# Realtime Chat Application

A full-stack realtime chat application built with Socket.io, React, TypeScript, Node.js, Express, MongoDB, Tailwind CSS, and Cloudinary.
This application supports realtime messaging, group chats, profile uploads, and authentication.

---

## 🚀 Features

* User Authentication (JWT)
* Realtime Messaging using Socket.io
* Create Groups
* Add/Remove Members in Groups
* Group Admin Controls
* Profile Picture Upload (Cloudinary)
* Group Image Upload
* Search Groups
* Last Message Preview
* Online/Offline Status
* Responsive UI
* Skeleton Loaders
* Logout/Login System

---

## 🛠️ Tech Stack

### Frontend

* React.js
* TypeScript
* Tailwind CSS
* Axios
* React Router
* Socket.io Client
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.io
* JWT Authentication
* Cloudinary (Image Upload)
* Multer

---

## 📁 Project Structure

```
project/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── socket/
│   ├── uploads/
│   ├── .env
│   └── server.ts
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── socket/
│   │   └── App.tsx
│   ├── .env
│   └── vite.config.ts
│
├── README.md
└── .gitignore
```

---

## ⚙️ Environment Variables

### Backend `.env`

```
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:8000
```

---

## ▶️ Run Locally

### 1. Clone the repository

```
git clone https://github.com/yourusername/chat-app.git
```

### 2. Install Backend Dependencies

```
cd backend
npm install
npm run dev
```

### 3. Install Frontend Dependencies

```
cd frontend
npm install
npm run dev
```

---

## 🔌 Socket Events

| Event           | Description       |
| --------------- | ----------------- |
| join_group      | Join a chat group |
| send_message    | Send message      |
| receive_message | Receive message   |
| typing          | Typing indicator  |
| stop_typing     | Stop typing       |
| online_users    | Online users list |

---

## 📸 Screens (Optional)

You can add screenshots here later.

```
Login Page
Chat Window
Create Group Modal
Profile Upload
```

---

## 🔐 Authentication Flow

1. User registers
2. User logs in
3. Server returns JWT token
4. Token stored in localStorage
5. Token sent in Authorization header
6. Protected routes verified using middleware

---

## 🧠 Future Improvements

* Message Seen Status
* Typing Indicator
* Voice Messages
* File Sharing
* Emoji Support
* Video Calls (WebRTC)
* Message Reactions
* Delete Messages
* Edit Messages

---

## 👨‍💻 Author

**Arindam Saikia**

---

## 📄 License

This project is licensed under the MIT License.
 
