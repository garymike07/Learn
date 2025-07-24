# Mike Learning App

A complete dark-themed learning management system built with React, Node.js, and Flask. Features 9 comprehensive courses, user authentication, progress tracking, admin panel, and automated deployment capabilities.

![Mike Learning App](./docs/images/hero-screenshot.png)

## 🌟 Features

### Core Learning Platform
- **9 Professional Courses**: Web Development, Trading, Blockchain/Web3, Marketing, Online Writing, Transcription, Customer Service, and AI
- **Udemy-Style Learning**: Sequential stages with curated YouTube video content
- **Progress Tracking**: Comprehensive progress monitoring with animated progress bars
- **Video Integration**: Embedded YouTube videos with manual curation system

### User Management
- **Authentication System**: Secure user registration and login
- **User Dashboard**: Personal learning dashboard with enrolled courses
- **Progress Analytics**: Detailed progress tracking and completion statistics
- **Admin Panel**: Complete user management and analytics for administrators

### Technical Features
- **Dark Theme**: Modern, professional dark theme throughout
- **Responsive Design**: Mobile-first design with touch support
- **Modern Stack**: React/Next.js frontend with Flask backend
- **Database**: SQLAlchemy with SQLite for development, PostgreSQL for production
- **Deployment Ready**: Automated deployment scripts for GitHub and Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.11+
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/garymike07/Learn.git
   cd Learn
   ```

2. **Run the setup script**
   ```bash
   ./scripts/setup.sh
   ```

3. **Start the development servers**
   ```bash
   ./scripts/start-dev.sh
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Demo Credentials
- **Admin**: admin@mikelearning.com / admin123
- **User**: user@mikelearning.com / user123

## 📁 Project Structure

```
mike-learning-app/
├── frontend/                 # React/Vite frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts (Auth, etc.)
│   │   ├── services/       # API services
│   │   └── assets/         # Images, thumbnails, logos
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.js      # Vite configuration
│   ├── vercel.json         # Vercel deployment config
│   └── Dockerfile          # Docker configuration
├── backend/                 # Flask backend API
│   ├── src/
│   │   ├── models/         # Database models
│   │   ├── routes/         # API route handlers
│   │   └── database/       # Database files
│   ├── requirements.txt    # Python dependencies
│   ├── Procfile           # Heroku deployment config
│   ├── runtime.txt        # Python runtime version
│   └── Dockerfile         # Docker configuration
├── scripts/                # Development and deployment scripts
│   ├── setup.sh           # Local development setup
│   ├── start-dev.sh       # Start both servers
│   ├── start-frontend.sh  # Start frontend only
│   └── start-backend.sh   # Start backend only
├── docs/                   # Documentation
├── deploy.sh              # Automated deployment script
├── docker-compose.yml     # Docker Compose configuration
├── .env.example          # Environment variables template
└── README.md             # This file
```

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests

### Backend
- **Flask**: Lightweight Python web framework
- **SQLAlchemy**: SQL toolkit and ORM
- **Flask-JWT-Extended**: JWT authentication
- **Flask-CORS**: Cross-origin resource sharing
- **Werkzeug**: Password hashing and security

### Database
- **SQLite**: Development database
- **PostgreSQL**: Production database (recommended)

### Deployment
- **Vercel**: Frontend hosting and deployment
- **Heroku/Railway**: Backend hosting options
- **Docker**: Containerization support
- **GitHub Actions**: CI/CD pipeline (optional)

## 📚 Course Structure

The platform includes 9 comprehensive courses:

1. **Web Development Mastery** - Full-stack web development
2. **Trading & Finance** - Financial markets and trading strategies  
3. **Blockchain & Web3** - Cryptocurrency and blockchain technology
4. **Digital Marketing** - Online marketing and growth strategies
5. **Online Writing** - Content creation and copywriting
6. **Transcription Services** - Audio/video transcription skills
7. **Customer Service Excellence** - Customer support best practices
8. **AI & Machine Learning** - Artificial intelligence fundamentals
9. **Career Guidance** - Professional development and career planning

Each course features:
- Multiple learning stages
- 2-3 curated YouTube videos per stage
- Progress tracking
- Completion certificates (planned feature)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
# GitHub Integration
GITHUB_TOKEN=your_github_personal_access_token

# Vercel Deployment  
VERCEL_TOKEN=your_vercel_api_token

# Backend Configuration
SECRET_KEY=your_secret_key_here
JWT_SECRET_KEY=your_jwt_secret_key_here
DATABASE_URL=sqlite:///app.db

# Frontend Configuration
VITE_API_URL=http://localhost:5000
```

### Frontend Configuration

The frontend uses Vite for building and development. Key configuration files:

- `vite.config.js`: Vite configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `vercel.json`: Vercel deployment settings

### Backend Configuration

The Flask backend configuration is handled in `src/main.py`:

- Database connection
- JWT settings
- CORS configuration
- Route registration

## 🚀 Deployment

### Automated Deployment

Use the provided deployment script for automated deployment:

```bash
# Set environment variables
export GITHUB_TOKEN=your_token
export VERCEL_TOKEN=your_token

# Run deployment
./deploy.sh
```

### Manual Deployment

#### Frontend (Vercel)

1. Install Vercel CLI: `npm install -g vercel`
2. Login: `vercel login`
3. Deploy: `cd frontend && vercel --prod`

#### Backend (Heroku)

1. Install Heroku CLI
2. Create Heroku app: `heroku create your-app-name`
3. Deploy: `git subtree push --prefix backend heroku main`

### Docker Deployment

Use Docker Compose for containerized deployment:

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Werkzeug password hashing
- **CORS Protection**: Configured cross-origin resource sharing
- **Input Validation**: Server-side input validation
- **Environment Variables**: Sensitive data stored in environment variables

## 📊 API Documentation

### Authentication Endpoints

```
POST /api/auth/register - User registration
POST /api/auth/login - User login
POST /api/auth/logout - User logout
GET /api/auth/me - Get current user
```

### Course Endpoints

```
GET /api/courses - Get all courses
GET /api/courses/:id - Get specific course
POST /api/courses/:id/enroll - Enroll in course
GET /api/courses/:id/progress - Get course progress
```

### User Endpoints

```
GET /api/users/dashboard - Get user dashboard data
PUT /api/users/profile - Update user profile
GET /api/users/progress - Get user progress
```

### Admin Endpoints

```
GET /api/admin/users - Get all users (admin only)
GET /api/admin/analytics - Get system analytics (admin only)
PUT /api/admin/users/:id - Update user (admin only)
DELETE /api/admin/users/:id - Delete user (admin only)
```

## 🧪 Testing

### Frontend Testing

```bash
cd frontend
npm run test
```

### Backend Testing

```bash
cd backend
source venv/bin/activate
python -m pytest
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Email: support@mikelearning.com
- Documentation: [docs/](./docs/)

## 🗺️ Roadmap

### Upcoming Features
- [ ] Course completion certificates
- [ ] Discussion forums
- [ ] Live streaming capabilities
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Payment integration
- [ ] Multi-language support

### Version History
- **v1.0.0** - Initial release with core features
- **v1.1.0** - Admin panel and analytics (planned)
- **v1.2.0** - Advanced course features (planned)

---

**Built with ❤️ by the Mike Learning Team**





<!-- Triggering Vercel deployment -->


