const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = {
  getUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  getPosts: async (userId = '') => {
    const url = userId ? 
      `${API_BASE_URL}/posts?userId=${userId}` : 
      `${API_BASE_URL}/posts`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },
};