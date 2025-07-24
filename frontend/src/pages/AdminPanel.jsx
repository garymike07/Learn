import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Activity, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  Calendar,
  Clock,
  Award,
  BarChart3
} from 'lucide-react';

const AdminPanel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadData();
  }, [activeTab, currentPage, searchTerm]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (activeTab === 'overview') {
        const analyticsData = await apiService.getAnalytics();
        setAnalytics(analyticsData);
      } else if (activeTab === 'users') {
        const usersData = await apiService.getUsers(currentPage, 10, searchTerm);
        setUsers(usersData.users);
        setTotalPages(usersData.total_pages);
      } else if (activeTab === 'courses') {
        const coursesData = await apiService.getAdminCourses();
        setCourses(coursesData.courses);
      }
    } catch (error) {
      console.error('Failed to load admin data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId, action) => {
    try {
      if (action === 'view') {
        const userDetail = await apiService.getUserDetail(userId);
        // Handle user detail view
        console.log('User detail:', userDetail);
      } else if (action === 'edit') {
        // Handle user edit
        console.log('Edit user:', userId);
      } else if (action === 'delete') {
        if (window.confirm('Are you sure you want to delete this user?')) {
          // Handle user deletion
          console.log('Delete user:', userId);
        }
      }
    } catch (error) {
      console.error('User action failed:', error);
    }
  };

  const handleCourseToggle = async (courseId, action) => {
    try {
      if (action === 'active') {
        await apiService.toggleCourseActive(courseId);
      } else if (action === 'featured') {
        await apiService.toggleCourseFeatured(courseId);
      }
      loadData(); // Reload courses
    } catch (error) {
      console.error('Course toggle failed:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const StatCard = ({ title, value, icon: Icon, change, color = 'blue' }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {change && (
            <p className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change >= 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 bg-${color}-600 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        activeTab === id
          ? 'bg-blue-600 text-white'
          : 'text-gray-400 hover:text-white hover:bg-gray-700'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  if (loading && !analytics && !users.length && !courses.length) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400">
            Manage users, courses, and monitor system analytics
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <TabButton id="overview" label="Overview" icon={BarChart3} />
          <TabButton id="users" label="Users" icon={Users} />
          <TabButton id="courses" label="Courses" icon={BookOpen} />
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && analytics && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Users"
                value={analytics.total_users}
                icon={Users}
                change={analytics.user_growth}
                color="blue"
              />
              <StatCard
                title="Active Courses"
                value={analytics.active_courses}
                icon={BookOpen}
                change={analytics.course_growth}
                color="green"
              />
              <StatCard
                title="Total Enrollments"
                value={analytics.total_enrollments}
                icon={TrendingUp}
                change={analytics.enrollment_growth}
                color="purple"
              />
              <StatCard
                title="Completion Rate"
                value={`${analytics.completion_rate}%`}
                icon={Award}
                change={analytics.completion_growth}
                color="yellow"
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {analytics.recent_activities?.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white">{activity.description}</p>
                        <p className="text-sm text-gray-400">{formatDate(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 hover:text-white transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>

            {/* Users Table */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Courses
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">
                                {user.first_name[0]}{user.last_name[0]}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">
                                {user.first_name} {user.last_name}
                              </div>
                              <div className="text-sm text-gray-400">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.is_active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.is_active ? 'Active' : 'Inactive'}
                          </span>
                          {user.is_admin && (
                            <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                              Admin
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {user.enrolled_courses_count || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {formatDate(user.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleUserAction(user.id, 'view')}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUserAction(user.id, 'edit')}
                              className="text-yellow-400 hover:text-yellow-300"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUserAction(user.id, 'delete')}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-3 border-t border-gray-700 flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  <div className="aspect-video bg-gray-600">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/api/placeholder/400/225';
                      }}
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                        {course.category}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleCourseToggle(course.id, 'active')}
                          className={`text-xs px-2 py-1 rounded ${
                            course.is_active 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-600 text-gray-300'
                          }`}
                        >
                          {course.is_active ? 'Active' : 'Inactive'}
                        </button>
                        <button
                          onClick={() => handleCourseToggle(course.id, 'featured')}
                          className={`text-xs px-2 py-1 rounded ${
                            course.is_featured 
                              ? 'bg-yellow-600 text-white' 
                              : 'bg-gray-600 text-gray-300'
                          }`}
                        >
                          {course.is_featured ? 'Featured' : 'Regular'}
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <div className="text-sm text-gray-400 space-y-1">
                      <div className="flex items-center justify-between">
                        <span>Enrollments:</span>
                        <span>{course.enrollment_count || 0}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Completion Rate:</span>
                        <span>{course.completion_rate || 0}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Created:</span>
                        <span>{formatDate(course.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

