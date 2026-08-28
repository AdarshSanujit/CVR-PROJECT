# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start Development Server:**
```bash
npm run dev
```
Starts the server with nodemon for automatic restart on file changes.

**Run Tests:**
```bash
npm test
```
Note: Test script is not configured in package.json. Tests would need to be run manually or via a test script.

**Install Dependencies:**
```bash
npm install
```

## Project Structure

### Architecture Overview
This is a Node.js/Express REST API with MongoDB/Mongoose following MVC-like architecture:

- **Entry Point**: `server.js` - Initializes Express app, connects to database, starts server
- **App Configuration**: `src/app.js` - Sets up Express middleware and routes
- **Routing Layer**: `src/routes/` - Defines API endpoints and attaches middleware
- **Controllers**: `src/controllers/` - Handles request logic, validation, and responses
- **Models**: `src/models/` - Mongoose schemas and database interactions
- **Middleware**: `src/middlewares/` - Custom middleware (authentication, file upload)
- **Utilities**: `src/utils/` - Helper functions (JWT tokens, Cloudinary uploads)

### Key Features
- **Authentication System**: JWT-based auth with cookie storage
- **Role-Based Access Control**: Three roles - junior, senior, admin
- **File Uploads**: Cloudinary integration for profile pictures and project images
- **RESTful API**: Standard CRUD operations for users and projects

### Data Models
- **User**: Contains profile information, role-based fields, and project references
- **Project**: Linked to senior users, contains project details and metadata

### Authentication Flow
1. Passwords hashed with bcryptjs
2. JWT tokens generated on login/register
3. Tokens stored in HTTP-only cookies
4. Middleware verifies tokens and attaches user to request

### API Endpoints
**Auth Routes** (`/api/auth/*`):
- POST `/register` - User registration
- POST `/login` - User login
- GET `/get-me` - Get current user profile
- GET `/user/:id` - Get specific user
- PUT `/update-profile` - Update user profile
- GET `/logout` - Clear auth cookie
- GET `/get-users` - List non-admin users
- DELETE `/delete/:id` - Delete user account

**Project Routes** (`/api/project/*`):
- POST `/add-project` - Create new project (senior/admin only)
- PUT `/update-project/:projectId` - Update project (owner/admin only)
- DELETE `/delete-project/:projectId` - Delete project (owner/admin only)
- GET `/get-project/:id` - Get specific project
- GET `/get-projects` - Get all projects for current user

### Environment Variables
Required in `.env` file:
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing

## Common Development Patterns

### Error Handling
All controller functions use try/catch blocks returning standardized JSON responses:
```json
{
  "success": boolean,
  "message": string,
  // Additional data on success
  // error: string on failure
}
```

### Response Format
Successful responses include:
- `success: true`
- Descriptive message
- Relevant data (user, project, etc.)

Error responses include:
- `success: false`
- Descriptive error message
- Optional error details

### Middleware Usage
- `verifyUser` middleware protects routes requiring authentication
- Applied to all routes except public endpoints (register, login, root)