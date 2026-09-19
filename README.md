# 📝 Blogify — Full-Stack Blog Application

> A responsive, database-driven blog platform developed as part of my **Codomax Digital Solutions Internship**.

Blogify started as a frontend-only blog interface and was progressively developed into a full-stack application with a Node.js/Express backend, MongoDB database integration, REST APIs, CRUD operations, search and filtering, and secure user authentication.

---

## 🚀 Project Overview

**Blogify** is a full-stack blog application where users can:

- Create an account
- Log in securely
- Create and publish blogs
- View blogs
- Search blogs
- Filter blogs by category
- View individual blog details
- Edit their blogs
- Delete their blogs
- Access a personalized dashboard
- View their profile
- Log out securely

The project was developed incrementally across multiple internship modules, allowing me to strengthen my understanding of frontend development, backend development, databases, REST APIs, CRUD operations, and authentication.

---

## 🎯 Objectives

The main objectives of Blogify are:

1. Build a responsive and user-friendly frontend.
2. Understand client-server communication.
3. Develop RESTful APIs using Node.js and Express.js.
4. Integrate MongoDB for persistent data storage.
5. Implement complete CRUD operations.
6. Add secure user authentication and authorization.
7. Build a personalized dashboard for logged-in users.
8. Understand how a complete full-stack application works.

---

# 🛠️ Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API
- Responsive Web Design

### Backend

- Node.js
- Express.js
- REST APIs
- CORS
- Middleware

### Database

- MongoDB Atlas
- Mongoose

### Security & Authentication

- JWT Authentication
- bcrypt / bcryptjs
- Protected API routes
- Environment variables

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Live Server
- MongoDB Atlas

---

# 📁 Project Structure

```text
blogify/
│
├── frontend/
│   │
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── create-blog.html
│   ├── blog.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── script.js
│
├── backend/
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Blog.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── blogRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   └── .gitignore
│
└── README.md
```

> The exact folder structure may evolve as additional modules and features are implemented.

---

# ✨ Features

## 🏠 Home Page

The home page provides:

- Blog listing
- Responsive navigation
- Blog categories
- Search functionality
- Category filtering
- Navigation to individual blog details

---

## 👤 User Registration

Users can create an account using:

- Full name
- Email address
- Password

Passwords are hashed before being stored in the database.

---

## 🔐 User Login

Registered users can log in using their credentials.

The authentication system verifies the credentials and provides a secure authenticated session/token.

---

## 📝 Create Blog

Authenticated users can create blog posts with:

- Blog title
- Category
- Content
- Author information

The blog is stored in MongoDB.

---

## 📖 Read Blogs

Users can:

- View all published blogs
- Open individual blog posts
- Read complete blog content
- View author and publication information

---

## ✏️ Update Blog

Users can edit their existing blog posts.

The update flow uses:

```text
Frontend
   ↓
PUT /api/blogs/:id
   ↓
Express.js
   ↓
Mongoose
   ↓
MongoDB
```

---

## 🗑️ Delete Blog

Users can delete their own blog posts.

The application sends a DELETE request to the backend and removes the corresponding MongoDB document.

---

## 🔎 Search Blogs

Users can search blogs using keywords.

Search can match relevant blog information such as:

- Title
- Content
- Author

---

## 🏷️ Category Filtering

Blogs can be filtered according to categories such as:

- Technology
- Programming
- Education
- Lifestyle
- Other

---

## 👤 User Dashboard

The dashboard provides a personalized view of the logged-in user.

It can display:

- User name
- Total blogs
- Blog statistics
- User's published blogs
- Edit options
- Delete options

Only blogs belonging to the authenticated user are displayed.

---

## 👨‍💻 User Profile

The profile section provides user-specific information such as:

- Name
- Email
- Account information
- User activity

---

## 🚪 Logout

Users can securely log out of their account.

Authentication information is removed/invalidated so protected resources cannot be accessed as an authenticated user after logout.

---

# 🔄 Application Architecture

```text
                    ┌──────────────────────┐
                    │      BLOGIFY         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      FRONTEND        │
                    │ HTML / CSS / JS      │
                    └──────────┬───────────┘
                               │
                         Fetch API
                               │
                               ▼
                    ┌──────────────────────┐
                    │      REST APIs       │
                    │      Express.js      │
                    └──────────┬───────────┘
                               │
                         Authentication
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Mongoose       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     MongoDB Atlas    │
                    │                      │
                    │  Users + Blog Posts  │
                    └──────────────────────┘
```

