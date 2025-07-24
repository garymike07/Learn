import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta

from src.models.user import db
from src.models.course import Course, CourseStage, StageVideo
from src.models.progress import UserCourseProgress, UserStageProgress, UserVideoProgress

from src.routes.user import user_bp
from src.routes.auth import auth_bp
from src.routes.courses import courses_bp
from src.routes.admin import admin_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'asdf#FGSgvasgf$5$WGT')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)

# Enable CORS for all routes
CORS(app, origins=['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'], supports_credentials=True)

# Initialize JWT
jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(courses_bp, url_prefix='/api')
app.register_blueprint(admin_bp, url_prefix='/api')

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Create all database tables and seed data
with app.app_context():
    db.create_all()
    print("Database tables created successfully!")
    
    # Seed courses if they don't exist
    if Course.query.count() == 0:
        print("Seeding courses...")
        
        courses_data = [
            {
                'title': 'Web Development Mastery',
                'description': 'Learn modern web development with React, Node.js, and database integration',
                'category': 'Development',
                'difficulty': 'Beginner',
                'duration_weeks': 12,
                'thumbnail_url': '/src/assets/thumbnails/web_development.png',
                'instructor': 'Mike Johnson',
                'average_rating': 4.9,
                'enrolled_students': 2847,
                'is_featured': True,
                'stages': [
                    {
                        'title': 'Introduction to Web Development',
                        'description': 'Get started with the basics of web development',
                        'duration_hours': 2,
                        'order_index': 1,
                        'videos': [
                            {'title': 'What is Web Development?', 'duration_minutes': 15, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 1},
                            {'title': 'Setting Up Your Environment', 'duration_minutes': 22, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 2},
                            {'title': 'Your First HTML Page', 'duration_minutes': 18, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 3}
                        ]
                    },
                    {
                        'title': 'HTML Fundamentals',
                        'description': 'Master HTML structure and semantic elements',
                        'duration_hours': 3,
                        'order_index': 2,
                        'videos': [
                            {'title': 'HTML Structure and Tags', 'duration_minutes': 25, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 1},
                            {'title': 'Forms and Input Elements', 'duration_minutes': 30, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 2},
                            {'title': 'Semantic HTML', 'duration_minutes': 20, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 3}
                        ]
                    }
                ]
            },
            {
                'title': 'Blog Development',
                'description': 'Create engaging blogs with modern CMS and content strategies',
                'category': 'Development',
                'difficulty': 'Beginner',
                'duration_weeks': 6,
                'thumbnail_url': '/src/assets/thumbnails/blog_development.png',
                'instructor': 'Sarah Wilson',
                'average_rating': 4.7,
                'enrolled_students': 1523,
                'is_featured': False,
                'stages': [
                    {
                        'title': 'Blog Basics',
                        'description': 'Understanding blog fundamentals',
                        'duration_hours': 2,
                        'order_index': 1,
                        'videos': [
                            {'title': 'What Makes a Great Blog?', 'duration_minutes': 20, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 1},
                            {'title': 'Choosing Your Niche', 'duration_minutes': 25, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 2}
                        ]
                    }
                ]
            },
            {
                'title': 'Trading & Finance',
                'description': 'Master trading strategies, technical analysis, and risk management',
                'category': 'Finance',
                'difficulty': 'Intermediate',
                'duration_weeks': 8,
                'thumbnail_url': '/src/assets/thumbnails/trading.png',
                'instructor': 'David Chen',
                'average_rating': 4.8,
                'enrolled_students': 3421,
                'is_featured': True,
                'stages': [
                    {
                        'title': 'Trading Fundamentals',
                        'description': 'Learn the basics of trading',
                        'duration_hours': 3,
                        'order_index': 1,
                        'videos': [
                            {'title': 'Introduction to Trading', 'duration_minutes': 30, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 1},
                            {'title': 'Market Analysis', 'duration_minutes': 35, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 2}
                        ]
                    }
                ]
            },
            {
                'title': 'Blockchain & Web3',
                'description': 'Understand blockchain technology, smart contracts, and DeFi',
                'category': 'Technology',
                'difficulty': 'Advanced',
                'duration_weeks': 10,
                'thumbnail_url': '/src/assets/thumbnails/blockchain_web3.png',
                'instructor': 'Alex Rodriguez',
                'average_rating': 4.6,
                'enrolled_students': 1876,
                'is_featured': False,
                'stages': [
                    {
                        'title': 'Blockchain Basics',
                        'description': 'Understanding blockchain technology',
                        'duration_hours': 4,
                        'order_index': 1,
                        'videos': [
                            {'title': 'What is Blockchain?', 'duration_minutes': 25, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 1},
                            {'title': 'Cryptocurrency Fundamentals', 'duration_minutes': 30, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 2}
                        ]
                    }
                ]
            },
            {
                'title': 'Digital Marketing',
                'description': 'Learn SEO, social media marketing, and digital advertising strategies',
                'category': 'Marketing',
                'difficulty': 'Beginner',
                'duration_weeks': 8,
                'thumbnail_url': '/src/assets/thumbnails/marketing.png',
                'instructor': 'Emma Thompson',
                'average_rating': 4.8,
                'enrolled_students': 4123,
                'is_featured': True,
                'stages': [
                    {
                        'title': 'Marketing Fundamentals',
                        'description': 'Learn the basics of digital marketing',
                        'duration_hours': 3,
                        'order_index': 1,
                        'videos': [
                            {'title': 'Introduction to Digital Marketing', 'duration_minutes': 20, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 1},
                            {'title': 'Understanding Your Audience', 'duration_minutes': 25, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 2}
                        ]
                    }
                ]
            },
            {
                'title': 'Online Writing',
                'description': 'Master copywriting, content creation, and freelance writing skills',
                'category': 'Writing',
                'difficulty': 'Beginner',
                'duration_weeks': 6,
                'thumbnail_url': '/src/assets/thumbnails/online_writing.png',
                'instructor': 'Lisa Garcia',
                'average_rating': 4.7,
                'enrolled_students': 2341,
                'is_featured': False,
                'stages': [
                    {
                        'title': 'Writing Fundamentals',
                        'description': 'Learn the basics of effective writing',
                        'duration_hours': 2,
                        'order_index': 1,
                        'videos': [
                            {'title': 'Writing for the Web', 'duration_minutes': 22, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 1},
                            {'title': 'Finding Your Voice', 'duration_minutes': 18, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 2}
                        ]
                    }
                ]
            },
            {
                'title': 'Transcription Services',
                'description': 'Learn professional transcription techniques and tools',
                'category': 'Services',
                'difficulty': 'Beginner',
                'duration_weeks': 4,
                'thumbnail_url': '/src/assets/thumbnails/transcription.png',
                'instructor': 'Mark Johnson',
                'average_rating': 4.5,
                'enrolled_students': 1654,
                'is_featured': False,
                'stages': [
                    {
                        'title': 'Transcription Basics',
                        'description': 'Learn the fundamentals of transcription',
                        'duration_hours': 2,
                        'order_index': 1,
                        'videos': [
                            {'title': 'Introduction to Transcription', 'duration_minutes': 15, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 1},
                            {'title': 'Tools and Software', 'duration_minutes': 20, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 2}
                        ]
                    }
                ]
            },
            {
                'title': 'Customer Service Excellence',
                'description': 'Develop exceptional customer service and communication skills',
                'category': 'Business',
                'difficulty': 'Beginner',
                'duration_weeks': 5,
                'thumbnail_url': '/src/assets/thumbnails/customer_service.png',
                'instructor': 'Jennifer Lee',
                'average_rating': 4.6,
                'enrolled_students': 2987,
                'is_featured': False,
                'stages': [
                    {
                        'title': 'Customer Service Fundamentals',
                        'description': 'Learn the basics of excellent customer service',
                        'duration_hours': 2,
                        'order_index': 1,
                        'videos': [
                            {'title': 'Understanding Customer Needs', 'duration_minutes': 18, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 1},
                            {'title': 'Communication Skills', 'duration_minutes': 22, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 2}
                        ]
                    }
                ]
            },
            {
                'title': 'AI & Machine Learning',
                'description': 'Master artificial intelligence, machine learning, and data science',
                'category': 'Technology',
                'difficulty': 'Advanced',
                'duration_weeks': 16,
                'thumbnail_url': '/src/assets/thumbnails/ai.png',
                'instructor': 'Dr. Sarah Chen',
                'average_rating': 4.9,
                'enrolled_students': 1923,
                'is_featured': True,
                'stages': [
                    {
                        'title': 'Introduction to AI',
                        'description': 'Understanding artificial intelligence fundamentals',
                        'duration_hours': 3,
                        'order_index': 1,
                        'videos': [
                            {'title': 'What is Artificial Intelligence?', 'duration_minutes': 20, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 1},
                            {'title': 'History of AI', 'duration_minutes': 25, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 2},
                            {'title': 'AI Applications Today', 'duration_minutes': 30, 'youtube_id': 'dQw4w9WgXcQ', 'order_index': 3}
                        ]
                    }
                ]
            }
        ]
        
        for course_data in courses_data:
            stages_data = course_data.pop('stages', [])
            course = Course(**course_data)
            db.session.add(course)
            db.session.flush()  # Get course ID
            
            for stage_data in stages_data:
                videos_data = stage_data.pop('videos', [])
                stage = CourseStage(course_id=course.id, **stage_data)
                db.session.add(stage)
                db.session.flush()  # Get stage ID
                
                for video_data in videos_data:
                    video = StageVideo(stage_id=stage.id, **video_data)
                    db.session.add(video)
        
        db.session.commit()
        print("Courses seeded successfully!")
    
    # Seed users if they don't exist
    from src.models.user import User
    if User.query.count() == 0:
        print("Seeding users...")
        
        # Create admin user
        admin_user = User(
            username='admin',
            first_name='Admin',
            last_name='User',
            email='admin@mikelearning.com',
            is_admin=True
        )
        admin_user.set_password('admin123')
        
        # Create demo user
        demo_user = User(
            username='demouser',
            first_name='Demo',
            last_name='User',
            email='user@mikelearning.com',
            is_admin=False
        )
        demo_user.set_password('user123')
        
        db.session.add(admin_user)
        db.session.add(demo_user)
        db.session.commit()
        print("Users seeded successfully!")

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Mike Learning API is running'}), 200

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
            return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
