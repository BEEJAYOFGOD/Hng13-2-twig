# Twig Ticket Management Application

A robust ticket management web application built with PHP and Twig templating engine, featuring a modern UI, secure authentication, and full CRUD operations for ticket management.

**🌐 Live Demo**: [Your Railway App URL]

---

## 🚀 Features

- **Landing Page**: Welcoming hero section with wavy SVG background and decorative elements
- **Authentication System**: Secure login and signup with session-based authentication
- **Dashboard**: Overview of ticket statistics (total, open, resolved tickets)
- **Ticket Management**: Complete CRUD operations with real-time validation
- **Responsive Design**: Fully responsive layout adapting to mobile, tablet, and desktop screens
- **Consistent UI**: Max-width 1440px centered layout with card-based design system

## 🛠️ Technologies Used

### Backend
- **PHP** (7.4+)
- **Twig** (3.x) - Templating engine
- **Composer** - Dependency management

### Frontend
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - Form validation and interactivity
- **SVG** - Decorative elements and wavy backgrounds

### Development Tools
- **Browser-sync** - Live reload during development
- **npm** - Frontend package management
- **WAMP/XAMPP** - Local development server

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- PHP 7.4 or higher
- Composer
- Node.js and npm
- Apache server (WAMP, XAMPP, or MAMP)

## 🔧 Installation & Setup

### Local Development

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd twig-ticket-app
```

#### 2. Install PHP Dependencies
```bash
composer install
```

#### 3. Install Frontend Dependencies
```bash
npm install
```

#### 4. Build Tailwind CSS
```bash
npm run build
```
Or for development with watch mode:
```bash
npm run dev
```

#### 5. Configure Local Web Server

**For WAMP/XAMPP:**
- Place the project in your web directory
- Access via: `http://localhost/twig-ticket-app`

**For PHP Built-in Server:**
```bash
php -S localhost:8000 -t public
```

#### 6. Start Development Server (Optional)
```bash
npm run watch
```
This starts Browser-sync for live reload during development.

### 🚂 Railway Deployment

This application is deployed on Railway. The live version is accessible at:
**[Your Railway App URL]**

#### Deploy Your Own Instance

1. **Fork/Clone this repository**

2. **Create a new project on Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"

3. **Configure Build Settings**
   - Railway will auto-detect PHP and use the `Procfile`
   - Build Command: `composer install && npm install && npm run build`
   - Start Command: Uses `Procfile` configuration

4. **Environment Variables** (Optional)
   - No environment variables required for basic setup
   - Add custom configurations as needed

5. **Deploy**
   - Railway will automatically deploy on push to main branch
   - Monitor build logs for any issues

## 🎯 Usage

### Test Credentials
Use these credentials to test the application:

**Default User:**
- Email: `demo@example.com`
- Password: `password123`

**Alternative User:**
- Email: `test@ticket.com`
- Password: `test1234`

### Navigation Flow
1. **Landing Page** (`/`) - Introduction and call-to-action buttons
2. **Login** (`/auth/login`) - Authenticate with credentials
3. **Signup** (`/auth/signup`) - Create new account
4. **Dashboard** (`/dashboard`) - View ticket statistics
5. **Tickets** (`/tickets`) - Manage tickets (CRUD operations)

## 📁 Project Structure

```
twig-ticket-app/
├── public/              # Web-accessible files
│   ├── css/            # Compiled CSS
│   ├── js/             # JavaScript files
│   └── assets/         # Images, SVG, static files
├── src/                
│   └── css/     #  Tailwindcss input file 
├── templates/          # Twig template files
│   ├── layouts/        # Base layouts
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard views
│   └── tickets/        # Ticket management views
├── cache/              # Twig cache directory
├── vendor/             # Composer dependencies
├── index.php           # Application entry point
├── composer.json       # PHP dependencies
├── package.json        # Node dependencies
├── tailwind.config.js  # Tailwind configuration
└── .htaccess           # Apache rewrite rules
```

## 🎨 UI Components & Design

### Layout Rules
- **Max Width**: 1440px centered on large screens
- **Hero Section**: Wavy SVG background at bottom edge
- **Decorative Elements**: Circular shapes overlapping sections
- **Card Design**: Rounded corners with box shadows
- **Responsive Grid**: Adapts from mobile stack to multi-column desktop layout

### Status Color Coding
- **Open** → Green tone (`#10b981`, `#dcfce7`)
- **In Progress** → Amber tone (`#f59e0b`, `#fef3c7`)
- **Closed** → Gray tone (`#6b7280`, `#f3f4f6`)

### Accessibility Features
- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Sufficient color contrast (WCAG AA compliant)
- Focus visible states on interactive elements

