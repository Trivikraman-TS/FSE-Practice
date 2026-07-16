import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// Step 117: Define Pinia store in Composition API style
export const useEnrollmentStore = defineStore('enrollment', () => {
  // State
  const enrolledCourses = ref([]);

  // Getter
  const totalCredits = computed(() => {
    return enrolledCourses.value.reduce((sum, course) => sum + course.credits, 0);
  });

  // Actions
  function enroll(course) {
    if (!enrolledCourses.value.some(c => c.id === course.id)) {
      enrolledCourses.value.push(course);
    }
  }

  function unenroll(courseId) {
    enrolledCourses.value = enrolledCourses.value.filter(c => c.id !== courseId);
  }

  // Clear store action
  function $reset() {
    enrolledCourses.value = [];
  }

  return {
    enrolledCourses,
    totalCredits,
    enroll,
    unenroll,
    $reset
  };
});
