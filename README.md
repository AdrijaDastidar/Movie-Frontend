---

### **🎬 All-in-One Movie Website - Frontend**
---
backend - https://github.com/AdrijaDastidar/Movie-Backend

## 📜 Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [Contact](#contact)

---

## 📝 Introduction
The **All-in-One Movie Website** is a comprehensive platform that combines movie recommendations, ticket booking, and streaming in a single, user-friendly application. Built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, this project leverages AI and machine learning algorithms to offer personalized movie recommendations. The frontend of this platform is designed to deliver a seamless and responsive user experience, with a focus on intuitive navigation and dynamic content display.

---

## ✨ Features
- **Personalized Movie Recommendations**: Uses AI/ML algorithms for content-based and collaborative filtering.
- **Movie Booking System**: Users can select seats, book tickets, and complete payments seamlessly.
- **Payment Gateway**: Used RazorPay payment gateway API to complete payments seamlessly.
- **User Authentication**: Secure login and registration with JWT-based authentication.
- **Admin Panel**: Manage movie content, view user bookings, and monitor stats.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## 🛠️ Tech Stack
- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **State Management**: React Redux
- **Authentication**: JWT (JSON Web Tokens)
- **Backend API**: Node.js & Express.js (separate repository)
- **Database**: MongoDB and Neo4j (used via API)

---

## 🛠️ Installation

### Prerequisites
- Node.js (>= 14.x)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/all-in-one-movie-website.git
cd all-in-one-movie-website-frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Setup Environment Variables
Create a `.env` file in the root directory and add the following:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_JWT_SECRET=your-jwt-secret
```

### Step 4: Run the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

---

## 🚀 Usage
- **Home Page**: Browse top movie recommendations tailored to your preferences.
- **Book Tickets**: Navigate to the booking page, select a movie, choose your seats, and complete the payment process.
- **Stream Movies**: Access the streaming page for movies you have booked.
- **Admin Dashboard**: Log in as an admin to manage movies, bookings, and user data.

---

## 📷 Screenshots
1. **Home Page with Recommendations**  
   ![Home Page](./public/assets/screenshots/home.png)

2. **Movie Booking Interface**  
   ![Booking Page](./public/assets/screenshots/booking.png)

3. **Streaming Page**  
   ![Streaming Page](./public/assets/screenshots/streaming.png)

4. **Admin Dashboard**  
   ![Admin Panel](./public/assets/screenshots/admin.png)

---

## 🔮 Future Enhancements
- **Advanced Recommendations**: Integrate deep learning models for more accurate suggestions.
- **Social Features**: Allow users to share movie reviews and ratings.
- **Third-Party Integrations**: Expand streaming options with external services like Netflix or Amazon Prime.
- **Enhanced Security**: Implement two-factor authentication (2FA) for user accounts.
- **Mobile App**: Develop a React Native version for iOS and Android.

---

## 🤝 Contributing
We welcome contributions from the community! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

---

## 📧 Contact
For any questions or suggestions, feel free to reach out:
- **Adrija Dastidar** - adrijadastidar@example.com
- **GitHub**: [AdrijaDastidar](https://github.com/AdrijaDastidar)

---