## 🔐 Authentication & Security

### Session Management
- Authentication tokens stored in `localStorage` with key: `ticketapp_session`
- Protected routes check for valid session before rendering
- Unauthorized access redirects to `/auth/login`
- Logout clears session and redirects to landing page

### Data Validation
- **Title**: Required field (3-100 characters)
- **Status**: Required, must be one of: `open`, `in_progress`, `closed`
- **Description**: Optional (max 500 characters)
- **Priority**: Optional, one of: `low`, `medium`, `high`

## ⚠️ Error Handling

The application implements consistent error handling:
- **Form Validation**: Inline error messages beneath fields
- **Authentication Errors**: Toast notifications for failed login
- **Authorization**: Redirect with session expired message
- **Network Errors**: User-friendly error messages with retry option

Example error messages:
- "Your session has expired — please log in again."
- "Failed to load tickets. Please retry."
- "Title is required and must be at least 3 characters."

## 🐛 Known Issues

- Browser-sync may require manual page refresh on first load (local development only)
- Cache folder needs write permissions for Twig compilation
- Session persistence limited to localStorage (for demo purposes)
- Railway cold starts may take 2-3 seconds on first visit after inactivity

## 🚀 Production Deployment (Railway)

### Current Deployment
This application is live on Railway: **[Insert Your Railway URL Here]**

### Railway Configuration
The project includes:
- `Procfile` - Configures the web server command
- `composer.json` - PHP dependencies for Railway
- `.htaccess` - URL rewriting rules

### Production Features
- Automatic HTTPS enabled
- Git-based continuous deployment
- Built-in CDN for static assets
- Auto-scaling based on traffic

### Deployment Workflow
```bash
# Commit your changes
git add .
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Railway automatically deploys the latest changes
```

## 📝 Development Notes

### State Management
- Tickets stored in `localStorage` with key: `ticketapp_tickets`
- Each ticket has unique ID generated via timestamp + random string
- Session state managed through `localStorage` authentication token

### Twig Components
- **Base Layout**: `templates/layouts/base.twig` - Master template
- **Navigation**: Included via `{% include 'partials/nav.twig' %}`
- **Footer**: Consistent across all pages
- **Forms**: Reusable form components with validation

## 🤝 Contributing

This is a demonstration project for the Frontend Stage 2 task. For modifications:
1. Follow the existing code structure
2. Maintain design consistency
3. Test across different screen sizes
4. Update this README with any new features

## 📄 License

This project is created as part of the Frontend Stage 2 assessment task.

## 📞 Support

For issues or questions related to this implementation:
- Check the project structure and setup steps
- Verify all dependencies are installed
- Ensure Apache rewrite module is enabled
- Clear Twig cache if templates don't update

---

**Last Updated**: October 28, 2025  
**Version**: 1.0.0  
**Framework**: Twig (PHP Templating email)# Twig Ticket Management Application

A robust ticket management web application built with PHP and Twig templating engine, featuring a modern UI, secure authentication, and full CRUD operations for ticket management.

**🌐 Live Demo**: [Your Railway App URL]

---

## 🚀 Features

- **Landing Page**: Welcoming hero section with wavy SVG background and decorative elements
- **Authentication System**: Secure login and signup with session-based authentication
- **Dashboard**: Overview of ticket statistics (total, open, resolved tickets)
- **Ticket Management**: Complete CRUD operations with real-time validation
- **Responsive Design**: Fully responsive layout adapting to mobile, tablet, and desktop screens
- **Consistent UI**: Max-width 1440px centered layout with card-based design system

## 🛠️ Technologies Used

### Backend
- **PHP** (7.4+)
- **Twig** (3.x) - Templating engine
- **Composer** - Dependency management

### Frontend
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - Form validation and interactivity
- **SVG** - Decorative elements and wavy backgrounds

### Development Tools
- **Browser-sync** - Live reload during development
- **npm** - Frontend package management
- **WAMP/XAMPP** - Local development server

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- PHP 7.4 or higher
- Composer
- Node.js and npm
- Apache server (WAMP, XAMPP, or MAMP)

## 🔧 Installation & Setup

### Local Development

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd twig-ticket-app
```

#### 2. Install PHP Dependencies
```bash
composer install
```

#### 3. Install Frontend Dependencies
```bash
npm install
```

#### 4. Build Tailwind CSS
```bash
npm run build
```
Or for development with watch mode:
```bash
npm run dev
```

#### 5. Configure Local Web Server

**For WAMP/XAMPP:**
- Place the project in your web directory
- Access via: `http://localhost/twig-ticket-app`

**For PHP Built-in Server:**
```bash
php -S localhost:8000 -t public
```

