# 🎓 LearnLingo - Language Tutors Platform

## 📖 Project Description

This project is the frontend application for **LearnLingo**, a platform designed to connect language learners with professional tutors. The application enables users to browse a diverse catalog of teachers, filter them by language, proficiency level, and price, view detailed teacher profiles, manage a list of favorites, and book trial lessons.

It is built with modern web technologies focusing on performance, user experience, and clean code architecture using **Next.js**, **TypeScript**, and **Firebase**.

## 🚀 WebSite

Check out the live application on Vercel: **🔗 [Insert Your Live Demo Link Here]**

## ✨ Key Features

### 🏠 Home Page (`/`)
* **Hero Section:** Engaging introduction with a call-to-action button leading to the tutors catalog.
* **Stats:** Quick overview of the platform's reach (tutors count, reviews, etc.).

### 👩‍🏫 Teachers Page (`/teachers`)
* **Catalog Display:** Responsive list of available tutors fetched from Firebase Realtime Database.
* **Advanced Filtering:**
    * **Language:** Filter by specific language (English, French, German, etc.).
    * **Level:** Filter by proficiency level (A1 - C2).
    * **Price:** Filter by hourly rate.
* **Pagination:** "Load More" functionality to efficiently display large lists of data.
* **Interactive Cards:** Detailed teacher cards showing avatar, rating, price, and lesson details.

### ❤️ Favorites (`/favorites`)
* **Persistence:** A dedicated page displaying the user's favorite teachers.
* **Cloud Sync:** Favorites are stored in **Firebase Realtime Database**, meaning they are linked to the user's account and persist across different devices and sessions.
* **Access Control:** Protected route accessible only to authenticated users.

### 🔐 Authentication
* **Modals:** Seamless Login and Registration experience via pop-up modals.
* **Validation:** Robust form validation using **React Hook Form** and **Yup**.
* **Firebase Auth:** Secure user creation and sign-in handling.

### 📝 Booking System
* **Trial Lesson:** Users can book a trial lesson with any teacher.
* **Custom Form:** A styled modal form allowing users to select their learning goals (Career, Travel, Exams, etc.).

## 🛠 Technologies Used

The project is built with a robust and scalable tech stack:

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Backend:** [Firebase](https://firebase.google.com/) (Authentication & Realtime Database)
* **State Management:** React Context API (`AuthContext` for global session state)
* **Forms:** React Hook Form + Yup resolver
* **Notifications:** React Hot Toast
* **Icons:** SVG Sprites

## 🔌 API & Database

The application connects to **Firebase**.

* **Authentication:** Handles user sign-up, sign-in, and profile management (display name).
* **Realtime Database:**
    * `/teachers`: Stores the main catalog of tutors.
    * `/users/{userId}/favorites`: Stores specific favorite teachers for each user.

## 📦 State Management

The application uses **React Context API** for global state management:
* **AuthContext:** Manages the current user session, loading states, and provides `logOut` functionality globally.
* **Local State:** Used for managing filters, modals visibility, and form inputs.

## 💻 Installation & Getting Started

Follow these steps to run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/learnlingo.git](https://github.com/YourUsername/learnlingo.git)
    cd learnlingo
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add your Firebase configuration:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
    NEXT
