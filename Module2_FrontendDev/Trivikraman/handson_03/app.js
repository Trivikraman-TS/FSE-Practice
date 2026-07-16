// Import courses data
import { courses } from './data.js';

// ==========================================================================
// Task 1: ES6+ Syntax Practice (Console Exercises)
// ==========================================================================

console.log("--- Task 1: ES6+ Syntax Practice ---");

// Step 30: Destructuring in a loop
console.log("Course name and credits (Destructured Loop):");
for (const course of courses) {
  const { name, credits } = course;
  console.log(`- Course: ${name}, Credits: ${credits}`);
}

// Step 31: Array.map() for formatting strings
const formattedCourses = courses.map(course => `${course.code} — ${course.name} (${course.credits} credits)`);
console.log("Formatted Course Strings (Map):", formattedCourses);

// Step 32: Array.filter() for credits >= 4
const highCreditCourses = courses.filter(course => course.credits >= 4);
console.log(`Courses with credits >= 4 (Filter): Count = ${highCreditCourses.length}`, highCreditCourses);

// Step 33: Array.reduce() for total credits
const calculatedTotalCredits = courses.reduce((acc, course) => acc + course.credits, 0);
console.log(`Total Credits Enrolled (Reduce): ${calculatedTotalCredits}`);

// Step 34: Loop rewritten as an arrow function with template literal
const displaySummary = (coursesList) => {
  coursesList.forEach(course => {
    const { name, code, grade } = course;
    console.log(`Course Summary: ${name} (${code}) has grade: ${grade}`);
  });
};
displaySummary(courses);


// ==========================================================================
// Task 2 & 3: DOM Selection, Dynamic Rendering, and Interactivity
// ==========================================================================

// Global state copy to allow sorting/filtering operations
let currentCourses = [...courses];
let isSortedDescending = false;

// DOM Element Selections
const courseGrid = document.querySelector('.course-grid');
const totalCreditsEl = document.getElementById('total-credits');
const searchInput = document.getElementById('search-courses');
const sortBtn = document.getElementById('sort-courses');
const selectedCourseEl = document.getElementById('selected-course');
const selectedCourseContent = document.getElementById('selected-course-content');

// Dynamic Render Function
function renderCourses(coursesToRender) {
  // Clear the existing content to avoid duplicates
  courseGrid.innerHTML = '';

  if (coursesToRender.length === 0) {
    courseGrid.innerHTML = `<div class="no-results">No courses found matching the search criteria.</div>`;
    updateTotalCredits(0);
    return;
  }

  // Create DocumentFragment for efficient batch rendering
  const fragment = document.createDocumentFragment();

  coursesToRender.forEach(course => {
    const { id, name, code, credits } = course;
    
    // Create course card article element
    const article = document.createElement('article');
    article.className = 'course-card';
    // Set custom data attribute for event delegation lookup
    article.setAttribute('data-id', id);

    // Build the inner HTML contents
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
  
  // Calculate and update the dynamic sum of credits in the rendered list
  const total = coursesToRender.reduce((sum, c) => sum + c.credits, 0);
  updateTotalCredits(total);
}

// Update total credits indicator
function updateTotalCredits(total) {
  totalCreditsEl.textContent = `Total Credits Enrolled: ${total} Credits`;
}

// Initialize Render
renderCourses(currentCourses);


// ==========================================================================
// Event Listeners & Interactivity
// ==========================================================================

// Search Filtering (Input Event)
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  
  // Filter core array based on search term
  const filtered = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm) || 
    course.code.toLowerCase().includes(searchTerm)
  );
  
  currentCourses = filtered;
  
  // If previously sorted, apply sort criteria to filtered list
  if (isSortedDescending) {
    currentCourses.sort((a, b) => b.credits - a.credits);
  }
  
  renderCourses(currentCourses);
});

// Sort by Credits (Click Event)
sortBtn.addEventListener('click', () => {
  isSortedDescending = !isSortedDescending;
  
  if (isSortedDescending) {
    currentCourses.sort((a, b) => b.credits - a.credits);
    sortBtn.innerHTML = 'Sort by Credits &uarr;';
    sortBtn.classList.add('active');
  } else {
    // Reset order to default data ordering
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

// Event Delegation for Course Card Selection
courseGrid.addEventListener('click', (event) => {
  // Check if click target is inside a course card
  const cardElement = event.target.closest('.course-card');
  
  if (cardElement) {
    const courseId = parseInt(cardElement.getAttribute('data-id'), 10);
    const selectedCourse = courses.find(c => c.id === courseId);
    
    if (selectedCourse) {
      // Remove previous active classes and highlight current active card
      document.querySelectorAll('.course-card').forEach(card => card.classList.remove('active-card'));
      cardElement.classList.add('active-card');

      // Update selection info details panel
      selectedCourseContent.innerHTML = `
        <div class="selected-details-grid">
          <div><strong>Course Name:</strong> ${selectedCourse.name}</div>
          <div><strong>Code:</strong> ${selectedCourse.code}</div>
          <div><strong>Academic Credits:</strong> ${selectedCourse.credits}</div>
          <div><strong>Recorded Grade:</strong> <span class="grade-badge">${selectedCourse.grade}</span></div>
        </div>
      `;
      selectedCourseEl.classList.remove('hidden');
      
      // Also issue a standard alert as secondary notification
      console.log(`Alert: Selected ${selectedCourse.name} (${selectedCourse.grade})`);
    }
  }
});