#### 6. Start Development Server (Optional)
```bash
npm run watch
```
This starts Browser-sync for live reload during development.

### 🚂 Railway Deployment

This application is deployed on Railway. The live version is accessible at:
**[Your Railway App URL]**

#### Deploy Your Own Instance

1. **Fork/Clone this repository**

2. **Create a new project on Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"

3. **Configure Build Settings**
   - Railway will auto-detect PHP and use the `Procfile`
   - Build Command: `composer install && npm install && npm run build`
   - Start Command: Uses `Procfile` configuration

4. **Environment Variables** (Optional)
   - No environment variables required for basic setup
   - Add custom configurations as needed

5. **Deploy**
   - Railway will automatically deploy on push to main branch
   - Monitor build logs for any issues

## 🎯 Usage

### Test Credentials
Use these credentials to test the application:

**Default User:**
- Email: `demo@example.com`
- Password: `password123`

**Alternative User:**
- Email: `test@ticket.com`
- Password: `test1234`

### Navigation Flow
1. **Landing Page** (`/`) - Introduction and call-to-action buttons
2. **Login** (`/auth/login`) - Authenticate with credentials
3. **Signup** (`/auth/signup`) - Create new account
4. **Dashboard** (`/dashboard`) - View ticket statistics
5. **Tickets** (`/tickets`) - Manage tickets (CRUD operations)

## 📁 Project Structure

```
twig-ticket-app/
├── public/              # Web-accessible files
│   ├── css/            # Compiled CSS
│   ├── js/             # JavaScript files
│   └── assets/         # Images, SVG, static files
├── src/                
│   └── css/     #  Tailwindcss input file 
├── templates/          # Twig template files
│   ├── layouts/        # Base layouts
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard views
│   └── tickets/        # Ticket management views
├── cache/              # Twig cache directory
├── vendor/             # Composer dependencies
├── index.php           # Application entry point
├── composer.json       # PHP dependencies
├── package.json        # Node dependencies
├── tailwind.config.js  # Tailwind configuration
└── .htaccess           # Apache rewrite rules
```

## 🎨 UI Components & Design

### Layout Rules
- **Max Width**: 1440px centered on large screens
- **Hero Section**: Wavy SVG background at bottom edge
- **Decorative Elements**: Circular shapes overlapping sections
- **Card Design**: Rounded corners with box shadows
- **Responsive Grid**: Adapts from mobile stack to multi-column desktop layout

### Status Color Coding
- **Open** → Green tone (`#10b981`, `#dcfce7`)
- **In Progress** → Amber tone (`#f59e0b`, `#fef3c7`)
- **Closed** → Gray tone (`#6b7280`, `#f3f4f6`)

### Accessibility Features
- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Sufficient color contrast (WCAG AA compliant)
- Focus visible states on interactive elements

## 🔐 Authentication & Security

### Session Management
- Authentication tokens stored in `localStorage` with key: `ticketapp_session`
- Protected routes check for valid session before rendering
- Unauthorized access redirects to `/auth/login`
- Logout clears session and redirects to landing page

### Data Validation
- **Title**: Required field (3-100 characters)
- **Status**: Required, must be one of: `open`, `in_progress`, `closed`
- **Description**: Optional (max 500 characters)
- **Priority**: Optional, one of: `low`, `medium`, `high`

## ⚠️ Error Handling

The application implements consistent error handling:
- **Form Validation**: Inline error messages beneath fields
- **Authentication Errors**: Toast notifications for failed login
- **Authorization**: Redirect with session expired message
- **Network Errors**: User-friendly error messages with retry option

Example error messages:
- "Your session has expired — please log in again."
- "Failed to load tickets. Please retry."
- "Title is required and must be at least 3 characters."

## 🐛 Known Issues

- Browser-sync may require manual page refresh on first load (local development only)
- Cache folder needs write permissions for Twig compilation
- Session persistence limited to localStorage (for demo purposes)
- Railway cold starts may take 2-3 seconds on first visit after inactivity

## 🚀 Production Deployment (Railway)

### Current Deployment
This application is live on Railway: **[Insert Your Railway URL Here]**

### Railway Configuration
The project includes:
- `Procfile` - Configures the web server command
- `composer.json` - PHP dependencies for Railway
- `.htaccess` - URL rewriting rules

### Production Features
- Automatic HTTPS enabled
- Git-based continuous deployment
- Built-in CDN for static assets
- Auto-scaling based on traffic

### Deployment Workflow
```bash
# Commit your changes
git add .
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Railway automatically deploys the latest changes
```

## 📝 Development Notes

