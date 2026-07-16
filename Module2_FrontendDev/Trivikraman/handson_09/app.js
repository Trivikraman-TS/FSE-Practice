import { courses } from './data.js';

let currentCourses = [...courses];
let isSortedDescending = false;

// DOM Element Selections
const courseGrid = document.querySelector('.course-grid');
const totalCreditsEl = document.getElementById('total-credits');
const searchInput = document.getElementById('search-courses');
const sortBtn = document.getElementById('sort-courses');
const selectedCourseEl = document.getElementById('selected-course');
const selectedCourseContent = document.getElementById('selected-course-content');
const hamburgerMenu = document.getElementById('hamburger-menu');

// Dynamic Render Function with Accessibility hooks
function renderCourses(coursesToRender) {
  courseGrid.innerHTML = '';

  if (coursesToRender.length === 0) {
    courseGrid.innerHTML = `<div class="no-results" role="alert">No courses found matching the search criteria.</div>`;
    updateTotalCredits(0, 0);
    return;
  }

  const fragment = document.createDocumentFragment();

  coursesToRender.forEach(course => {
    const { id, name, code, credits } = course;
    
    // Create course card article element
    const article = document.createElement('article');
    article.className = 'course-card';
    article.setAttribute('data-id', id);
    
    // Step 129: Make course cards keyboard-focusable
    article.setAttribute('tabindex', '0');
    // Set role for accessibility context
    article.setAttribute('role', 'button');
    article.setAttribute('aria-label', `${name}, Code: ${code}, Credits: ${credits}. Press Enter to view details.`);

    article.innerHTML = `
      <div class="card-tag">${credits >= 4 ? 'Core' : 'Elective'}</div>
      <!-- Respect heading hierarchy: card title is h3 (Step 126) -->
      <h3>${name}</h3>
      <p class="course-desc">This is a dynamically rendered accessible course card for ${name} (${code}).</p>
      <div class="card-footer">
        <span class="course-code">${code}</span>
        <span class="course-credits">${credits} Credits</span>
      </div>
    `;

    // Step 129: Add click and keydown listeners for keyboard support
    article.addEventListener('click', () => selectCourse(course, article));
    article.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // Prevent page scrolling on spacebar press
        selectCourse(course, article);
      }
    });

    fragment.appendChild(article);
  });

  courseGrid.appendChild(fragment);
  
  const total = coursesToRender.reduce((sum, c) => sum + c.credits, 0);
  updateTotalCredits(total, coursesToRender.length);
}

// Update credits summary with screen-reader friendly status text (Step 130)
function updateTotalCredits(total, count) {
  totalCreditsEl.textContent = `Total Credits Enrolled: ${total} Credits (${count} courses listed).`;
}

// Select Course details renderer
function selectCourse(selectedCourse, element) {
  // Clear previous highlighted items
  document.querySelectorAll('.course-card').forEach(card => card.classList.remove('active-card'));
  element.classList.add('active-card');

  // Inject details (Use h3 inside info card to respect hierarchy h2 -> h3)
  selectedCourseContent.innerHTML = `
    <div class="selected-details-grid">
      <div><strong>Course Name:</strong> ${selectedCourse.name}</div>
      <div><strong>Code:</strong> ${selectedCourse.code}</div>
      <div><strong>Academic Credits:</strong> ${selectedCourse.credits}</div>
      <div><strong>Recorded Grade:</strong> <span class="grade-badge">${selectedCourse.grade}</span></div>
    </div>
  `;
  selectedCourseEl.classList.remove('hidden');
  
  // Set focus on selection container for accessibility feedback
  selectedCourseEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Hamburger Expand toggle controller (Step 131)
hamburgerMenu.addEventListener('click', () => {
  const isExpanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';
  hamburgerMenu.setAttribute('aria-expanded', (!isExpanded).toString());
  
  // Toggle simple mobile nav menu view
  const navMenu = document.querySelector('.nav-menu');
  if (isExpanded) {
    navMenu.style.display = 'none';
  } else {
    navMenu.style.display = 'block';
  }
});

// Search input
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

// Sort by Credits button
sortBtn.addEventListener('click', () => {
  isSortedDescending = !isSortedDescending;
  if (isSortedDescending) {
    currentCourses.sort((a, b) => b.credits - a.credits);
    sortBtn.innerHTML = 'Sort by Credits &uarr;';
    sortBtn.setAttribute('aria-label', 'Sorted by credits descending. Click to restore order.');
  } else {
    const searchTerm = searchInput.value.toLowerCase().trim();
    currentCourses = courses.filter(course => 
      course.name.toLowerCase().includes(searchTerm) || 
      course.code.toLowerCase().includes(searchTerm)
    );
    sortBtn.innerHTML = 'Sort by Credits &darr;';
    sortBtn.setAttribute('aria-label', 'Sort courses by credits descending.');
  }
  renderCourses(currentCourses);
});

// Initialize Rendering
renderCourses(currentCourses);
