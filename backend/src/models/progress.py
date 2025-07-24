from src.models.user import db
from datetime import datetime

class UserCourseProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    enrollment_date = db.Column(db.DateTime, default=datetime.utcnow)
    completion_date = db.Column(db.DateTime, nullable=True)
    is_completed = db.Column(db.Boolean, default=False)
    current_stage_id = db.Column(db.Integer, db.ForeignKey('course_stage.id'), nullable=True)
    progress_percentage = db.Column(db.Float, default=0.0)  # Overall course progress
    last_accessed = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    stage_progress = db.relationship('UserStageProgress', backref='course_progress', lazy=True)
    
    # Unique constraint to prevent duplicate enrollments
    __table_args__ = (db.UniqueConstraint('user_id', 'course_id', name='unique_user_course'),)

    def __repr__(self):
        return f'<UserCourseProgress User:{self.user_id} Course:{self.course_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'course_id': self.course_id,
            'enrollment_date': self.enrollment_date.isoformat() if self.enrollment_date else None,
            'completion_date': self.completion_date.isoformat() if self.completion_date else None,
            'is_completed': self.is_completed,
            'current_stage_id': self.current_stage_id,
            'progress_percentage': self.progress_percentage,
            'last_accessed': self.last_accessed.isoformat() if self.last_accessed else None
        }

class UserStageProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    stage_id = db.Column(db.Integer, db.ForeignKey('course_stage.id'), nullable=False)
    course_progress_id = db.Column(db.Integer, db.ForeignKey('user_course_progress.id'), nullable=False)
    started_date = db.Column(db.DateTime, default=datetime.utcnow)
    completion_date = db.Column(db.DateTime, nullable=True)
    is_completed = db.Column(db.Boolean, default=False)
    progress_percentage = db.Column(db.Float, default=0.0)  # Stage progress based on videos watched
    last_accessed = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    video_progress = db.relationship('UserVideoProgress', backref='stage_progress', lazy=True)
    
    # Unique constraint
    __table_args__ = (db.UniqueConstraint('user_id', 'stage_id', name='unique_user_stage'),)

    def __repr__(self):
        return f'<UserStageProgress User:{self.user_id} Stage:{self.stage_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'stage_id': self.stage_id,
            'course_progress_id': self.course_progress_id,
            'started_date': self.started_date.isoformat() if self.started_date else None,
            'completion_date': self.completion_date.isoformat() if self.completion_date else None,
            'is_completed': self.is_completed,
            'progress_percentage': self.progress_percentage,
            'last_accessed': self.last_accessed.isoformat() if self.last_accessed else None
        }

class UserVideoProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey('stage_video.id'), nullable=False)
    stage_progress_id = db.Column(db.Integer, db.ForeignKey('user_stage_progress.id'), nullable=False)
    watch_time_seconds = db.Column(db.Integer, default=0)  # How much of the video was watched
    is_completed = db.Column(db.Boolean, default=False)
    completion_date = db.Column(db.DateTime, nullable=True)
    last_position_seconds = db.Column(db.Integer, default=0)  # Last playback position
    first_watched = db.Column(db.DateTime, default=datetime.utcnow)
    last_watched = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Unique constraint
    __table_args__ = (db.UniqueConstraint('user_id', 'video_id', name='unique_user_video'),)

    def __repr__(self):
        return f'<UserVideoProgress User:{self.user_id} Video:{self.video_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'video_id': self.video_id,
            'stage_progress_id': self.stage_progress_id,
            'watch_time_seconds': self.watch_time_seconds,
            'is_completed': self.is_completed,
            'completion_date': self.completion_date.isoformat() if self.completion_date else None,
            'last_position_seconds': self.last_position_seconds,
            'first_watched': self.first_watched.isoformat() if self.first_watched else None,
            'last_watched': self.last_watched.isoformat() if self.last_watched else None
        }

