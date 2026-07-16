import axios from 'axios';

// Step 138: Configure single Axios instance with baseURL, headers, and timeout
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Step 141: Add request interceptor attaching Authorization header
apiClient.interceptors.request.use(
  (config) => {
    // Attach hardcoded mock auth token
    config.headers['Authorization'] = 'Bearer mock-session-jwt-token-12345';
    console.log(`[HTTP Interceptor - Request] Auth token attached to: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Step 140: Add response interceptor mapping data directly and standardizing errors
apiClient.interceptors.response.use(
  (response) => {
    // Return data key directly (Step 140a)
    console.log(`[HTTP Interceptor - Response] Succeeded with status ${response.status}`);
    return response.data;
  },
  (error) => {
    // Standardize error wrapper schema (Step 140b)
    let message = 'An unexpected error occurred in communications.';
    let statusCode = 500;

    if (error.response) {
      // The server responded with a status outside of the 2xx range
      statusCode = error.response.status;
      message = error.response.data.message || `API error returned status code ${statusCode}`;
    } else if (error.request) {
      // The request was made but no response was received
      statusCode = 504;
      message = 'Gateway Timeout: No response received from server.';
    } else {
      // Something happened in setting up the request that triggered an Error
      message = error.message;
    }

    console.error(`[HTTP Interceptor - Error] Mapped Status ${statusCode}: ${message}`);
    
    // Throw a standardized error object
    return Promise.reject({
      message,
      statusCode
    });
  }
);

export default apiClient;
