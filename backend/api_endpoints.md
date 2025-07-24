# Mike Learning App - API Endpoints

## Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info
- `PUT /api/auth/profile` - Update user profile

## Course Management Endpoints
- `GET /api/courses` - Get all active courses
- `GET /api/courses/{id}` - Get specific course details
- `POST /api/courses` - Create new course (admin only)
- `PUT /api/courses/{id}` - Update course (admin only)
- `DELETE /api/courses/{id}` - Delete course (admin only)

## Course Enrollment Endpoints
- `POST /api/courses/{id}/enroll` - Enroll in a course
- `GET /api/users/me/courses` - Get user's enrolled courses
- `GET /api/users/me/courses/{id}/progress` - Get user's progress in specific course

## Course Content Endpoints
- `GET /api/courses/{id}/stages` - Get all stages for a course
- `GET /api/stages/{id}` - Get specific stage details
- `GET /api/stages/{id}/videos` - Get all videos for a stage
- `POST /api/stages` - Create new stage (admin only)
- `PUT /api/stages/{id}` - Update stage (admin only)
- `DELETE /api/stages/{id}` - Delete stage (admin only)

## Video Management Endpoints
- `GET /api/videos/{id}` - Get specific video details
- `POST /api/videos` - Add new video to stage (admin only)
- `PUT /api/videos/{id}` - Update video (admin only)
- `DELETE /api/videos/{id}` - Delete video (admin only)

## Progress Tracking Endpoints
- `POST /api/progress/video/{id}/update` - Update video watch progress
- `POST /api/progress/stage/{id}/complete` - Mark stage as completed
- `POST /api/progress/course/{id}/complete` - Mark course as completed
- `GET /api/progress/dashboard` - Get user dashboard data

## Admin Endpoints
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/analytics` - Get platform analytics (admin only)
- `GET /api/admin/courses/stats` - Get course statistics (admin only)
- `PUT /api/admin/users/{id}` - Update user (admin only)
- `DELETE /api/admin/users/{id}` - Delete user (admin only)

## Search and Filter Endpoints
- `GET /api/search/courses?q={query}` - Search courses
- `GET /api/courses?category={category}` - Filter courses by category
- `GET /api/courses?difficulty={level}` - Filter courses by difficulty

## Career Guidance Endpoints
- `GET /api/career/paths` - Get career guidance content
- `GET /api/career/recommendations` - Get personalized recommendations based on user progress

