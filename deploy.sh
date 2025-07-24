#!/bin/bash

# Mike Learning App - Automated Deployment Script
# This script automates the deployment process to GitHub and Vercel

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="Mike Learning App"
GITHUB_REPO="https://github.com/garymike07/Learn"
FRONTEND_DIR="frontend"
BACKEND_DIR="backend"

echo -e "${BLUE}🚀 Starting deployment for ${PROJECT_NAME}${NC}"

# Check if required environment variables are set
check_env_vars() {
    echo -e "${YELLOW}📋 Checking environment variables...${NC}"
    
    if [ -z "$GITHUB_TOKEN" ]; then
        echo -e "${RED}❌ GITHUB_TOKEN environment variable is not set${NC}"
        echo "Please set your GitHub token: export GITHUB_TOKEN=your_token_here"
        exit 1
    fi
    
    if [ -z "$VERCEL_TOKEN" ]; then
        echo -e "${RED}❌ VERCEL_TOKEN environment variable is not set${NC}"
        echo "Please set your Vercel token: export VERCEL_TOKEN=your_token_here"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Environment variables are set${NC}"
}

# Build frontend
build_frontend() {
    echo -e "${YELLOW}🔨 Building frontend...${NC}"
    
    cd $FRONTEND_DIR
    
    # Install dependencies
    echo "Installing frontend dependencies..."
    npm install
    
    # Build the project
    echo "Building frontend project..."
    npm run build
    
    echo -e "${GREEN}✅ Frontend build completed${NC}"
    cd ..
}

# Prepare backend for deployment
prepare_backend() {
    echo -e "${YELLOW}🔧 Preparing backend for deployment...${NC}"
    
    cd $BACKEND_DIR
    
    # Create requirements.txt if it doesn't exist
    if [ ! -f requirements.txt ]; then
        echo "Creating requirements.txt..."
        pip freeze > requirements.txt
    fi
    
    # Create Procfile for Heroku-style deployment
    if [ ! -f Procfile ]; then
        echo "Creating Procfile..."
        echo "web: gunicorn src.main:app" > Procfile
    fi
    
    # Create runtime.txt
    if [ ! -f runtime.txt ]; then
        echo "Creating runtime.txt..."
        echo "python-3.11.0" > runtime.txt
    fi
    
    echo -e "${GREEN}✅ Backend preparation completed${NC}"
    cd ..
}

# Initialize git repository if not exists
init_git() {
    echo -e "${YELLOW}📦 Initializing Git repository...${NC}"
    
    if [ ! -d ".git" ]; then
        git init
        echo -e "${GREEN}✅ Git repository initialized${NC}"
    else
        echo -e "${GREEN}✅ Git repository already exists${NC}"
    fi
    
    # Create .gitignore if it doesn't exist
    if [ ! -f .gitignore ]; then
        echo "Creating .gitignore..."
        cat > .gitignore << EOF
# Dependencies
node_modules/
*/node_modules/
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
env/
venv/
.venv/
pip-log.txt
pip-delete-this-directory.txt
.tox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
*.log
.git
.mypy_cache
.pytest_cache
.hypothesis

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
/frontend/dist/
/frontend/build/
/backend/src/database/app.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/
EOF
        echo -e "${GREEN}✅ .gitignore created${NC}"
    fi
}

# Commit and push to GitHub
deploy_to_github() {
    echo -e "${YELLOW}📤 Deploying to GitHub...${NC}"
    
    # Add all files
    git add .
    
    # Commit changes
    COMMIT_MESSAGE="Deploy Mike Learning App - $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$COMMIT_MESSAGE" || echo "No changes to commit"
    
    # Add remote if it doesn't exist
    if ! git remote get-url origin > /dev/null 2>&1; then
        git remote add origin $GITHUB_REPO
    fi
    
    # Push to GitHub
    echo "Pushing to GitHub..."
    git push -u origin main || git push -u origin master
    
    echo -e "${GREEN}✅ Successfully deployed to GitHub${NC}"
}

# Deploy to Vercel
deploy_to_vercel() {
    echo -e "${YELLOW}🌐 Deploying to Vercel...${NC}"
    
    # Install Vercel CLI if not installed
    if ! command -v vercel &> /dev/null; then
        echo "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Login to Vercel using token
    echo $VERCEL_TOKEN | vercel login --token
    
    # Deploy frontend to Vercel
    cd $FRONTEND_DIR
    vercel --prod --token $VERCEL_TOKEN --yes
    cd ..
    
    echo -e "${GREEN}✅ Successfully deployed to Vercel${NC}"
}

# Create deployment configuration files
create_config_files() {
    echo -e "${YELLOW}⚙️ Creating deployment configuration files...${NC}"
    
    # Create vercel.json for frontend
    cat > $FRONTEND_DIR/vercel.json << EOF
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
    "VITE_API_URL": "https://your-backend-url.herokuapp.com"
  }
}
EOF

    # Create package.json scripts for deployment
    cd $FRONTEND_DIR
    npm pkg set scripts.build="vite build"
    npm pkg set scripts.preview="vite preview"
    cd ..
    
    # Create Docker files for backend
    cat > $BACKEND_DIR/Dockerfile << EOF
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "src.main:app"]
EOF

    # Create docker-compose.yml for local development
    cat > docker-compose.yml << EOF
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://localhost:5000
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
      - DATABASE_URL=sqlite:///app.db
    volumes:
      - ./backend/src/database:/app/src/database
EOF

    echo -e "${GREEN}✅ Configuration files created${NC}"
}

# Main deployment function
main() {
    echo -e "${BLUE}🎯 Mike Learning App Deployment${NC}"
    echo "=================================="
    
    check_env_vars
    build_frontend
    prepare_backend
    init_git
    create_config_files
    deploy_to_github
    deploy_to_vercel
    
    echo ""
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
    echo -e "${BLUE}📱 Your app should now be live on Vercel${NC}"
    echo -e "${BLUE}📦 Code is available on GitHub: ${GITHUB_REPO}${NC}"
    echo ""
    echo -e "${YELLOW}📝 Next steps:${NC}"
    echo "1. Update the backend URL in vercel.json"
    echo "2. Deploy your backend to a service like Heroku or Railway"
    echo "3. Update environment variables in Vercel dashboard"
    echo "4. Test the deployed application"
}

# Run main function
main "$@"