### State Management
- Tickets stored in `localStorage` with key: `ticketapp_tickets`
- Each ticket has unique ID generated via timestamp + random string
- Session state managed through `localStorage` authentication token

### Twig Components
- **Base Layout**: `templates/layouts/base.twig` - Master template
- **Navigation**: Included via `{% include 'partials/nav.twig' %}`
- **Footer**: Consistent across all pages
- **Forms**: Reusable form components with validation

## 🤝 Contributing

This is a demonstration project for the Frontend Stage 2 task. For modifications:
1. Follow the existing code structure
2. Maintain design consistency
3. Test across different screen sizes
4. Update this README with any new features

## 📄 License

This project is created as part of the Frontend Stage 2 assessment task.

## 📞 Support

For issues or questions related to this implementation:
- Check the project structure and setup steps
- Verify all dependencies are installed
- Ensure Apache rewrite module is enabled
- Clear Twig cache if templates don't update

---

**Last Updated**: October 28, 2025  
**Version**: 1.0.0  
**Framework**: Twig (PHP Templating email)# Twig Ticket Management Application

A robust ticket management web application built with PHP and Twig templating engine, featuring a modern UI, secure authentication, and full CRUD operations for ticket management.

**🌐 Live Demo**: [Your Railway App URL]

---

## 🚀 Features

- **Landing Page**: Welcoming hero section with wavy SVG background and decorative elements
- **Authentication System**: Secure login and signup with session-based authentication
- **Dashboard**: Overview of ticket statistics (total, open, resolved tickets)
- **Ticket Management**: Complete CRUD operations with real-time validation
- **Responsive Design**: Fully responsive layout adapting to mobile, tablet, and desktop screens
- **Consistent UI**: Max-width 1440px centered layout with card-based design system

## 🛠️ Technologies Used

### Backend
- **PHP** (7.4+)
- **Twig** (3.x) - Templating engine
- **Composer** - Dependency management

### Frontend
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - Form validation and interactivity
- **SVG** - Decorative elements and wavy backgrounds

### Development Tools
- **Browser-sync** - Live reload during development
- **npm** - Frontend package management
- **WAMP/XAMPP** - Local development server

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- PHP 7.4 or higher
- Composer
- Node.js and npm
- Apache server (WAMP, XAMPP, or MAMP)

## 🔧 Installation & Setup

### Local Development

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd twig-ticket-app
```

#### 2. Install PHP Dependencies
```bash
composer install
```

#### 3. Install Frontend Dependencies
```bash
npm install
```

#### 4. Build Tailwind CSS
```bash
npm run build
```
Or for development with watch mode:
```bash
npm run dev
```

#### 5. Configure Local Web Server

**For WAMP/XAMPP:**
- Place the project in your web directory
- Access via: `http://localhost/twig-ticket-app`

**For PHP Built-in Server:**
```bash
php -S localhost:8000 -t public
```

#### 6. Start Development Server (Optional)
```bash
npm run watch
```
This starts Browser-sync for live reload during development.

### 🚂 Railway Deployment

This application is deployed on Railway. The live version is accessible at:
**[Your Railway App URL]**

#### Deploy Your Own Instance

1. **Fork/Clone this repository**

2. **Create a new project on Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"

3. **Configure Build Settings**
   - Railway will auto-detect PHP and use the `Procfile`
   - Build Command: `composer install && npm install && npm run build`
   - Start Command: Uses `Procfile` configuration

4. **Environment Variables** (Optional)
   - No environment variables required for basic setup
   - Add custom configurations as needed

5. **Deploy**
   - Railway will automatically deploy on push to main branch
   - Monitor build logs for any issues

## 🎯 Usage

### Test Credentials
Use these credentials to test the application:

**Default User:**
- Email: `demo@example.com`
- Password: `password123`

**Alternative User:**
- Email: `test@ticket.com`
- Password: `test1234`

### Navigation Flow
1. **Landing Page** (`/`) - Introduction and call-to-action buttons
2. **Login** (`/auth/login`) - Authenticate with credentials
3. **Signup** (`/auth/signup`) - Create new account
4. **Dashboard** (`/dashboard`) - View ticket statistics
5. **Tickets** (`/tickets`) - Manage tickets (CRUD operations)

## 📁 Project Structure

```
twig-ticket-app/
├── public/              # Web-accessible files
│   ├── css/            # Compiled CSS
│   ├── js/             # JavaScript files
│   └── assets/         # Images, SVG, static files
├── src/                
│   └── css/     #  Tailwindcss input file 
├── templates/          # Twig template files
│   ├── layouts/        # Base layouts
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard views
│   └── tickets/        # Ticket management views
├── cache/              # Twig cache directory
├── vendor/             # Composer dependencies
├── index.php           # Application entry point
├── composer.json       # PHP dependencies
├── package.json        # Node dependencies
├── tailwind.config.js  # Tailwind configuration
└── .htaccess           # Apache rewrite rules
```

