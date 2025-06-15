# Malezi Child Healthcare Dashboard

Malezi is a modern child healthcare management dashboard built with Next.js and TypeScript, designed for both parents and medical staff. It leverages Firebase for authentication and Firestore for secure, real-time data storage. The app provides role-based dashboards, allowing users to add, view, and manage children, medical records, vaccinations, and growth tracking data.

---

## Features

- **Authentication**: Email/password and Google sign-in via Firebase Auth.
- **Role-based Access**: Users register as either `parent` or `medical_staff`. Parents see only their data; staff see all.
- **Firestore Integration**: All data (children, records, vaccinations, growth) is stored and filtered by user role and UID.
- **Live Data Tables**: Each dashboard page displays real-time tables of user-specific data.
- **Forms with Validation**: Add children, medical records, vaccinations, and growth entries with instant feedback.
- **Toast Notifications**: Success and error messages via [sonner](https://sonner.emilkowal.ski/).
- **Modern UI**: Built with Tailwind CSS, dark mode support, and reusable UI components.
- **Accessibility**: Designed for usability and accessibility.

---

## Tech Stack

- [Next.js (App Router, TypeScript)](https://nextjs.org/)
- [Firebase Auth & Firestore](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Sonner (toasts)](https://sonner.emilkowal.ski/)
- [React Icons/Lucide](https://lucide.dev/)

---

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Malezi
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or yarn install
   ```
3. **Configure Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Auth (Email/Password, Google) and Firestore.
   - Copy your Firebase config to `src/lib/firebase.ts`.
   ```ts
   // Example (do NOT commit secrets)
   export const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   # or yarn dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Usage

- **Register** as a parent or medical staff.
- **Add and manage** children, medical records, vaccinations, and growth data from the dashboard.
- **View live tables** of your data (parents: only your children/records; staff: all data).
- **Get instant feedback** with toast notifications on all actions.

---

## Contributing

Pull requests and suggestions are welcome! Please open an issue first to discuss any major changes.

---

## License

[MIT](LICENSE)
