// Import courses data
import { courses } from './data.js';

// ==========================================================================
// Task 1: Promises and async/await
// ==========================================================================

console.log("--- Task 1: Promises & Async/Await Exercises ---");

// Step 45: fetchUser(id) using Promise chaining (.then)
function fetchUserThen(id) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(response => {
      if (!response.ok) throw new Error("Network response error");
      return response.json();
    })
    .then(user => {
      console.log(`[Promise Chaining] Fetched User ID ${id}: Name = ${user.name}`);
      return user;
    })
    .catch(error => console.error("fetchUserThen error:", error));
}
fetchUserThen(1);

// Step 46: fetchUser(id) using async/await with try/catch
async function fetchUserAsync(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!response.ok) throw new Error(`User not found: Status ${response.status}`);
    const user = await response.json();
    console.log(`[Async/Await] Fetched User ID ${id}: Name = ${user.name}`);
    return user;
  } catch (error) {
    console.error(`[Async/Await] fetchUserAsync failed for ID ${id}:`, error.message);
    throw error;
  }
}
fetchUserAsync(2);

// Step 47: fetchAllCourses() with simulated 1-second delay
function fetchAllCourses() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(courses);
    }, 1000);
  });
}

// Step 49: Promise.all() for concurrent requests
async function fetchConcurrentUsers() {
  try {
    console.log("[Promise.all] Initiating concurrent user fetches...");
    const [user1, user2] = await Promise.all([
      fetchUserAsync(1),
      fetchUserAsync(2)
    ]);
    console.log(`[Promise.all] Concurrent result complete! User 1: ${user1.name}, User 2: ${user2.name}`);
  } catch (error) {
    console.error("[Promise.all] Failed fetching users concurrently:", error);
  }
}
fetchConcurrentUsers();


// ==========================================================================
// Task 2 & 3: Fetch API with Error Handling, Axios & Notifications
// ==========================================================================

/*
  ==========================================================================
  Fetch vs Axios Comparison (Step 59)
  ==========================================================================
  
  Feature             | Fetch API                                    | Axios Library
  --------------------+----------------------------------------------+---------------------------------------------
  1. Parsing          | Needs manual step: response.json()           | Automatically parses JSON responses
  2. Error Handling   | Resolves on 404/500 (must check response.ok) | Automatically rejects on non-2xx status codes
  3. Interceptors     | No native interceptors (must wrap fetch)     | Built-in request and response interceptors
  4. Extra features   | Lacks timeout support natively (need abort)  | Native support for request timeout config
*/

