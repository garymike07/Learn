from flask import Blueprint, request, jsonify
from src.models.course import Course, CourseStage, StageVideo
from src.database import db
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
        
        # Get course data with stages and videos
        course_data = course.to_dict(include_stages=True)
        
        return jsonify({
            'course': course_data,
            'enrolled': False,  # No authentication, so always false
            'progress': {
                'completion_percentage': 0,
                'last_accessed': None,
                'enrolled_at': None
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@courses_bp.route('/courses/<int:course_id>/enroll', methods=['POST'])
def enroll_course(course_id):
    try:
        # Check if course exists and is active
        course = Course.query.get(course_id)
        if not course or not course.is_active:
            return jsonify({'error': 'Course not found'}), 404
        
        # Since we removed authentication, just return success
        # In a real app, you might want to track enrollments differently
        return jsonify({'message': 'Successfully enrolled in course'}), 201
        
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

