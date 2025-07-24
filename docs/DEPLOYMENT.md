# Deployment Guide

This guide provides detailed instructions for deploying the Mike Learning App to various platforms and environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Automated Deployment](#automated-deployment)
4. [Manual Deployment](#manual-deployment)
5. [Platform-Specific Guides](#platform-specific-guides)
6. [Docker Deployment](#docker-deployment)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying the Mike Learning App, ensure you have:

### Required Accounts
- GitHub account with repository access
- Vercel account for frontend hosting
- Heroku, Railway, or similar service for backend hosting

### Required Tools
- Git (latest version)
- Node.js 18 or higher
- Python 3.11 or higher
- npm or yarn package manager

### Required Tokens
- GitHub Personal Access Token with repository permissions
- Vercel API Token
- Backend hosting service credentials

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/garymike07/Learn.git
cd Learn
```

### 2. Configure Environment Variables

Copy the example environment file and configure your values:

```bash
cp .env.example .env
```

Edit the `.env` file with your actual values:

```bash
# GitHub Integration
GITHUB_TOKEN=ghp_your_github_token_here

# Vercel Deployment
VERCEL_TOKEN=your_vercel_token_here

# Backend Configuration
SECRET_KEY=your_super_secret_key_here
JWT_SECRET_KEY=your_jwt_secret_key_here
DATABASE_URL=sqlite:///app.db

# Frontend Configuration
VITE_API_URL=http://localhost:5000

# Production URLs (update after deployment)
PRODUCTION_FRONTEND_URL=https://your-app.vercel.app
PRODUCTION_BACKEND_URL=https://your-backend.herokuapp.com
```

### 3. Install Dependencies

Run the setup script to install all dependencies:

```bash
./scripts/setup.sh
```

## Automated Deployment

The Mike Learning App includes an automated deployment script that handles the entire deployment process.

### 1. Set Environment Variables

Export your tokens as environment variables:

```bash
export GITHUB_TOKEN=your_github_token
export VERCEL_TOKEN=your_vercel_token
```

### 2. Run Deployment Script

Execute the automated deployment script:

```bash
./deploy.sh
```

The script will:
- Build the frontend application
- Prepare the backend for deployment
- Initialize Git repository if needed
- Create deployment configuration files
- Deploy to GitHub
- Deploy frontend to Vercel
- Provide deployment URLs and next steps

### 3. Post-Deployment Configuration

After automated deployment:

1. **Update Backend URL**: Update the `VITE_API_URL` in your Vercel environment variables
2. **Deploy Backend**: Deploy your backend to Heroku, Railway, or your preferred service
3. **Update CORS Settings**: Ensure your backend allows requests from your Vercel domain
4. **Test Application**: Verify all functionality works in production

## Manual Deployment

If you prefer manual deployment or need more control over the process:

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy Frontend**
   ```bash
   cd frontend
   vercel --prod
   ```

4. **Configure Environment Variables**
   In the Vercel dashboard, add:
   - `VITE_API_URL`: Your backend URL

### Backend Deployment (Heroku)

1. **Install Heroku CLI**
   Download from [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set SECRET_KEY=your_secret_key
   heroku config:set JWT_SECRET_KEY=your_jwt_secret
   heroku config:set DATABASE_URL=your_database_url
   ```

5. **Deploy Backend**
   ```bash
   git subtree push --prefix backend heroku main
   ```

## Platform-Specific Guides

### Vercel Deployment

Vercel is the recommended platform for frontend deployment due to its excellent React support and global CDN.

#### Configuration

The `frontend/vercel.json` file contains the deployment configuration:

```json
{
  "version": 2,
  "name": "mike-learning-app",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_API_URL": "@api_url"
  }
}
```

#### Environment Variables

Set these in your Vercel dashboard:
- `VITE_API_URL`: Your backend API URL

#### Custom Domain

To use a custom domain:
1. Go to your Vercel project dashboard
2. Navigate to Settings > Domains
3. Add your custom domain
4. Configure DNS records as instructed

### Heroku Deployment

Heroku provides a simple platform for backend deployment with automatic scaling.

#### Configuration Files

The backend includes Heroku-specific configuration:

- `Procfile`: Defines the web process
- `requirements.txt`: Python dependencies
- `runtime.txt`: Python version specification

#### Database Setup

For production, use PostgreSQL:

1. **Add PostgreSQL Add-on**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

2. **Update Database Configuration**
   The `DATABASE_URL` environment variable is automatically set by Heroku.

#### Scaling

Scale your application as needed:
```bash
heroku ps:scale web=1
```

### Railway Deployment

Railway is an alternative to Heroku with similar simplicity:

1. **Connect GitHub Repository**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub account
   - Select your repository

2. **Configure Build Settings**
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `gunicorn src.main:app`

3. **Set Environment Variables**
   Add the same environment variables as Heroku

### DigitalOcean App Platform

For more control and potentially lower costs:

1. **Create App**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository

2. **Configure Services**
   - Frontend: Static site from `frontend/` directory
   - Backend: Web service from `backend/` directory

3. **Set Environment Variables**
   Configure the same variables as other platforms

## Docker Deployment

For containerized deployment, use the provided Docker configuration.

### Development Environment

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Environment

1. **Create Production Docker Compose**
   ```yaml
   version: '3.8'
   
   services:
     frontend:
       build: ./frontend
       ports:
         - "80:3000"
       environment:
         - VITE_API_URL=https://your-backend-url.com
   
     backend:
       build: ./backend
       ports:
         - "5000:5000"
       environment:
         - FLASK_ENV=production
         - SECRET_KEY=${SECRET_KEY}
         - JWT_SECRET_KEY=${JWT_SECRET_KEY}
         - DATABASE_URL=${DATABASE_URL}
   ```

2. **Deploy to Container Platform**
   - AWS ECS
   - Google Cloud Run
   - Azure Container Instances
   - DigitalOcean Container Registry

### Kubernetes Deployment

For large-scale deployments, use Kubernetes:

1. **Create Kubernetes Manifests**
   ```yaml
   # frontend-deployment.yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: frontend
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: frontend
     template:
       metadata:
         labels:
           app: frontend
       spec:
         containers:
         - name: frontend
           image: your-registry/mike-learning-frontend:latest
           ports:
           - containerPort: 3000
   ```

2. **Apply Manifests**
   ```bash
   kubectl apply -f k8s/
   ```

## Troubleshooting

### Common Issues

#### CORS Errors
**Problem**: Frontend cannot connect to backend
**Solution**: 
1. Ensure backend CORS is configured for your frontend domain
2. Update `CORS(app, origins=['your-frontend-url'])` in `backend/src/main.py`

#### Environment Variables Not Loading
**Problem**: Application cannot access environment variables
**Solution**:
1. Verify `.env` file exists and has correct format
2. Check platform-specific environment variable configuration
3. Ensure variables are properly exported in deployment scripts

#### Build Failures
**Problem**: Frontend or backend build fails during deployment
**Solution**:
1. Check Node.js and Python versions match requirements
2. Verify all dependencies are listed in `package.json` and `requirements.txt`
3. Review build logs for specific error messages

#### Database Connection Issues
**Problem**: Backend cannot connect to database
**Solution**:
1. Verify `DATABASE_URL` is correctly set
2. Ensure database service is running
3. Check database credentials and permissions

### Debugging Steps

1. **Check Logs**
   ```bash
   # Vercel logs
   vercel logs
   
   # Heroku logs
   heroku logs --tail
   
   # Docker logs
   docker-compose logs -f
   ```

2. **Test API Endpoints**
   ```bash
   # Health check
   curl https://your-backend-url.com/api/health
   
   # Test authentication
   curl -X POST https://your-backend-url.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@mikelearning.com","password":"admin123"}'
   ```

3. **Verify Environment Variables**
   ```bash
   # Check if variables are set
   echo $GITHUB_TOKEN
   echo $VERCEL_TOKEN
   
   # In application
   console.log(import.meta.env.VITE_API_URL) // Frontend
   print(os.environ.get('SECRET_KEY')) // Backend
   ```

### Performance Optimization

#### Frontend Optimization
- Enable Vercel's Edge Network
- Implement code splitting
- Optimize images and assets
- Use service workers for caching

#### Backend Optimization
- Use database connection pooling
- Implement Redis for caching
- Enable gzip compression
- Use CDN for static assets

#### Database Optimization
- Add database indexes
- Implement query optimization
- Use database connection pooling
- Consider read replicas for scaling

## Security Considerations

### Production Security Checklist

- [ ] Change default secret keys
- [ ] Use HTTPS for all communications
- [ ] Implement rate limiting
- [ ] Enable CORS only for trusted domains
- [ ] Use environment variables for sensitive data
- [ ] Implement proper error handling
- [ ] Enable security headers
- [ ] Regular security updates

### Environment Variables Security

Never commit sensitive information to version control:
- Use `.env` files for local development
- Use platform environment variables for production
- Rotate keys regularly
- Use different keys for different environments

## Monitoring and Maintenance

### Health Monitoring

Implement health checks for both frontend and backend:

```bash
# Backend health check
GET /api/health

# Frontend health check
GET /health
```

### Log Monitoring

Set up log aggregation and monitoring:
- Use platform-specific logging (Vercel Analytics, Heroku Logs)
- Implement structured logging
- Set up alerts for errors
- Monitor performance metrics

### Backup Strategy

Implement regular backups:
- Database backups (automated)
- Code repository backups
- Environment configuration backups
- User data backups

---

For additional support, refer to the main [README.md](../README.md) or create an issue on GitHub.