---

# 🔌 REST API Endpoints

## Authentication APIs

### Register

```http
POST /api/register
```

Example request:

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```

### Login

```http
POST /api/login
```

Example request:

```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

---

# 📰 Blog APIs

### Create Blog

```http
POST /api/blogs
```

### Get All Blogs

```http
GET /api/blogs
```

### Get Individual Blog

```http
GET /api/blogs/:id
```

### Update Blog

```http
PUT /api/blogs/:id
```

### Delete Blog

```http
DELETE /api/blogs/:id
```

---

# 🔄 CRUD Implementation

| Operation | HTTP Method | Endpoint | Purpose |
|---|---|---|---|
| Create | POST | `/api/blogs` | Create a blog |
| Read | GET | `/api/blogs` | Get all blogs |
| Read One | GET | `/api/blogs/:id` | Get one blog |
| Update | PUT | `/api/blogs/:id` | Edit a blog |
| Delete | DELETE | `/api/blogs/:id` | Delete a blog |

---

# 🔐 Authentication Flow

The authentication architecture follows this general flow:

```text
User
 │
 ▼
Login Form
 │
 ▼
POST /api/login
 │
 ▼
Express Backend
 │
 ▼
Verify User
 │
 ▼
Check Hashed Password
 │
 ▼
Generate Authentication Token
 │
 ▼
Frontend Stores Authentication State
 │
 ▼
Protected Requests
 │
 ▼
Authentication Middleware
 │
 ▼
Authorized Resource
```

Protected resources verify authentication before allowing operations such as creating, updating, or deleting blogs.

---

# 🗄️ Database Design

## User Collection

Typical fields:

```text
User
├── _id
├── name
├── email
├── password
├── createdAt
└── updatedAt
```

The password is stored as a secure hash rather than plain text.

---

## Blog Collection

Typical fields:

```text
Blog
├── _id
├── title
├── category
├── content
├── author
├── userId
├── views
├── likes
├── createdAt
└── updatedAt
```

The `userId` field associates a blog with its creator.

---

# 🛡️ Security Considerations

The application includes several security practices:

- Password hashing using bcrypt/bcryptjs
- JWT-based authentication
- Protected backend routes
- User authorization for blog operations
- Environment variables for sensitive configuration
- `.env` excluded through `.gitignore`
- MongoDB credentials kept outside source code
- Input validation on API requests

### Important

The `.env` file should never be committed to GitHub.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

# 🧪 Testing Checklist

## Authentication

- [ ] Register a new user
- [ ] Prevent duplicate email registration
- [ ] Reject invalid login credentials
- [ ] Successfully log in
- [ ] Successfully log out
- [ ] Prevent unauthenticated access to protected routes

## Blog Management

- [ ] Create a blog
- [ ] Read all blogs
- [ ] View individual blog
- [ ] Search blogs
- [ ] Filter blogs by category
- [ ] Edit a blog
- [ ] Delete a blog
- [ ] Prevent users from modifying another user's blogs

## Database

- [ ] User data is stored in MongoDB
- [ ] Passwords are hashed
- [ ] Blog data is stored in MongoDB
- [ ] Updated blogs are reflected in the database
- [ ] Deleted blogs are removed from the database

---

# ⚙️ Installation & Setup

## 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

```bash
cd blogify
```

---

## 2. Install backend dependencies

```bash
cd backend
npm install
```

---

## 3. Configure environment variables

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 4. Start the backend

```bash
node server.js
```

For development, you can use:

```bash
npm run dev
```

if a development script using Nodemon has been configured.

The backend will normally run at:

```text
http://localhost:5000
```

---

## 5. Start the frontend

Open the `frontend/index.html` file using VS Code Live Server.

The frontend will normally run on a local Live Server URL such as:

```text
http://127.0.0.1:5500
```

---

# 📈 Development Journey

Blogify was developed progressively during the Codomax internship.

## Module 1 — Frontend Development

### Completed

- Development environment setup
- HTML fundamentals
- CSS fundamentals
- JavaScript fundamentals
- Responsive UI
- Home page
- Login page
- Registration page
- Dashboard
- Create Blog page