## 🎨 UI Components & Design

### Layout Rules
- **Max Width**: 1440px centered on large screens
- **Hero Section**: Wavy SVG background at bottom edge
- **Decorative Elements**: Circular shapes overlapping sections
- **Card Design**: Rounded corners with box shadows
- **Responsive Grid**: Adapts from mobile stack to multi-column desktop layout

### Status Color Coding
- **Open** → Green tone (`#10b981`, `#dcfce7`)
- **In Progress** → Amber tone (`#f59e0b`, `#fef3c7`)
- **Closed** → Gray tone (`#6b7280`, `#f3f4f6`)

### Accessibility Features
- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Sufficient color contrast (WCAG AA compliant)
- Focus visible states on interactive elements

## 🔐 Authentication & Security

### Session Management
- Authentication tokens stored in `localStorage` with key: `ticketapp_session`
- Protected routes check for valid session before rendering
- Unauthorized access redirects to `/auth/login`
- Logout clears session and redirects to landing page

### Data Validation
- **Title**: Required field (3-100 characters)
- **Status**: Required, must be one of: `open`, `in_progress`, `closed`
- **Description**: Optional (max 500 characters)
- **Priority**: Optional, one of: `low`, `medium`, `high`

## ⚠️ Error Handling

The application implements consistent error handling:
- **Form Validation**: Inline error messages beneath fields
- **Authentication Errors**: Toast notifications for failed login
- **Authorization**: Redirect with session expired message
- **Network Errors**: User-friendly error messages with retry option

Example error messages:
- "Your session has expired — please log in again."
- "Failed to load tickets. Please retry."
- "Title is required and must be at least 3 characters."

## 🐛 Known Issues

- Browser-sync may require manual page refresh on first load (local development only)
- Cache folder needs write permissions for Twig compilation
- Session persistence limited to localStorage (for demo purposes)
- Railway cold starts may take 2-3 seconds on first visit after inactivity

## 🚀 Production Deployment (Railway)

### Current Deployment
This application is live on Railway: **[Insert Your Railway URL Here]**

### Railway Configuration
The project includes:
- `Procfile` - Configures the web server command
- `composer.json` - PHP dependencies for Railway
- `.htaccess` - URL rewriting rules

### Production Features
- Automatic HTTPS enabled
- Git-based continuous deployment
- Built-in CDN for static assets
- Auto-scaling based on traffic

### Deployment Workflow
```bash
# Commit your changes
git add .
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Railway automatically deploys the latest changes
```

## 📝 Development Notes

### State Management
- Tickets stored in `localStorage` with key: `ticketapp_tickets`
- Each ticket has unique ID generated via timestamp + random string
- Session state managed through `localStorage` authentication token

### Twig Components
- **Base Layout**: `templates/layouts/base.twig` - Master template
- **Navigation**: Included via `{% include 'partials/nav.twig' %}`
- **Footer**: Consistent across all pages
- **Forms**: Reusable form components with validation

## 🤝 Contributing

This is a demonstration project for the Frontend Stage 2 task. For modifications:
1. Follow the existing code structure
2. Maintain design consistency
3. Test across different screen sizes
4. Update this README with any new features

## 📄 License

This project is created as part of the Frontend Stage 2 assessment task.

## 📞 Support

For issues or questions related to this implementation:
- Check the project structure and setup steps
- Verify all dependencies are installed
- Ensure Apache rewrite module is enabled
- Clear Twig cache if templates don't update

---

**Last Updated**: October 28, 2025  
**Version**: 1.0.0  
**Framework**: Twig (PHP Templating email)# Twig Ticket Management Application

A robust ticket management web application built with PHP and Twig templating engine, featuring a modern UI, secure authentication, and full CRUD operations for ticket management.

**🌐 Live Demo**: [Your Railway App URL]

---

## 🚀 Features

- **Landing Page**: Welcoming hero section with wavy SVG background and decorative elements
- **Authentication System**: Secure login and signup with session-based authentication
- **Dashboard**: Overview of ticket statistics (total, open, resolved tickets)
- **Ticket Management**: Complete CRUD operations with real-time validation
- **Responsive Design**: Fully responsive layout adapting to mobile, tablet, and desktop screens
- **Consistent UI**: Max-width 1440px centered layout with card-based design system

## 🛠️ Technologies Used

### Backend
- **PHP** (7.4+)
- **Twig** (3.x) - Templating engine
- **Composer** - Dependency management

