<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEnrollmentStore } from '../stores/enrollment';

const route = useRoute();
const router = useRouter();
const store = useEnrollmentStore();

const course = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    loading.value = true;
    const courseId = route.params.id; // Step 114: Access param using useRoute()
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${courseId}`);
    if (!response.ok) throw new Error("Course not found in catalog");
    const data = await response.json();
    
    course.value = {
      id: data.id,
      name: data.title.split(' ').slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      code: `CS${100 + data.id}`,
      credits: data.id % 2 === 0 ? 4 : 3,
      grade: data.id % 3 === 0 ? 'A' : (data.id % 3 === 1 ? 'A-' : 'B+'),
      description: data.body
    };
  } catch (err) {
    console.error(err);
    error.value = "Failed to load course details.";
  } finally {
    loading.value = false;
  }
});

const handleEnroll = () => {
  if (course.value) {
    // Enroll the course in Pinia
    store.enroll(course.value);
    // Step 115: Redirect to profile programmatically
    router.push('/profile');
  }
};
</script>

<template>
  <div class="course-detail-page">
    <div class="detail-header">
      <router-link to="/courses" class="btn-back">&larr; Back to Catalog</router-link>
    </div>

    <div v-if="loading" class="loading-indicator">
      Loading course details...
    </div>

    <div v-else-if="error" class="error-indicator">
      {{ error }}
    </div>

    <!-- Step 114: Display matching course details -->
    <div v-else-if="course" class="course-detail-card">
      <div class="detail-tag">{{ course.credits >= 4 ? 'Core Requirement' : 'Elective Requirement' }}</div>
      <h1 class="detail-title">{{ course.name }}</h1>
      
      <div class="detail-meta">
        <span class="meta-item"><strong>Course Code:</strong> {{ course.code }}</span>
        <span class="meta-item"><strong>Academic Credits:</strong> {{ course.credits }} Credits</span>
        <span class="meta-item"><strong>Grade:</strong> {{ course.grade }}</span>
      </div>

      <p class="detail-description">{{ course.description }}</p>

      <div class="detail-actions">
        <button 
          v-if="!store.enrolledCourses.some(c => c.id === course.id)"
          class="btn-primary" 
          @click="handleEnroll"
        >
          Enroll in Course
        </button>
        <button 
          v-else 
          class="btn-primary btn-enrolled-large" 
          disabled
        >
          Already Enrolled
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Relying on global stylesheet rules */
</style>