### Technologies

```text
HTML
CSS
JavaScript
```

---

## Module 2 — Backend Development

### Completed

- Node.js setup
- Express.js server
- REST API development
- User registration API
- User login API
- Create Blog API
- Blog retrieval API
- Frontend-backend integration

### Technologies

```text
Node.js
Express.js
REST APIs
Fetch API
```

---

## Module 3 — Database Integration

### Completed

- MongoDB Atlas setup
- Mongoose integration
- User schema
- Blog schema
- Persistent blog storage
- Persistent user storage
- Password hashing
- Individual blog details page

### Technologies

```text
MongoDB
MongoDB Atlas
Mongoose
bcrypt
```

---

## Module 4 — CRUD Operations

### Completed

- Create blogs
- Read blogs
- Update blogs
- Delete blogs
- Blog search
- Category filtering
- Individual blog viewing

### API Operations

```text
POST   → Create
GET    → Read
PUT    → Update
DELETE → Delete
```

---

## Module 5 — Authentication & Dashboard

### Completed

- JWT authentication
- Protected routes
- Authentication middleware
- User-specific dashboard
- User-specific blog listing
- User profile
- Logout functionality
- Authorization checks

### Technologies

```text
JWT
bcrypt
Express Middleware
MongoDB
```

---

# 📊 Feature Progress

| Feature | Status |
|---|---|
| Responsive Frontend | ✅ |
| Registration | ✅ |
| Login | ✅ |
| Dashboard | ✅ |
| Create Blog | ✅ |
| Read Blogs | ✅ |
| Individual Blog | ✅ |
| Update Blog | ✅ |
| Delete Blog | ✅ |
| Search | ✅ |
| Category Filter | ✅ |
| MongoDB Integration | ✅ |
| Password Hashing | ✅ |
| JWT Authentication | ✅ |
| Protected Routes | ✅ |
| User-specific Dashboard | ✅ |
| User Profile | ✅ |
| Logout | ✅ |

---

# 💡 Key Learning Outcomes

Through this project, I gained practical experience in:

- Building responsive web interfaces
- JavaScript DOM manipulation
- Client-server architecture
- REST API development
- HTTP methods and status codes
- Express.js middleware
- MongoDB database operations
- Mongoose schemas and models
- Password hashing
- JWT authentication
- Authentication vs authorization
- Protected routes
- CRUD architecture
- API integration using Fetch
- Environment variable management
- Git and GitHub workflow
- Debugging full-stack applications

---

# 🚀 Future Improvements

Potential future enhancements include:

- Rich text blog editor
- Image uploads
- Blog comments
- Likes and bookmarks
- Pagination
- Advanced search
- Tags
- Admin dashboard
- Email verification
- Password reset
- Refresh tokens
- Rate limiting
- Input sanitization
- Automated testing
- Deployment using a cloud platform
- CI/CD pipeline

---

# 📸 Screenshots

Add project screenshots here after deployment.

Example:

```text
screenshots/
├── home.png
├── login.png
├── register.png
├── dashboard.png
├── create-blog.png
├── blog-details.png
└── mongodb.png
```

Then add them to this README using:

```markdown
![Home Page](screenshots/home.png)
```

---

# 🌐 Deployment

The project can be deployed using:

### Frontend

- GitHub Pages
- Vercel
- Netlify

### Backend

- Render
- Railway
- Other Node.js-compatible hosting

### Database

- MongoDB Atlas

Before deployment, environment variables must be configured on the hosting platform.

---

# 👨‍💻 Internship Project

**Project:** Blogify — Full-Stack Blog Application

**Internship:** Codomax Digital Solutions

**Development Focus:**

```text
Frontend
   ↓
Backend
   ↓
Database
   ↓
CRUD
   ↓
Authentication
   ↓
Personalized Dashboard
```

---

# 🙌 Acknowledgement

This project was developed as part of my internship learning journey at **Codomax Digital Solutions**.

The project helped me progressively understand how modern web applications are designed, developed, connected to databases, secured, and managed from frontend to backend.

---

# 📄 License

This project is created for educational and internship purposes.

---

## ⭐ If you find this project useful

Feel free to explore the repository, suggest improvements, or use the project as a reference for learning full-stack web development.
