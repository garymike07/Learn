from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.user import User, db
from src.models.course import Course, CourseStage, StageVideo
from src.models.progress import UserCourseProgress, UserStageProgress, UserVideoProgress
from datetime import datetime, timedelta
from sqlalchemy import func

admin_bp = Blueprint('admin', __name__)

def require_admin():
    """Decorator to check if user is admin"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user or not user.is_admin:
        return jsonify({'error': 'Admin access required'}), 403
    
    return None

@admin_bp.route('/admin/users', methods=['GET'])
@jwt_required()
def get_users():
    admin_check = require_admin()
    if admin_check:
        return admin_check
    
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        search = request.args.get('search', '')
        
        query = User.query
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                db.or_(
                    User.email.ilike(search_term),
                    User.first_name.ilike(search_term),
                    User.last_name.ilike(search_term),
                    User.username.ilike(search_term)
                )
            )
        
        users = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        users_data = []
        for user in users.items:
            user_data = user.to_dict()
            # Add enrollment count
            user_data['enrollments_count'] = len(user.course_progress)
            # Add completion stats
            completed_courses = len([p for p in user.course_progress if p.completion_percentage >= 100])
            user_data['completed_courses'] = completed_courses
            users_data.append(user_data)
        
        return jsonify({
            'users': users_data,
            'pagination': {
                'page': users.page,
                'pages': users.pages,
                'per_page': users.per_page,
                'total': users.total,
                'has_next': users.has_next,
                'has_prev': users.has_prev
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/admin/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_detail(user_id):
    admin_check = require_admin()
    if admin_check:
        return admin_check
    
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        user_data = user.to_dict()
        
        # Add detailed progress information
        enrollments = []
        for progress in user.course_progress:
            course = progress.course
            if course:
                enrollments.append({
                    'course_id': course.id,
                    'course_title': course.title,
                    'course_category': course.category,
                    'completion_percentage': progress.completion_percentage,
                    'enrolled_at': progress.enrolled_at.isoformat(),
                    'last_accessed': progress.last_accessed.isoformat() if progress.last_accessed else None
                })
        
        user_data['enrollments'] = enrollments
        
        return jsonify({'user': user_data}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/admin/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    admin_check = require_admin()
    if admin_check:
        return admin_check
    
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.get_json()
        
        # Update allowed fields
        if 'is_admin' in data:
            user.is_admin = data['is_admin']
        if 'is_active' in data:
            user.is_active = data['is_active']
        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']
        
        db.session.commit()
        
        return jsonify({
            'message': 'User updated successfully',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/admin/analytics', methods=['GET'])
@jwt_required()
def get_analytics():
    admin_check = require_admin()
    if admin_check:
        return admin_check
    
    try:
        # Basic statistics
        total_users = User.query.count()
        active_users = User.query.filter_by(is_active=True).count()
        total_courses = Course.query.filter_by(is_active=True).count()
        total_enrollments = UserCourseProgress.query.count()
        
        # Recent registrations (last 30 days)
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        recent_registrations = User.query.filter(
            User.created_at >= thirty_days_ago
        ).count()
        
        # Course popularity
        course_stats = db.session.query(
            Course.id,
            Course.title,
            Course.category,
            Course.enrolled_students,
            Course.average_rating,
            func.count(UserCourseProgress.id).label('actual_enrollments')
        ).outerjoin(UserCourseProgress).filter(
            Course.is_active == True
        ).group_by(Course.id).all()
        
        course_data = []
        for stat in course_stats:
            course_data.append({
                'id': stat[0],
                'title': stat[1],
                'category': stat[2],
                'enrolled_students': stat[3],
                'average_rating': stat[4],
                'actual_enrollments': stat[5]
            })
        
        # Completion rates by course
        completion_stats = db.session.query(
            Course.title,
            func.count(UserCourseProgress.id).label('total_enrollments'),
            func.count(
                func.case([(UserCourseProgress.completion_percentage >= 100, 1)])
            ).label('completions')
        ).join(UserCourseProgress).filter(
            Course.is_active == True
        ).group_by(Course.id, Course.title).all()
        
        completion_data = []
        for stat in completion_stats:
            completion_rate = (stat[2] / stat[1] * 100) if stat[1] > 0 else 0
            completion_data.append({
                'course_title': stat[0],
                'total_enrollments': stat[1],
                'completions': stat[2],
                'completion_rate': round(completion_rate, 2)
            })
        
        # User activity (enrollments per day for last 30 days)
        activity_data = db.session.query(
            func.date(UserCourseProgress.enrolled_at).label('date'),
            func.count(UserCourseProgress.id).label('enrollments')
        ).filter(
            UserCourseProgress.enrolled_at >= thirty_days_ago
        ).group_by(func.date(UserCourseProgress.enrolled_at)).all()
        
        activity_chart = [
            {
                'date': stat[0].isoformat(),
                'enrollments': stat[1]
            } for stat in activity_data
        ]
        
        return jsonify({
            'overview': {
                'total_users': total_users,
                'active_users': active_users,
                'total_courses': total_courses,
                'total_enrollments': total_enrollments,
                'recent_registrations': recent_registrations
            },
            'course_stats': course_data,
            'completion_stats': completion_data,
            'activity_chart': activity_chart
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/admin/courses', methods=['GET'])
@jwt_required()
def get_admin_courses():
    admin_check = require_admin()
    if admin_check:
        return admin_check
    
    try:
        courses = Course.query.all()
        
        courses_data = []
        for course in courses:
            course_data = course.to_dict()
            # Add enrollment statistics
            enrollments = UserCourseProgress.query.filter_by(course_id=course.id).count()
            completions = UserCourseProgress.query.filter_by(
                course_id=course.id
            ).filter(UserCourseProgress.completion_percentage >= 100).count()
            
            course_data['actual_enrollments'] = enrollments
            course_data['completions'] = completions
            course_data['completion_rate'] = (completions / enrollments * 100) if enrollments > 0 else 0
            
            courses_data.append(course_data)
        
        return jsonify({'courses': courses_data}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/admin/courses/<int:course_id>/toggle-active', methods=['POST'])
@jwt_required()
def toggle_course_active(course_id):
    admin_check = require_admin()
    if admin_check:
        return admin_check
    
    try:
        course = Course.query.get(course_id)
        if not course:
            return jsonify({'error': 'Course not found'}), 404
        
        course.is_active = not course.is_active
        db.session.commit()
        
        return jsonify({
            'message': f'Course {"activated" if course.is_active else "deactivated"} successfully',
            'course': course.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/admin/courses/<int:course_id>/toggle-featured', methods=['POST'])
@jwt_required()
def toggle_course_featured(course_id):
    admin_check = require_admin()
    if admin_check:
        return admin_check
    
    try:
        course = Course.query.get(course_id)
        if not course:
            return jsonify({'error': 'Course not found'}), 404
        
        course.is_featured = not course.is_featured
        db.session.commit()
        
        return jsonify({
            'message': f'Course {"featured" if course.is_featured else "unfeatured"} successfully',
            'course': course.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

