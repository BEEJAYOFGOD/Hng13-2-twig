# Ticket Management App - Twig (PHP)

A modern, responsive ticket management web application built with Twig templating engine and vanilla JavaScript, featuring authentication, dashboard, and full CRUD operations for tickets.

## 🚀 Technologies Used

- **PHP** 7.4+ / 8.x
- **Twig** 3.x - Templating engine
- **Vanilla JavaScript** - For interactivity
- **Tailwind CSS** - For styling
- **LocalStorage API** - For authentication and data persistence





## 📋 Features

- **Landing Page** with wavy hero section and decorative elements
- **Authentication System** (Login/Signup) with form validation
- **Protected Routes** - Dashboard and ticket pages require authentication
- **Dashboard** with ticket statistics (Total, Open, In Progress, Closed)
- **Full CRUD Ticket Management**
  - Create new tickets
  - View all tickets
  - Edit existing tickets
  - Delete tickets with confirmation
- **Form Validation** with inline error messages
- **Toast Notifications** for success/error feedback
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Status-based Color Coding** (Green for open, Amber for in_progress, Gray for closed)

## 🎨 Design Specifications

- **Max Width**: 1440px centered container
- **Hero Section**: SVG wavy background
- **Decorative Elements**: Circular shapes and card-based layouts
- **Responsive Breakpoints**: Mobile (< 768px), Tablet (768px - 1024px), Desktop (> 1024px)
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support

## 🛠️ Setup Instructions

### Prerequisites
- PHP 7.4 or higher
- Composer
- A local web server (Apache, Nginx, or PHP built-in server)

### Installation

1. **Clone the repository**
```bash
   git clone <your-repo-url>
   cd ticket-app-twig
```

2. **Install Composer dependencies**
```bash
   composer install
```

3. **Run PHP built-in server**
```bash
   php -S localhost:8000 -t public
```

4. **Open in browser**
```
   http://localhost:8000
```

### Alternative: Using XAMPP/WAMP

1. Copy the project folder to `htdocs` (XAMPP) or `www` (WAMP)
2. Navigate to `http://localhost/ticket-app-twig/public`

## 🧪 Test Credentials

Use these credentials to test the application:

- **Email**: `test@example.com`
- **Password**: `password123`

Or create a new account via the signup page.

## 📁 Project Structure
```
ticket-app-twig/
├── public/
│   ├── assets/
│   │   ├── wave.svg
│   │   └── circles.svg
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── auth.js
│   │   ├── tickets.js
│   │   ├── validation.js
│   │   └── app.js
│   └── index.php
├── templates/
│   ├── layout.twig
│   ├── landing.twig
│   ├── auth/
│   │   ├── login.twig
│   │   └── signup.twig
│   ├── dashboard.twig
│   └── tickets/
│       ├── index.twig
│       └── form.twig
├── src/
│   └── (Helper classes/functions)
├── vendor/
├── composer.json
└── README.md
```

## 🔐 Authentication & Authorization

- Authentication uses **localStorage** with key: `ticketapp_session`
- JavaScript checks authentication on protected pages
- Unauthorized users redirect to `/auth/login`
- Logout clears session and redirects to landing page
- Session token format: JSON object with user info and timestamp

## 📝 Data Management

- **LocalStorage** for client-side data persistence
- JavaScript handles all CRUD operations
- Twig templates render static HTML
- Dynamic content loaded via JavaScript

## ✨ Page Templates

### Landing Page (`landing.twig`)
- Hero section with wavy SVG background
- Feature cards with hover effects
- Call-to-action buttons
- Responsive navigation

### Authentication (`auth/login.twig`, `auth/signup.twig`)
- Login and Signup forms
- Real-time JavaScript validation
- Error handling with toast notifications
- Password visibility toggle

### Dashboard (`dashboard.twig`)
- Statistics cards (Total, Open, In Progress, Closed tickets)
- Quick action buttons
- Logout functionality
- Navigation to ticket management

### Ticket Management (`tickets/index.twig`)
- Ticket list with status badges
- Create/Edit forms with validation
- Delete confirmation modal
- Status-based color coding
- Search and filter capabilities

## 🎯 Validation Rules

- **Title**: Required, min 3 characters
- **Status**: Required, must be one of: `open`, `in_progress`, `closed`
- **Description**: Optional, max 500 characters
- **Priority**: Optional, must be: `low`, `medium`, `high`

## 💻 JavaScript Modules

### `auth.js`
- Login/Signup logic
- Session management
- Route protection

### `tickets.js`
- CRUD operations for tickets
- Data fetching and rendering
- Modal handling

### `validation.js`
- Form validation functions
- Error message display
- Input sanitization

### `app.js`
- Main application initialization
- Toast notifications
- Global utilities

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Color contrast compliance (WCAG AA)
- Alt text for images

## 🐛 Known Issues

- None currently identified

## 📱 Responsive Behavior

- **Mobile (< 768px)**: Stacked layout, hamburger menu
- **Tablet (768px - 1024px)**: 2-column grid for tickets
- **Desktop (> 1024px)**: 3-column grid, full navigation

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📦 Dependencies
```json
{
  "require": {
    "twig/twig": "^3.0"
  }
}
```

## 📄 License

This project is part of the HNG Internship Stage 2 Frontend Task.

## 👤 Author

**Your Name**
- GitHub: [@yourusername]
- Email: your.email@example.com

## 🙏 Acknowledgments

- HNG Internship Program
- Task requirements and specifications
