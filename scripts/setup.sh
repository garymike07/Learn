#!/bin/bash

# Mike Learning App - Local Development Setup Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Setting up Mike Learning App for local development${NC}"

# Check if Node.js is installed
check_nodejs() {
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js is not installed${NC}"
        echo "Please install Node.js from https://nodejs.org/"
        exit 1
    fi
    echo -e "${GREEN}✅ Node.js is installed: $(node --version)${NC}"
}

# Check if Python is installed
check_python() {
    if ! command -v python3 &> /dev/null; then
        echo -e "${RED}❌ Python 3 is not installed${NC}"
        echo "Please install Python 3 from https://python.org/"
        exit 1
    fi
    echo -e "${GREEN}✅ Python is installed: $(python3 --version)${NC}"
}

# Setup frontend
setup_frontend() {
    echo -e "${YELLOW}📦 Setting up frontend...${NC}"
    
    cd frontend
    
    # Install dependencies
    echo "Installing frontend dependencies..."
    npm install
    
    # Create .env file if it doesn't exist
    if [ ! -f .env ]; then
        echo "Creating frontend .env file..."
        cat > .env << EOF
VITE_API_URL=http://localhost:5000
EOF
    fi
    
    echo -e "${GREEN}✅ Frontend setup completed${NC}"
    cd ..
}

# Setup backend
setup_backend() {
    echo -e "${YELLOW}🐍 Setting up backend...${NC}"
    
    cd backend
    
    # Create virtual environment
    if [ ! -d "venv" ]; then
        echo "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install dependencies
    echo "Installing backend dependencies..."
    pip install -r requirements.txt
    
    # Create .env file if it doesn't exist
    if [ ! -f .env ]; then
        echo "Creating backend .env file..."
        cat > .env << EOF
SECRET_KEY=dev-secret-key-change-in-production
JWT_SECRET_KEY=dev-jwt-secret-change-in-production
DATABASE_URL=sqlite:///app.db
FLASK_ENV=development
EOF
    fi
    
    echo -e "${GREEN}✅ Backend setup completed${NC}"
    cd ..
}

# Create start scripts
create_start_scripts() {
    echo -e "${YELLOW}📝 Creating start scripts...${NC}"
    
    # Frontend start script
    cat > scripts/start-frontend.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting frontend development server..."
cd frontend
npm run dev
EOF
    
    # Backend start script
    cat > scripts/start-backend.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting backend development server..."
cd backend
source venv/bin/activate
python src/main.py
EOF
    
    # Combined start script
    cat > scripts/start-dev.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Mike Learning App in development mode..."

# Function to kill background processes on exit
cleanup() {
    echo "Stopping development servers..."
    kill $(jobs -p) 2>/dev/null
    exit
}

# Set up trap to call cleanup function on script exit
trap cleanup SIGINT SIGTERM

# Start backend in background
echo "Starting backend..."
cd backend
source venv/bin/activate
python src/main.py &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend in background
echo "Starting frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Development servers started!"
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:5000"
echo "Press Ctrl+C to stop both servers"

# Wait for background processes
wait
EOF
    
    # Make scripts executable
    chmod +x scripts/*.sh
    
    echo -e "${GREEN}✅ Start scripts created${NC}"
}

# Main setup function
main() {
    echo -e "${BLUE}🎯 Mike Learning App Local Setup${NC}"
    echo "=================================="
    
    # Create scripts directory
    mkdir -p scripts
    
    check_nodejs
    check_python
    setup_frontend
    setup_backend
    create_start_scripts
    
    echo ""
    echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}📝 Next steps:${NC}"
    echo "1. Start the development servers:"
    echo "   ./scripts/start-dev.sh"
    echo ""
    echo "2. Or start them separately:"
    echo "   ./scripts/start-backend.sh"
    echo "   ./scripts/start-frontend.sh"
    echo ""
    echo "3. Open your browser and go to:"
    echo "   Frontend: http://localhost:5173"
    echo "   Backend API: http://localhost:5000"
    echo ""
    echo -e "${BLUE}📚 For deployment instructions, see README.md${NC}"
}

# Run main function
main "$@"