### Frontend
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - Form validation and interactivity
- **SVG** - Decorative elements and wavy backgrounds

### Development Tools
- **Browser-sync** - Live reload during development
- **npm** - Frontend package management
- **WAMP/XAMPP** - Local development server

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- PHP 7.4 or higher
- Composer
- Node.js and npm
- Apache server (WAMP, XAMPP, or MAMP)

## 🔧 Installation & Setup

### Local Development

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd twig-ticket-app
```

#### 2. Install PHP Dependencies
```bash
composer install
```

#### 3. Install Frontend Dependencies
```bash
npm install
```

#### 4. Build Tailwind CSS
```bash
npm run build
```
Or for development with watch mode:
```bash
npm run dev
```

#### 5. Configure Local Web Server

**For WAMP/XAMPP:**
- Place the project in your web directory
- Access via: `http://localhost/twig-ticket-app`

**For PHP Built-in Server:**
```bash
php -S localhost:8000 -t public
```

#### 6. Start Development Server (Optional)
```bash
npm run watch
```
This starts Browser-sync for live reload during development.

### 🚂 Railway Deployment

This application is deployed on Railway. The live version is accessible at:
**[Your Railway App URL]**

#### Deploy Your Own Instance

1. **Fork/Clone this repository**

2. **Create a new project on Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"

3. **Configure Build Settings**
   - Railway will auto-detect PHP and use the `Procfile`
   - Build Command: `composer install && npm install && npm run build`
   - Start Command: Uses `Procfile` configuration

4. **Environment Variables** (Optional)
   - No environment variables required for basic setup
   - Add custom configurations as needed

5. **Deploy**
   - Railway will automatically deploy on push to main branch
   - Monitor build logs for any issues

## 🎯 Usage

### Test Credentials
Use these credentials to test the application:

**Default User:**
- Email: `demo@example.com`
- Password: `password123`

**Alternative User:**
- Email: `test@ticket.com`
- Password: `test1234`

### Navigation Flow
1. **Landing Page** (`/`) - Introduction and call-to-action buttons
2. **Login** (`/auth/login`) - Authenticate with credentials
3. **Signup** (`/auth/signup`) - Create new account
4. **Dashboard** (`/dashboard`) - View ticket statistics
5. **Tickets** (`/tickets`) - Manage tickets (CRUD operations)

## 📁 Project Structure

```
twig-ticket-app/
├── public/              # Web-accessible files
│   ├── css/            # Compiled CSS
│   ├── js/             # JavaScript files
│   └── assets/         # Images, SVG, static files
├── src/                
│   └── css/     #  Tailwindcss input file 
├── templates/          # Twig template files
│   ├── layouts/        # Base layouts
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard views
│   └── tickets/        # Ticket management views
├── cache/              # Twig cache directory
├── vendor/             # Composer dependencies
├── index.php           # Application entry point
├── composer.json       # PHP dependencies
├── package.json        # Node dependencies
├── tailwind.config.js  # Tailwind configuration
└── .htaccess           # Apache rewrite rules
```

## 🎨 UI Components & Design

### Layout Rules
- **Max Width**: 1440px centered on large screens
- **Hero Section**: Wavy SVG background at bottom edge
- **Decorative Elements**: Circular shapes overlapping sections
- **Card Design**: Rounded corners with box shadows
- **Responsive Grid**: Adapts from mobile stack to multi-column desktop layout

### Status Color Coding
- **Open** → Green tone (`#10b981`, `#dcfce7`)
- **In Progress** → Amber tone (`#f59e0b`, `#fef3c7`)
- **Closed** → Gray tone (`#6b7280`, `#f3f4f6`)

### Accessibility Features
- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Sufficient color contrast (WCAG AA compliant)
- Focus visible states on interactive elements

## 🔐 Authentication & Security

### Session Management
- Authentication tokens stored in `localStorage` with key: `ticketapp_session`
- Protected routes check for valid session before rendering
- Unauthorized access redirects to `/auth/login`
- Logout clears session and redirects to landing page

### Data Validation
- **Title**: Required field (3-100 characters)
- **Status**: Required, must be one of: `open`, `in_progress`, `closed`
- **Description**: Optional (max 500 characters)
- **Priority**: Optional, one of: `low`, `medium`, `high`

## ⚠️ Error Handling

The application implements consistent error handling:
- **Form Validation**: Inline error messages beneath fields
- **Authentication Errors**: Toast notifications for failed login
- **Authorization**: Redirect with session expired message
- **Network Errors**: User-friendly error messages with retry option

Example error messages:
- "Your session has expired — please log in again."
- "Failed to load tickets. Please retry."
- "Title is required and must be at least 3 characters."

## 🐛 Known Issues

