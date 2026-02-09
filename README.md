# Senator Oluremi Tinubu Dream Centre

The **Senator Oluremi Tinubu Dream Centre** is a state-of-the-art inspiration and mentorship hub located at the Obafemi Awolowo University (OAU), Ile-Ife. Launched by Nigeria’s First Lady, it serves as a sanctuary for academic excellence, digital innovation, and character building.

---

## 🏗️ About the Project

The Dream Centre is designed to nurture the next generation of Nigerian leaders through:
- **Inspiration**: A tranquil environment for reflection and visioning.
- **Mentorship**: Access to role models and academic guidance.
- **Innovation**: High-tech facilities equipped with AI tools and digital resources.

## 🚀 Technology Stack

This website is built with a focus on premium aesthetics, performance, and accessibility:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: Vanilla CSS with a custom Design System
- **Components**: Functional React components with a focus on Semantic HTML
- **Animations**: CSS transitions and scroll-triggered effects
- **Optimization**: Next/Image for high-performance visual delivery
- **Backend**: MongoDB with Mongoose
- **Security**: JWT-based Authentication & Bcrypt Hashing

## 📂 Project Structure

```bash
src/
├── app/            # Next.js App Router (Layouts, Pages, Globals, API Routes)
├── components/     # UI Library & Section-specific components
├── models/         # Mongoose Database Schemas
├── lib/            # Utilities (Auth, ID Generation, DB Connection)
├── content/        # JSON-based content management
├── hooks/          # Custom React hooks
└── types/          # TypeScript definitions
```

## 🛠️ Key Features

- **DreamCenter ID System**: Automated, sequential identity issuance (`DCO-SWE24-001`).
- **Institutional Authentication**: Mandatory OAU student/staff email verification.
- **Role-Based Access**: Specialized dashboards for Users and Administrators.
- **Dynamic Content**: Managed via JSON files in `src/content/`.

## 👨‍💻 Development & Setup

### 1. Environment Variables
Create a `.env.local` file in the root:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
```

### 2. Getting Started
```bash
npm install
npm run dev
```

### 3. Database Seeding
The system requires initial data for **Faculties** and **Departments** to be populated in MongoDB.
- All new registrations default to `PENDING` status.
- Admin must manually approve users to trigger `DreamCenter ID` generation.
- To create the first Super Admin, manually set `role: "ADMIN"` in the database for a registered user.

---

*“A journey of a thousand miles begins with a single step.”* — Dream Centre Stairwell Mural
