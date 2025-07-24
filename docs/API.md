# API Documentation

This document provides comprehensive documentation for the Mike Learning App REST API.

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Error Handling](#error-handling)
4. [Rate Limiting](#rate-limiting)
5. [Endpoints](#endpoints)
   - [Authentication](#authentication-endpoints)
   - [Users](#user-endpoints)
   - [Courses](#course-endpoints)
   - [Progress](#progress-endpoints)
   - [Admin](#admin-endpoints)
6. [Data Models](#data-models)
7. [Examples](#examples)

## Overview

The Mike Learning App API is a RESTful API built with Flask that provides access to user management, course content, progress tracking, and administrative functions.

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-backend-url.com/api`

### Content Type
All requests and responses use `application/json` content type.

### API Version
Current API version: `v1`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header for protected endpoints.

### Header Format
```
Authorization: Bearer <your_jwt_token>
```

### Token Expiration
- Access tokens expire after 7 days
- Refresh tokens are not currently implemented

## Error Handling

The API returns standard HTTP status codes and JSON error responses.

### Error Response Format
```json
{
  "error": "Error message",
  "message": "Detailed error description",
  "status_code": 400
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Unprocessable Entity
- `500` - Internal Server Error

## Rate Limiting

Currently, no rate limiting is implemented. This will be added in future versions.

## Endpoints

### Authentication Endpoints

#### Register User
Creates a new user account.

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "first_name": "string",
  "last_name": "string"
}
```

**Response** (201):
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "is_admin": false,
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

**Errors**:
- `400` - Invalid input data
- `422` - Email or username already exists

#### Login User
Authenticates a user and returns a JWT token.

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

**Response** (200):
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "is_admin": false
  }
}
```

**Errors**:
- `401` - Invalid email or password

#### Get Current User
Returns information about the currently authenticated user.

**Endpoint**: `GET /auth/me`

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "is_admin": false,
    "created_at": "2025-01-01T00:00:00Z",
    "last_login": "2025-01-01T12:00:00Z"
  }
}
```

**Errors**:
- `401` - Invalid or expired token

### User Endpoints

#### Get User Dashboard
Returns dashboard data for the authenticated user.

**Endpoint**: `GET /users/dashboard`

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "enrolled_courses": [
    {
      "id": 1,
      "title": "Web Development Mastery",
      "description": "Learn modern web development",
      "thumbnail": "/assets/thumbnails/web_development.png",
      "progress": 45.5,
      "total_stages": 10,
      "completed_stages": 4,
      "last_accessed": "2025-01-01T12:00:00Z"
    }
  ],
  "recent_activity": [
    {
      "type": "video_completed",
      "course_title": "Web Development Mastery",
      "stage_title": "Introduction to React",
      "timestamp": "2025-01-01T11:30:00Z"
    }
  ],
  "statistics": {
    "total_courses": 3,
    "completed_courses": 1,
    "total_hours": 24.5,
    "certificates_earned": 1
  }
}
```

#### Update User Profile
Updates the authenticated user's profile information.

**Endpoint**: `PUT /users/profile`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string"
}
```

**Response** (200):
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "newemail@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

### Course Endpoints

#### Get All Courses
Returns a list of all available courses.

**Endpoint**: `GET /courses`

**Query Parameters**:
- `category` (optional): Filter by course category
- `difficulty` (optional): Filter by difficulty level
- `limit` (optional): Number of courses to return (default: 50)
- `offset` (optional): Number of courses to skip (default: 0)

**Response** (200):
```json
{
  "courses": [
    {
      "id": 1,
      "title": "Web Development Mastery",
      "description": "Learn modern web development with React, Node.js, and more",
      "category": "Development",
      "difficulty": "Beginner",
      "duration": "12 weeks",
      "thumbnail": "/assets/thumbnails/web_development.png",
      "instructor": "Mike Johnson",
      "rating": 4.9,
      "students_count": 2847,
      "total_stages": 10,
      "created_at": "2025-01-01T00:00:00Z"
    }
  ],
  "total": 9,
  "limit": 50,
  "offset": 0
}
```

#### Get Course Details
Returns detailed information about a specific course.

**Endpoint**: `GET /courses/{course_id}`

**Response** (200):
```json
{
  "course": {
    "id": 1,
    "title": "Web Development Mastery",
    "description": "Learn modern web development with React, Node.js, and more",
    "category": "Development",
    "difficulty": "Beginner",
    "duration": "12 weeks",
    "thumbnail": "/assets/thumbnails/web_development.png",
    "instructor": "Mike Johnson",
    "rating": 4.9,
    "students_count": 2847,
    "stages": [
      {
        "id": 1,
        "title": "Introduction to Web Development",
        "description": "Overview of web development concepts",
        "order": 1,
        "videos": [
          {
            "id": 1,
            "title": "What is Web Development?",
            "youtube_id": "dQw4w9WgXcQ",
            "duration": 600,
            "order": 1
          }
        ]
      }
    ]
  }
}
```

**Errors**:
- `404` - Course not found

#### Enroll in Course
Enrolls the authenticated user in a course.

**Endpoint**: `POST /courses/{course_id}/enroll`

**Headers**: `Authorization: Bearer <token>`

**Response** (201):
```json
{
  "message": "Successfully enrolled in course",
  "enrollment": {
    "course_id": 1,
    "user_id": 1,
    "enrolled_at": "2025-01-01T12:00:00Z",
    "progress": 0
  }
}
```

**Errors**:
- `400` - Already enrolled in course
- `404` - Course not found

### Progress Endpoints

#### Get Course Progress
Returns progress information for a specific course.

**Endpoint**: `GET /courses/{course_id}/progress`

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "course_progress": {
    "course_id": 1,
    "user_id": 1,
    "progress_percentage": 45.5,
    "completed_stages": 4,
    "total_stages": 10,
    "last_accessed": "2025-01-01T12:00:00Z",
    "stage_progress": [
      {
        "stage_id": 1,
        "completed": true,
        "progress_percentage": 100,
        "completed_videos": 3,
        "total_videos": 3,
        "video_progress": [
          {
            "video_id": 1,
            "completed": true,
            "watch_time": 600,
            "total_duration": 600
          }
        ]
      }
    ]
  }
}
```

#### Update Video Progress
Updates progress for a specific video.

**Endpoint**: `PUT /courses/{course_id}/stages/{stage_id}/videos/{video_id}/progress`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "watch_time": 300,
  "completed": false
}
```

**Response** (200):
```json
{
  "message": "Progress updated successfully",
  "video_progress": {
    "video_id": 1,
    "watch_time": 300,
    "completed": false,
    "last_watched": "2025-01-01T12:00:00Z"
  }
}
```

### Admin Endpoints

All admin endpoints require admin privileges (`is_admin: true`).

#### Get All Users
Returns a list of all users (admin only).

**Endpoint**: `GET /admin/users`

**Headers**: `Authorization: Bearer <admin_token>`

**Query Parameters**:
- `limit` (optional): Number of users to return (default: 50)
- `offset` (optional): Number of users to skip (default: 0)
- `search` (optional): Search by username or email

**Response** (200):
```json
{
  "users": [
    {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "is_admin": false,
      "is_active": true,
      "created_at": "2025-01-01T00:00:00Z",
      "last_login": "2025-01-01T12:00:00Z",
      "enrolled_courses_count": 3,
      "completed_courses_count": 1
    }
  ],
  "total": 150,
  "limit": 50,
  "offset": 0
}
```

#### Get System Analytics
Returns system-wide analytics (admin only).

**Endpoint**: `GET /admin/analytics`

**Headers**: `Authorization: Bearer <admin_token>`

**Response** (200):
```json
{
  "analytics": {
    "total_users": 150,
    "active_users": 120,
    "total_courses": 9,
    "total_enrollments": 450,
    "completion_rate": 78.5,
    "popular_courses": [
      {
        "course_id": 1,
        "title": "Web Development Mastery",
        "enrollments": 89,
        "completion_rate": 82.0
      }
    ],
    "user_activity": {
      "daily_active_users": 45,
      "weekly_active_users": 98,
      "monthly_active_users": 120
    },
    "revenue": {
      "total": 0,
      "monthly": 0
    }
  }
}
```

#### Update User
Updates a user's information (admin only).

**Endpoint**: `PUT /admin/users/{user_id}`

**Headers**: `Authorization: Bearer <admin_token>`

**Request Body**:
```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "is_admin": false,
  "is_active": true
}
```

**Response** (200):
```json
{
  "message": "User updated successfully",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "is_admin": false,
    "is_active": true
  }
}
```

#### Delete User
Deletes a user account (admin only).

**Endpoint**: `DELETE /admin/users/{user_id}`

**Headers**: `Authorization: Bearer <admin_token>`

**Response** (200):
```json
{
  "message": "User deleted successfully"
}
```

**Errors**:
- `403` - Cannot delete admin users
- `404` - User not found

## Data Models

### User Model
```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "password_hash": "string (not returned in responses)",
  "first_name": "string",
  "last_name": "string",
  "is_admin": "boolean",
  "is_active": "boolean",
  "created_at": "datetime",
  "last_login": "datetime"
}
```

### Course Model
```json
{
  "id": "integer",
  "title": "string",
  "description": "text",
  "category": "string",
  "difficulty": "string",
  "duration": "string",
  "thumbnail": "string",
  "instructor": "string",
  "rating": "float",
  "students_count": "integer",
  "created_at": "datetime"
}
```

### Stage Model
```json
{
  "id": "integer",
  "course_id": "integer",
  "title": "string",
  "description": "text",
  "order": "integer"
}
```

### Video Model
```json
{
  "id": "integer",
  "stage_id": "integer",
  "title": "string",
  "youtube_id": "string",
  "duration": "integer (seconds)",
  "order": "integer"
}
```

### Progress Models

#### User Course Progress
```json
{
  "id": "integer",
  "user_id": "integer",
  "course_id": "integer",
  "progress_percentage": "float",
  "enrolled_at": "datetime",
  "completed_at": "datetime (nullable)",
  "last_accessed": "datetime"
}
```

#### User Stage Progress
```json
{
  "id": "integer",
  "user_id": "integer",
  "stage_id": "integer",
  "completed": "boolean",
  "completed_at": "datetime (nullable)"
}
```

#### User Video Progress
```json
{
  "id": "integer",
  "user_id": "integer",
  "video_id": "integer",
  "watch_time": "integer (seconds)",
  "completed": "boolean",
  "last_watched": "datetime"
}
```

## Examples

### Authentication Flow

1. **Register a new user**:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

2. **Login**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

3. **Use the token for authenticated requests**:
```bash
curl -X GET http://localhost:5000/api/users/dashboard \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
```

### Course Enrollment Flow

1. **Get available courses**:
```bash
curl -X GET http://localhost:5000/api/courses
```

2. **Get course details**:
```bash
curl -X GET http://localhost:5000/api/courses/1
```

3. **Enroll in course**:
```bash
curl -X POST http://localhost:5000/api/courses/1/enroll \
  -H "Authorization: Bearer <token>"
```

4. **Track progress**:
```bash
curl -X PUT http://localhost:5000/api/courses/1/stages/1/videos/1/progress \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "watch_time": 300,
    "completed": false
  }'
```

### Admin Operations

1. **Get all users** (admin only):
```bash
curl -X GET http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer <admin_token>"
```

2. **Get analytics** (admin only):
```bash
curl -X GET http://localhost:5000/api/admin/analytics \
  -H "Authorization: Bearer <admin_token>"
```

## Error Examples

### Validation Error (400)
```json
{
  "error": "Validation failed",
  "message": "Email is required",
  "status_code": 400
}
```

### Authentication Error (401)
```json
{
  "error": "Authentication failed",
  "message": "Invalid or expired token",
  "status_code": 401
}
```

### Authorization Error (403)
```json
{
  "error": "Access denied",
  "message": "Admin privileges required",
  "status_code": 403
}
```

### Not Found Error (404)
```json
{
  "error": "Resource not found",
  "message": "Course with id 999 not found",
  "status_code": 404
}
```

---

For additional information or support, refer to the main [README.md](../README.md) or create an issue on GitHub.