- Browser-sync may require manual page refresh on first load (local development only)
- Cache folder needs write permissions for Twig compilation
- Session persistence limited to localStorage (for demo purposes)
- Railway cold starts may take 2-3 seconds on first visit after inactivity

## 🚀 Production Deployment (Railway)

### Current Deployment
This application is live on Railway: **[Insert Your Railway URL Here]**

### Railway Configuration
The project includes:
- `Procfile` - Configures the web server command
- `composer.json` - PHP dependencies for Railway
- `.htaccess` - URL rewriting rules

### Production Features
- Automatic HTTPS enabled
- Git-based continuous deployment
- Built-in CDN for static assets
- Auto-scaling based on traffic

### Deployment Workflow
```bash
# Commit your changes
git add .
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Railway automatically deploys the latest changes
```

## 📝 Development Notes

### State Management
- Tickets stored in `localStorage` with key: `ticketapp_tickets`
- Each ticket has unique ID generated via timestamp + random string
- Session state managed through `localStorage` authentication token

### Twig Components
- **Base Layout**: `templates/layouts/base.twig` - Master template
- **Navigation**: Included via `{% include 'partials/nav.twig' %}`
- **Footer**: Consistent across all pages
- **Forms**: Reusable form components with validation

## 🤝 Contributing

This is a demonstration project for the Frontend Stage 2 task. For modifications:
1. Follow the existing code structure
2. Maintain design consistency
3. Test across different screen sizes
4. Update this README with any new features

## 📄 License

This project is created as part of the Frontend Stage 2 assessment task.

## 📞 Support

For issues or questions related to this implementation:
- Check the project structure and setup steps
- Verify all dependencies are installed
- Ensure Apache rewrite module is enabled
- Clear Twig cache if templates don't update

---

**Last Updated**: October 28, 2025  
**Version**: 1.0.0  
**Framework**: Twig (PHP Templating email)# Twig Ticket Management Application

A robust ticket management web application built with PHP and Twig templating engine, featuring a modern UI, secure authentication, and full CRUD operations for ticket management.

**🌐 Live Demo**: [Your Railway App URL]

---

## 🚀 Features

- **Landing Page**: Welcoming hero section with wavy SVG background and decorative elements
- **Authentication System**: Secure login and signup with session-based authentication
- **Dashboard**: Overview of ticket statistics (total, open, resolved tickets)
- **Ticket Management**: Complete CRUD operations with real-time validation
- **Responsive Design**: Fully responsive layout adapting to mobile, tablet, and desktop screens
- **Consistent UI**: Max-width 1440px centered layout with card-based design system

## 🛠️ Technologies Used

### Backend
- **PHP** (7.4+)
- **Twig** (3.x) - Templating engine
- **Composer** - Dependency management

### Frontend
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - Form validation and interactivity
- **SVG** - Decorative elements and wavy backgrounds

### Development Tools
- **Browser-sync** - Live reload during development
- **npm** - Frontend package management
- **WAMP/XAMPP** - Local development server

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- PHP 7.4 or higher
- Composer
- Node.js and npm
- Apache server (WAMP, XAMPP, or MAMP)

## 🔧 Installation & Setup

### Local Development

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd twig-ticket-app
```

#### 2. Install PHP Dependencies
```bash
composer install
```

#### 3. Install Frontend Dependencies
```bash
npm install
```

#### 4. Build Tailwind CSS
```bash
npm run build
```
Or for development with watch mode:
```bash
npm run dev
```

#### 5. Configure Local Web Server

**For WAMP/XAMPP:**
- Place the project in your web directory
- Access via: `http://localhost/twig-ticket-app`

**For PHP Built-in Server:**
```bash
php -S localhost:8000 -t public
```

#### 6. Start Development Server (Optional)
```bash
npm run watch
```
This starts Browser-sync for live reload during development.

### 🚂 Railway Deployment

This application is deployed on Railway. The live version is accessible at:
**[Your Railway App URL]**

#### Deploy Your Own Instance

1. **Fork/Clone this repository**

2. **Create a new project on Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"

3. **Configure Build Settings**
   - Railway will auto-detect PHP and use the `Procfile`
   - Build Command: `composer install && npm install && npm run build`
   - Start Command: Uses `Procfile` configuration

4. **Environment Variables** (Optional)
   - No environment variables required for basic setup
   - Add custom configurations as needed

5. **Deploy**
   - Railway will automatically deploy on push to main branch
   - Monitor build logs for any issues

## 🎯 Usage

### Test Credentials
Use these credentials to test the application:

**Default User:**
- Email: `demo@example.com`
- Password: `password123`

**Alternative User:**
- Email: `test@ticket.com`
- Password: `test1234`

