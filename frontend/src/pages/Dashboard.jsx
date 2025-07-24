import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { BookOpen, Clock, Award, TrendingUp, Play, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getDashboard();
      setDashboardData(response);
      setError(null);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    if (progress >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getProgressText = (progress) => {
    if (progress >= 100) return 'Completed';
    if (progress >= 75) return 'Almost Done';
    if (progress >= 50) return 'Halfway';
    if (progress >= 25) return 'Getting Started';
    return 'Just Started';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const enrolledCourses = dashboardData?.enrolled_courses || [];

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.first_name}!
          </h1>
          <p className="text-gray-400">
            Continue your learning journey and track your progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-600 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Courses</p>
                <p className="text-2xl font-bold text-white">{stats.total_courses || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-green-600 rounded-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-white">{stats.completed_courses || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-600 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">In Progress</p>
                <p className="text-2xl font-bold text-white">{stats.in_progress_courses || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-purple-600 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Not Started</p>
                <p className="text-2xl font-bold text-white">{stats.not_started_courses || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">My Courses</h2>
              <Link
                to="/courses"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                Browse More Courses
              </Link>
            </div>
          </div>

          <div className="p-6">
            {enrolledCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-300 mb-2">No courses enrolled yet</h3>
                <p className="text-gray-400 mb-6">
                  Start your learning journey by enrolling in a course
                </p>
                <Link
                  to="/courses"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600 hover:border-gray-500 transition-colors">
                    <div className="aspect-video bg-gray-600 relative">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/400/225';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Link
                          to={`/courses/${course.id}`}
                          className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
                        >
                          <Play className="w-6 h-6 text-white" />
                        </Link>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                          {course.category}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          course.progress >= 100 ? 'text-green-400 bg-green-400/10' :
                          course.progress >= 50 ? 'text-yellow-400 bg-yellow-400/10' :
                          'text-gray-400 bg-gray-400/10'
                        }`}>
                          {getProgressText(course.progress)}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-white mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{Math.round(course.progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(course.progress)}`}
                            style={{ width: `${Math.min(course.progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Enrolled {formatDate(course.enrolled_at)}
                        </div>
                        {course.last_accessed && (
                          <div>
                            Last: {formatDate(course.last_accessed)}
                          </div>
                        )}
                      </div>
                      
                      <Link
                        to={`/courses/${course.id}`}
                        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors text-center block"
                      >
                        {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

