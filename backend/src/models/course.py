from src.models.user import db
from datetime import datetime

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    thumbnail_url = db.Column(db.String(500), nullable=True)
    category = db.Column(db.String(100), nullable=False)
    difficulty = db.Column(db.String(50), nullable=False, default='Beginner')
    duration_weeks = db.Column(db.Integer, nullable=True)
    instructor = db.Column(db.String(100), nullable=True)
    average_rating = db.Column(db.Float, default=0.0)
    enrolled_students = db.Column(db.Integer, default=0)
    is_featured = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    stages = db.relationship('CourseStage', backref='course', lazy=True, cascade='all, delete-orphan')
    enrollments = db.relationship('UserCourseProgress', backref='course', lazy=True)

    def __repr__(self):
        return f'<Course {self.title}>'

    def to_dict(self, include_stages=False):
        data = {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'thumbnail_url': self.thumbnail_url,
            'category': self.category,
            'difficulty': self.difficulty,
            'duration_weeks': self.duration_weeks,
            'instructor': self.instructor,
            'average_rating': self.average_rating,
            'enrolled_students': self.enrolled_students,
            'is_featured': self.is_featured,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'total_stages': len(self.stages)
        }
        
        if include_stages:
            data['stages'] = [stage.to_dict() for stage in sorted(self.stages, key=lambda x: x.order_index)]
        
        return data

class CourseStage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    duration_hours = db.Column(db.Integer, nullable=True)
    order_index = db.Column(db.Integer, nullable=False)  # Sequential order within course
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    videos = db.relationship('StageVideo', backref='stage', lazy=True, cascade='all, delete-orphan')
    progress_records = db.relationship('UserStageProgress', backref='stage', lazy=True)

    def __repr__(self):
        return f'<CourseStage {self.title}>'

    def to_dict(self):
        return {
            'id': self.id,
            'course_id': self.course_id,
            'title': self.title,
            'description': self.description,
            'duration_hours': self.duration_hours,
            'order_index': self.order_index,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'videos': [video.to_dict() for video in sorted(self.videos, key=lambda x: x.order_index)]
        }

class StageVideo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stage_id = db.Column(db.Integer, db.ForeignKey('course_stage.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    youtube_id = db.Column(db.String(50), nullable=False)  # YouTube video ID
    order_index = db.Column(db.Integer, nullable=False)  # Order within stage
    duration_minutes = db.Column(db.Integer, nullable=True)  # Video duration in minutes
    description = db.Column(db.Text, nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    watch_progress = db.relationship('UserVideoProgress', backref='video', lazy=True)

    def __repr__(self):
        return f'<StageVideo {self.title}>'

    def to_dict(self):
        return {
            'id': self.id,
            'stage_id': self.stage_id,
            'title': self.title,
            'youtube_id': self.youtube_id,
            'order_index': self.order_index,
            'duration_minutes': self.duration_minutes,
            'description': self.description,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'youtube_url': f'https://www.youtube.com/watch?v={self.youtube_id}',
            'embed_url': f'https://www.youtube.com/embed/{self.youtube_id}'
        }

