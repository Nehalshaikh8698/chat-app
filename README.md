# AI Powered Real-Time Messaging Platform

A modern **full-stack MERN real-time chat application** built with scalability, modular architecture, and clean code principles. ChatSphere provides instant messaging, image sharing, online presence, typing indicators, and a responsive user experience. The project is designed as a **portfolio-quality application** to demonstrate full-stack development skills and modern software architecture.

---

## 🚀 Features

### 🔐 Authentication

* User Signup & Login
* JWT Authentication
* Secure Cookie-Based Sessions
* Protected Routes
* Logout Functionality

### 👤 User Profile

* Update Profile Picture
* Cloudinary Image Upload
* User Profile Management

### 💬 Real-Time Messaging

* One-to-One Chat
* Instant Message Delivery
* Image Sharing
* Auto Scroll to Latest Message
* Responsive Chat Interface

### ⚡ Real-Time Features

* Online/Offline User Status
* Typing Indicator
* Last Seen Status
* Socket.IO Powered Communication

### 🎨 Customization

* Light & Dark Theme Support
* DaisyUI Theme Switcher

---

# 🧠 Upcoming Features

* ✅ Message Status (Sent, Delivered, Seen)
* 💬 Reply to Messages
* ✏️ Edit Messages
* 🗑 Delete for Me / Delete for Everyone
* 😀 Emoji Reactions
* 📌 Pin Messages
* 🔍 Search Messages
* 🖼 Shared Media Gallery
* 🎤 Voice Notes
* 🖼 Chat Wallpapers
* 📂 Archive Chats
* 🚫 Block Users

---

# 🤖 AI Features (Planned)

Google Gemini API integration will provide AI-assisted messaging without sending messages automatically.

Planned AI capabilities include:

* Smart Reply Suggestions
* Generate Reply
* Grammar Correction
* Rewrite Tone
* Translate Messages
* Conversation Summary
* Ask AI Assistant

> **Note:** AI only generates suggestions. Users always have complete control over sending messages.

---

# 🛠 Tech Stack

## Frontend

* React.js (Vite)
* Tailwind CSS
* DaisyUI
* Zustand
* Axios
* React Router DOM
* Socket.IO Client
* Lucide React
* React Hot Toast

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT Authentication
* Cookie Parser
* bcryptjs
* Cloudinary

---

# 📁 Project Structure

```
ChatSphere
│
├── backend
│   └── src
│       ├── controllers
│       ├── middleware
│       ├── models
│       ├── routes
│       ├── validators
│       ├── socket
│       └── lib
│
├── frontend
│   └── src
│       ├── components
│       ├── pages
│       ├── socket
│       └── store
│
└── README.md
```

---

# 🏗 Architecture

The application follows a modular and scalable architecture.

### Backend

* REST APIs using Express.js
* JWT-based authentication
* MongoDB with Mongoose
* Cloudinary for image storage
* Modular Socket.IO event handlers
* Validation layer for request validation
* Separation of controllers, models, routes, and business logic

### Frontend

* React with Vite
* Zustand for state management
* Responsive UI using Tailwind CSS & DaisyUI
* Axios for API communication
* Socket.IO Client for real-time updates
* Component-based architecture

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/your-username/ChatSphere.git
cd ChatSphere
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5001

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 📸 Screenshots

Add screenshots of the following pages:

* Login Page
  <img width="1902" height="1024" alt="image" src="https://github.com/user-attachments/assets/b8840741-edcd-4219-84c4-51670747b810" />

* Signup Page
  <img width="1897" height="1027" alt="image" src="https://github.com/user-attachments/assets/e7562bfb-bab8-4b0a-8f93-113a69d8520c" />

* Home Page
* Chat Window
  <img width="1487" height="1027" alt="image" src="https://github.com/user-attachments/assets/746141e3-103b-4f20-93a2-3db3346e8fc3" />

* Profile Page
  <img width="1536" height="962" alt="image" src="https://github.com/user-attachments/assets/654c8f63-8b77-4708-9cf9-a179ae1ba95a" />

* Theme Switcher
  <img width="1446" height="1031" alt="image" src="https://github.com/user-attachments/assets/18a6b62f-7d1b-40cc-98b6-8486bdd65356" />


# 🎯 Learning Highlights

This project demonstrates:

* Full-Stack MERN Development
* REST API Design
* JWT Authentication
* Real-Time Communication with Socket.IO
* Secure Image Upload using Cloudinary
* State Management with Zustand
* Responsive UI Development
* Modular Backend Architecture
* Clean Folder Structure
* Scalable Software Design
* Modern JavaScript (ES6+)

---

# 🌟 Future Improvements

* Group Chats
* Video & Audio Calling
* Push Notifications
* Message Encryption
* File Sharing
* AI Chat Assistant
* Multi-Device Synchronization
* Progressive Web App (PWA)

---

# 🤝 Contributing

Contributions, suggestions, and feature requests are welcome.

Feel free to fork the repository, open issues, and submit pull requests.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Nehal Shaikh**

Full Stack MERN Developer | AI & Data Science Student

If you found this project helpful, consider giving it a ⭐ on GitHub!
