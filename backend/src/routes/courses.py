from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from src.models.user import User, db
from src.models.course import Course, CourseStage, StageVideo
from src.models.progress import UserCourseProgress, UserStageProgress, UserVideoProgress
from datetime import datetime

courses_bp = Blueprint('courses', __name__)

@courses_bp.route('/courses', methods=['GET'])
def get_courses():
    try:
        # Get query parameters
        category = request.args.get('category')
        difficulty = request.args.get('difficulty')
        featured = request.args.get('featured')
        search = request.args.get('search')
        
        # Build query
        query = Course.query.filter_by(is_active=True)
        
        if category and category != 'All':
            query = query.filter(Course.category == category)
        
        if difficulty and difficulty != 'All':
            query = query.filter(Course.difficulty == difficulty)
        
        if featured and featured.lower() == 'true':
            query = query.filter(Course.is_featured == True)
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                db.or_(
                    Course.title.ilike(search_term),
                    Course.description.ilike(search_term),
                    Course.instructor.ilike(search_term)
                )
            )
        
        courses = query.all()
        
        return jsonify({
            'courses': [course.to_dict() for course in courses]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@courses_bp.route('/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    try:
        course = Course.query.get(course_id)
        
        if not course or not course.is_active:
            return jsonify({'error': 'Course not found'}), 404
        
        # Check if user is authenticated (optional)
        user_id = None
        enrolled = False
        user_progress = None
        
        try:
            verify_jwt_in_request(optional=True)
            user_id = int(get_jwt_identity())
            if user_id:
                user_progress = UserCourseProgress.query.filter_by(
                    user_id=user_id,
                    course_id=course_id
                ).first()
                enrolled = user_progress is not None
        except:
            pass  # Not authenticated or token invalid
        
        # Get course data with stages and videos
        course_data = course.to_dict(include_stages=True)
        
        # If user is enrolled, add progress information
        if enrolled and user_progress:
            # Add user progress to each video
            for stage in course_data['stages']:
                for video in stage['videos']:
                    video_progress = UserVideoProgress.query.filter_by(
                        user_id=user_id,
                        video_id=video['id']
                    ).first()
                    
                    video['completed'] = video_progress.completed if video_progress else False
                    video['progress'] = video_progress.progress_percentage if video_progress else 0
                    video['last_watched'] = video_progress.last_watched.isoformat() if video_progress and video_progress.last_watched else None
        
        return jsonify({
            'course': course_data,
            'enrolled': enrolled,
            'progress': {
                'completion_percentage': user_progress.completion_percentage if user_progress else 0,
                'last_accessed': user_progress.last_accessed.isoformat() if user_progress and user_progress.last_accessed else None,
                'enrolled_at': user_progress.enrolled_at.isoformat() if user_progress else None
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@courses_bp.route('/courses/<int:course_id>/enroll', methods=['POST'])
@jwt_required()
def enroll_course(course_id):
    try:
        user_id = int(get_jwt_identity())
        
        # Check if course exists and is active
        course = Course.query.get(course_id)
        if not course or not course.is_active:
            return jsonify({'error': 'Course not found'}), 404
        
        # Check if already enrolled
        existing_progress = UserCourseProgress.query.filter_by(
            user_id=user_id,
            course_id=course_id
        ).first()
        
        if existing_progress:
            return jsonify({'error': 'Already enrolled in this course'}), 400
        
        # Create enrollment record
        user_progress = UserCourseProgress(
            user_id=user_id,
            course_id=course_id,
            completion_percentage=0,
            enrolled_at=datetime.utcnow()
        )
        db.session.add(user_progress)
        
        # Update course enrollment count
        course.enrolled_students += 1
        
        db.session.commit()
        
        return jsonify({'message': 'Successfully enrolled in course'}), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@courses_bp.route('/videos/<int:video_id>/progress', methods=['POST'])
@jwt_required()
def update_video_progress(video_id):
    try:
        user_id = int(get_jwt_identity())
        data = request.get_json()
        
        progress = min(100, max(0, data.get('progress', 0)))  # Clamp between 0-100
        completed = data.get('completed', False)
        
        # Get or create video progress
        video_progress = UserVideoProgress.query.filter_by(
            user_id=user_id,
            video_id=video_id
        ).first()
        
        if not video_progress:
            video_progress = UserVideoProgress(
                user_id=user_id,
                video_id=video_id,
                progress_percentage=progress,
                completed=completed,
                last_watched=datetime.utcnow()
            )
            db.session.add(video_progress)
        else:
            video_progress.progress_percentage = progress
            video_progress.completed = completed
            video_progress.last_watched = datetime.utcnow()
        
        db.session.commit()
        
        # Update course progress
        video = StageVideo.query.get(video_id)
        if video:
            course_id = video.stage.course_id
            _update_course_progress(user_id, course_id)
        
        return jsonify({'message': 'Progress updated successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@courses_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def get_dashboard():
    try:
        user_id = int(get_jwt_identity())
        
        # Get enrolled courses with progress
        user_progress_records = UserCourseProgress.query.filter_by(user_id=user_id).all()
        
        enrolled_courses = []
        for progress in user_progress_records:
            course = progress.course
            if course and course.is_active:
                enrolled_courses.append({
                    'id': course.id,
                    'title': course.title,
                    'thumbnail': course.thumbnail_url,
                    'category': course.category,
                    'progress': progress.completion_percentage,
                    'last_accessed': progress.last_accessed.isoformat() if progress.last_accessed else None,
                    'enrolled_at': progress.enrolled_at.isoformat()
                })
        
        # Calculate statistics
        total_courses = len(enrolled_courses)
        completed_courses = len([c for c in enrolled_courses if c['progress'] >= 100])
        in_progress_courses = len([c for c in enrolled_courses if 0 < c['progress'] < 100])
        
        return jsonify({
            'enrolled_courses': enrolled_courses,
            'stats': {
                'total_courses': total_courses,
                'completed_courses': completed_courses,
                'in_progress_courses': in_progress_courses,
                'not_started_courses': total_courses - completed_courses - in_progress_courses
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@courses_bp.route('/categories', methods=['GET'])
def get_categories():
    try:
        # Get unique categories from active courses
        categories = db.session.query(Course.category).filter_by(is_active=True).distinct().all()
        category_list = [cat[0] for cat in categories if cat[0]]
        
        return jsonify({
            'categories': sorted(category_list)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def _update_course_progress(user_id, course_id):
    """Update overall course progress based on video completions"""
    try:
        # Get all videos in the course
        total_videos = db.session.query(StageVideo).join(CourseStage).filter(
            CourseStage.course_id == course_id
        ).count()
        
        # Get completed videos for this user
        completed_videos = db.session.query(UserVideoProgress).join(StageVideo).join(CourseStage).filter(
            CourseStage.course_id == course_id,
            UserVideoProgress.user_id == user_id,
            UserVideoProgress.completed == True
        ).count()
        
        # Calculate completion percentage
        completion_percentage = (completed_videos / total_videos * 100) if total_videos > 0 else 0
        
        # Update user course progress
        user_progress = UserCourseProgress.query.filter_by(
            user_id=user_id,
            course_id=course_id
        ).first()
        
        if user_progress:
            user_progress.completion_percentage = completion_percentage
            user_progress.last_accessed = datetime.utcnow()
            db.session.commit()
    
    except Exception as e:
        print(f"Error updating course progress: {e}")
        db.session.rollback()

