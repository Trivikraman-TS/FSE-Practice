<script setup>
import { ref, computed, onMounted } from 'vue';
import CourseCard from '../components/CourseCard.vue';
import { useEnrollmentStore } from '../stores/enrollment';

const courses = ref([]);
const searchTerm = ref('');
const loading = ref(true);
const error = ref(null);

const store = useEnrollmentStore();

// Step 109: Fetch and initialize course array on mounted
onMounted(async () => {
  try {
    loading.value = true;
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error("Catalog fetch failed");
    const data = await response.json();
    
    // Map posts to course-like structures
    courses.value = data.slice(0, 5).map(post => ({
      id: post.id,
      name: post.title.split(' ').slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      code: `CS${100 + post.id}`,
      credits: post.id % 2 === 0 ? 4 : 3,
      grade: post.id % 3 === 0 ? 'A' : (post.id % 3 === 1 ? 'A-' : 'B+')
    }));
  } catch (err) {
    console.error(err);
    error.value = "Unable to fetch catalog. Falling back to local data.";
    // Fallback static data
    courses.value = [
      { id: 1, name: 'Introduction to Computer Science', code: 'CS101', credits: 4, grade: 'A' },
      { id: 2, name: 'Web Application Development', code: 'CS202', credits: 4, grade: 'A-' },
      { id: 3, name: 'Database Systems', code: 'CS303', credits: 3, grade: 'B+' },
      { id: 4, name: 'Data Structures & Algorithms', code: 'CS204', credits: 4, grade: 'A' },
      { id: 5, name: 'User Interface Design', code: 'CS105', credits: 3, grade: 'A-' }
    ];
  } finally {
    loading.value = false;
  }
});

// Step 111: Computed filtered property
const filteredCourses = computed(() => {
  const term = searchTerm.value.toLowerCase().trim();
  return courses.value.filter(course =>
    course.name.toLowerCase().includes(term) ||
    course.code.toLowerCase().includes(term)
  );
});

// Step 118: Handle click to trigger Pinia enrollment store
const handleEnroll = (courseId) => {
  const course = courses.value.find(c => c.id === courseId);
  if (course) {
    store.enroll(course);
  }
};
</script>

<template>
  <div class="courses-page">
    <div class="courses-header">
      <h2>Available Courses</h2>
      <div class="courses-controls">
        <!-- Step 111: Bind input using v-model -->
        <input 
          type="text" 
          class="search-input" 
          placeholder="Search courses..." 
          v-model="searchTerm"
        />
      </div>
    </div>

    <div v-if="loading" class="loading-indicator">
      Loading course catalog...
    </div>

    <div v-else class="course-grid">
      <!-- Step 110: Render CourseCard for each course using v-for -->
      <CourseCard 
        v-for="course in filteredCourses" 
        :key="course.id"
        :id="course.id"
        :name="course.name"
        :code="course.code"
        :credits="course.credits"
        :grade="course.grade"
        :isEnrolled="store.enrolledCourses.some(c => c.id === course.id)"
        @enroll="handleEnroll"
      />

      <div v-if="filteredCourses.length === 0" class="no-results">
        No courses found matching the search criteria.
      </div>
    </div>
  </div>
</template>