// Set up Axios Request Interceptor (Step 58)
axios.interceptors.request.use((config) => {
  console.log(`[Axios Interceptor] API call started: ${config.method.toUpperCase()} ${config.url}`);
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Reusable apiFetch function using Axios (Step 50 & 56)
async function apiFetch(url, params = {}) {
  try {
    // Axios automatically throws errors for non-2xx status codes (Step 56b)
    const response = await axios.get(url, { params });
    // Axios automatically parses JSON (Step 56a)
    return response.data;
  } catch (error) {
    const statusCode = error.response ? error.response.status : 'Network Error';
    const message = error.response && error.response.data ? JSON.stringify(error.response.data) : error.message;
    throw new Error(`API error (Status ${statusCode}): ${message}`);
  }
}

// DOM Elements
const courseGrid = document.querySelector('.course-grid');
const totalCreditsEl = document.getElementById('total-credits');
const searchInput = document.getElementById('search-courses');
const sortBtn = document.getElementById('sort-courses');
const selectedCourseEl = document.getElementById('selected-course');
const selectedCourseContent = document.getElementById('selected-course-content');
const notificationsEl = document.getElementById('notifications');
const triggerErrorBtn = document.getElementById('trigger-error-btn');

let currentCourses = [];
let isSortedDescending = false;

// Step 48: Call fetchAllCourses() and render with delay loading message
async function loadCourses() {
  courseGrid.innerHTML = `<div class="loading-indicator">Loading courses... Please wait.</div>`;
  totalCreditsEl.textContent = "Total Credits Enrolled: Loading...";
  
  try {
    const loadedData = await fetchAllCourses();
    currentCourses = [...loadedData];
    renderCourses(currentCourses);
  } catch (error) {
    courseGrid.innerHTML = `<div class="error-msg">Failed to load courses database.</div>`;
  }
}

function renderCourses(coursesToRender) {
  courseGrid.innerHTML = '';
  if (coursesToRender.length === 0) {
    courseGrid.innerHTML = `<div class="no-results">No courses found matching the search criteria.</div>`;
    totalCreditsEl.textContent = "Total Credits Enrolled: 0 Credits";
    return;
  }

  const fragment = document.createDocumentFragment();
  coursesToRender.forEach(course => {
    const { id, name, code, credits } = course;
    const article = document.createElement('article');
    article.className = 'course-card';
    article.setAttribute('data-id', id);
    article.innerHTML = `
      <div class="card-tag">${credits >= 4 ? 'Core' : 'Elective'}</div>
      <h3>${name}</h3>
      <p class="course-desc">This is a dynamically rendered course detail for ${name} (${code}).</p>
      <div class="card-footer">
        <span class="course-code">${code}</span>
        <span class="course-credits">${credits} Credits</span>
      </div>
    `;
    fragment.appendChild(article);
  });
  courseGrid.appendChild(fragment);

  const total = coursesToRender.reduce((sum, c) => sum + c.credits, 0);
  totalCreditsEl.textContent = `Total Credits Enrolled: ${total} Credits`;
}

// Step 51 & 52: Fetch Posts and Render Notification Cards with loading spinner
async function loadNotifications(simulateError = false) {
  // Show spinner (Step 52)
  notificationsEl.innerHTML = `
    <div class="spinner-container">
      <div class="loading-spinner"></div>
      <p>Fetching notifications...</p>
    </div>
  `;

  // Determine URL - simulate error path or success path (Step 53)
  const url = simulateError 
    ? 'https://jsonplaceholder.typicode.com/nonexistent' 
    : 'https://jsonplaceholder.typicode.com/posts';
  
  try {
    // Fetch posts belonging to user 1 (Step 57)
    const posts = await apiFetch(url, { _limit: 5, userId: 1 });
    
    // Clear and render posts
    notificationsEl.innerHTML = '';
    
    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'notification-card';
      card.innerHTML = `
        <h4 class="notification-title">${post.title}</h4>
        <p class="notification-body">${post.body}</p>
      `;
      notificationsEl.appendChild(card);
    });
  } catch (error) {
    // Handle error UI & Add Retry button (Step 54)
    notificationsEl.innerHTML = `
      <div class="error-card">
        <p class="error-msg">⚠️ ${error.message}</p>
        <button id="retry-notifications-btn" class="btn-retry">Retry Fetching</button>
      </div>
    `;
    
    // Add event listener to dynamic Retry button (Step 54)
    document.getElementById('retry-notifications-btn').addEventListener('click', () => {
      loadNotifications(false); // Retry with correct URL
    });
  }
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  const filtered = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm) || 
    course.code.toLowerCase().includes(searchTerm)
  );
  currentCourses = filtered;
  if (isSortedDescending) {
    currentCourses.sort((a, b) => b.credits - a.credits);
  }
  renderCourses(currentCourses);
});

sortBtn.addEventListener('click', () => {
  isSortedDescending = !isSortedDescending;
  if (isSortedDescending) {
    currentCourses.sort((a, b) => b.credits - a.credits);
    sortBtn.innerHTML = 'Sort by Credits &uarr;';
    sortBtn.classList.add('active');
  } else {
    const searchTerm = searchInput.value.toLowerCase().trim();
    currentCourses = courses.filter(course => 
      course.name.toLowerCase().includes(searchTerm) || 
      course.code.toLowerCase().includes(searchTerm)
    );
    sortBtn.innerHTML = 'Sort by Credits &darr;';
    sortBtn.classList.remove('active');
  }
  renderCourses(currentCourses);
});

// Event Delegation for course selection
courseGrid.addEventListener('click', (event) => {
  const cardElement = event.target.closest('.course-card');
  if (cardElement) {
    const courseId = parseInt(cardElement.getAttribute('data-id'), 10);
    const selectedCourse = courses.find(c => c.id === courseId);
    if (selectedCourse) {
      document.querySelectorAll('.course-card').forEach(card => card.classList.remove('active-card'));
      cardElement.classList.add('active-card');
      
      selectedCourseContent.innerHTML = `
        <div class="selected-details-grid">
          <div><strong>Course Name:</strong> ${selectedCourse.name}</div>
          <div><strong>Code:</strong> ${selectedCourse.code}</div>
          <div><strong>Academic Credits:</strong> ${selectedCourse.credits}</div>
          <div><strong>Recorded Grade:</strong> <span class="grade-badge">${selectedCourse.grade}</span></div>
        </div>
      `;
      selectedCourseEl.classList.remove('hidden');
    }
  }
});

// Simulate 404 Button Click
triggerErrorBtn.addEventListener('click', () => {
  loadNotifications(true);
});

// Initial Page Load
loadCourses();
loadNotifications(false);