### Navigation Flow
1. **Landing Page** (`/`) - Introduction and call-to-action buttons
2. **Login** (`/auth/login`) - Authenticate with credentials
3. **Signup** (`/auth/signup`) - Create new account
4. **Dashboard** (`/dashboard`) - View ticket statistics
5. **Tickets** (`/tickets`) - Manage tickets (CRUD operations)

## 📁 Project Structure

```
twig-ticket-app/
├── public/              # Web-accessible files
│   ├── css/            # Compiled CSS
│   ├── js/             # JavaScript files
│   └── assets/         # Images, SVG, static files
├── src/                
│   └── css/     #  Tailwindcss input file 
├── templates/          # Twig template files
│   ├── layouts/        # Base layouts
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard views
│   └── tickets/        # Ticket management views
├── cache/              # Twig cache directory
├── vendor/             # Composer dependencies
├── index.php           # Application entry point
├── composer.json       # PHP dependencies
├── package.json        # Node dependencies
├── tailwind.config.js  # Tailwind configuration
└── .htaccess           # Apache rewrite rules
```

## 🎨 UI Components & Design

### Layout Rules
- **Max Width**: 1440px centered on large screens
- **Hero Section**: Wavy SVG background at bottom edge
- **Decorative Elements**: Circular shapes overlapping sections
- **Card Design**: Rounded corners with box shadows
- **Responsive Grid**: Adapts from mobile stack to multi-column desktop layout

### Status Color Coding
- **Open** → Green tone (`#10b981`, `#dcfce7`)
- **In Progress** → Amber tone (`#f59e0b`, `#fef3c7`)
- **Closed** → Gray tone (`#6b7280`, `#f3f4f6`)

### Accessibility Features
- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Sufficient color contrast (WCAG AA compliant)
- Focus visible states on interactive elements

## 🔐 Authentication & Security

### Session Management
- Authentication tokens stored in `localStorage` with key: `ticketapp_session`
- Protected routes check for valid session before rendering
- Unauthorized access redirects to `/auth/login`
- Logout clears session and redirects to landing page

### Data Validation
- **Title**: Required field (3-100 characters)
- **Status**: Required, must be one of: `open`, `in_progress`, `closed`
- **Description**: Optional (max 500 characters)
- **Priority**: Optional, one of: `low`, `medium`, `high`

## ⚠️ Error Handling

The application implements consistent error handling:
- **Form Validation**: Inline error messages beneath fields
- **Authentication Errors**: Toast notifications for failed login
- **Authorization**: Redirect with session expired message
- **Network Errors**: User-friendly error messages with retry option

Example error messages:
- "Your session has expired — please log in again."
- "Failed to load tickets. Please retry."
- "Title is required and must be at least 3 characters."

## 🐛 Known Issues

- Browser-sync may require manual page refresh on first load (local development only)
- Cache folder needs write permissions for Twig compilation
- Session persistence limited to localStorage (for demo purposes)
- Railway cold starts may take 2-3 seconds on first visit after inactivity

## 🚀 Production Deployment (Railway)

### Current Deployment
This application is live on Railway: **[Insert Your Railway URL Here]**

### Railway Configuration
The project includes:
- `Procfile` - Configures the web server command
- `composer.json` - PHP dependencies for Railway
- `.htaccess` - URL rewriting rules

### Production Features
- Automatic HTTPS enabled
- Git-based continuous deployment
- Built-in CDN for static assets
- Auto-scaling based on traffic

### Deployment Workflow
```bash
# Commit your changes
git add .
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Railway automatically deploys the latest changes
```

## 📝 Development Notes

### State Management
- Tickets stored in `localStorage` with key: `ticketapp_tickets`
- Each ticket has unique ID generated via timestamp + random string
- Session state managed through `localStorage` authentication token

### Twig Components
- **Base Layout**: `templates/layouts/base.twig` - Master template
- **Navigation**: Included via `{% include 'partials/nav.twig' %}`
- **Footer**: Consistent across all pages
- **Forms**: Reusable form components with validation

## 🤝 Contributing

This is a demonstration project for the Frontend Stage 2 task. For modifications:
1. Follow the existing code structure
2. Maintain design consistency
3. Test across different screen sizes
4. Update this README with any new features

## 📄 License

This project is created as part of the Frontend Stage 2 assessment task.

## 📞 Support

For issues or questions related to this implementation:
- Check the project structure and setup steps
- Verify all dependencies are installed
- Ensure Apache rewrite module is enabled
- Clear Twig cache if templates don't update

---

**Last Updated**: October 28, 2025  
**Version**: 1.0.0  
**Framework**: Twig (PHP Templating email)
