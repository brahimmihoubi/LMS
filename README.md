# 📚 LibraSync - Modern Library Management System

![LibraSync Banner](https://images.unsplash.com/photo-1507842217121-9e96e4745dfe?q=80&w=2070&auto=format&fit=crop)

**LibraSync** is a comprehensive, modern, and responsive web application designed to streamline library operations. Built with **React** and **TypeScript**, it offers a premium user experience with robust features for managing books, members, loans, and finances.

---

## ✨ Key Features

### 📊 Dashboard

- **Real-time Overview**: Instant view of total books, active members, active loans, and overdue items.
- **Analytics**: Visual bar charts showing loan activity trends over the last 7 months.
- **Recent Activity**: Live feed of recent borrowings and returns.
- **Premium UI**: Stat cards with trend indicators and color-coded statuses.

### 📚 Book Inventory

- **Catalog Management**: View, search, and filter the complete library catalog.
- **Stock Tracking**: Automatic tracking of available copies vs. total quantity.
- **Details**: Rich book metadata including ISBN, Category, and Author.

### 👥 Member Management

- **Directory**: searchable list of all registered library members.
- **Status Control**: Suspend or Activate member privileges with a single click.
- **Deletion**: Secure removal of members with confirmation modals.
- **User Profiles**: Track join dates, contact info, and current status.

### 🔄 Loan System

- **Issue Loans**: Easy flow to assign books to members.
- **Smart Returns**: Automatic calculation of overdue fines ($0.50/day default).
- **Status Tracking**: Visual indicators for Active, Returned, and Overdue loans.

### 📈 Reports & Analytics

- **Visual Charts**: Interactive Line and Pie charts powered by `recharts`.
- **Financial Tracking**: Monitor fines collected and inventory value.
- **PDF Export**: One-click export of the entire analytics report to a high-quality PDF.

### ⚙️ Settings & Customization

- **Theme Support**: Fully functional **Dark Mode** 🌙 with persistent preferences.
- **Localization**: Multi-language support (**English, French, Arabic**) with RTL layout support for Arabic.
- **Preferences**: Configure default fine amounts and library details.

### 👤 User Profile

- **Personalization**: Update name, email, and bio.
- **Avatar Upload**: Upload and preview custom profile pictures.
- **Persistence**: All user changes are saved locally.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with detailed configuration for colors, animations, and dark mode)
- **Icons**: Lucide React
- **Charts**: Recharts
- **PDF Generation**: html2canvas + jsPDF
- **Build Tool**: Vite

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/librasync-lms.git
   cd librasync-lms
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5173` to view the app.

---

## ⚙️ Configuration & Architecture

### Persistence (Local Storage)

LibraSync uses the browser's `localStorage` to simulate a backend database for:

- User Profile Data
- Theme Preferences (Dark/Light)
- Language Settings

_Note: For a production deployment, `services/store.ts` should be updated to connect to a real REST or GraphQL API._

### Dark Mode

Dark mode is implemented using the `class` strategy in Tailwind.

- **Toggle**: Toggles the `dark` class on the `<html>` element.
- **Styles**: Components utilize `dark:bg-slate-900`, `dark:text-slate-200`, etc., to provide a cohesive high-contrast dark theme.

### Language & RTL

Language selection updates the `dir` attribute of the document:

- **Arabic**: Sets `dir="rtl"` for full Right-to-Left layout mirroring.
- **English/French**: Sets `dir="ltr"`.

---

## 📂 Project Structure

```
librasync-lms/
├── src/
│   ├── components/       # Reusable UI components (Cards, Buttons, Modals)
│   ├── services/         # Data services (Auth, User, Book, Member logic)
│   ├── views/            # Main Page Views (Dashboard, Members, Reports...)
│   ├── types.ts          # TypeScript interfaces
│   ├── App.tsx           # Main Router & Layout wrapper
│   └── index.css         # Global styles & Tailwind directives
│
├── public/               # Static assets
└── tailwind.config.js    # Tailwind configuration
```

---

## 📄 License

This project is open-source and available for educational and personal use.

---

