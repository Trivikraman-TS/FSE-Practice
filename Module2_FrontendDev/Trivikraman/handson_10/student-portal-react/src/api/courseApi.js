import apiClient from './apiClient';

// Step 139: Define course API integration layer
export const getAllCourses = async () => {
  const posts = await apiClient.get('/posts', { params: { _limit: 5 } });
  
  // Map posts into course schemas
  return posts.map(post => ({
    id: post.id,
    name: post.title.split(' ').slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    code: `CS${100 + post.id}`,
    credits: post.id % 2 === 0 ? 4 : 3,
    grade: post.id % 3 === 0 ? 'A' : (post.id % 3 === 1 ? 'A-' : 'B+')
  }));
};

export const getCourseById = async (id) => {
  const post = await apiClient.get(`/posts/${id}`);
  
  return {
    id: post.id,
    name: post.title.split(' ').slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    code: `CS${100 + post.id}`,
    credits: post.id % 2 === 0 ? 4 : 3,
    grade: post.id % 3 === 0 ? 'A' : (post.id % 3 === 1 ? 'A-' : 'B+'),
    description: post.body
  };
};

export const enrollStudent = async (studentId, courseId) => {
  // Simulate POST request to register enrollment
  return apiClient.post('/posts', {
    userId: studentId,
    courseId: courseId,
    enrolledAt: new Date().toISOString()
  });
};
