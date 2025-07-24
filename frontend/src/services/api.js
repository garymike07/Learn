const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  setAuthToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  getAuthHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.access_token) {
      this.setAuthToken(response.access_token);
    }
    
    return response;
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.access_token) {
      this.setAuthToken(response.access_token);
    }
    
    return response;
  }

  async logout() {
    this.setAuthToken(null);
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(userData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async changePassword(passwordData) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }

  // Course endpoints
  async getCourses(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'All') {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/courses?${queryString}` : '/courses';
    
    return this.request(endpoint);
  }

  async getCourse(courseId) {
    return this.request(`/courses/${courseId}`);
  }

  async enrollInCourse(courseId) {
    return this.request(`/courses/${courseId}/enroll`, {
      method: 'POST',
    });
  }

  async getCategories() {
    return this.request('/categories');
  }

  // Progress tracking endpoints
  async updateVideoProgress(videoId, progressData) {
    return this.request(`/videos/${videoId}/progress`, {
      method: 'POST',
      body: JSON.stringify(progressData),
    });
  }

  // Dashboard endpoints
  async getDashboard() {
    return this.request('/dashboard');
  }

  // Admin endpoints
  async getUsers(page = 1, perPage = 20, search = '') {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
    });
    
    if (search) {
      queryParams.append('search', search);
    }
    
    return this.request(`/admin/users?${queryParams.toString()}`);
  }

  async getUserDetail(userId) {
    return this.request(`/admin/users/${userId}`);
  }

  async updateUser(userId, userData) {
    return this.request(`/admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async getAnalytics() {
    return this.request('/admin/analytics');
  }

  async getAdminCourses() {
    return this.request('/admin/courses');
  }

  async toggleCourseActive(courseId) {
    return this.request(`/admin/courses/${courseId}/toggle-active`, {
      method: 'POST',
    });
  }

  async toggleCourseFeatured(courseId) {
    return this.request(`/admin/courses/${courseId}/toggle-featured`, {
      method: 'POST',
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Utility methods
  isAuthenticated() {
    return !!this.token;
  }

  getCurrentUser() {
    if (!this.token) return null;
    
    try {
      // Decode JWT token to get user info (basic implementation)
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

