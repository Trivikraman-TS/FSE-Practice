<script setup>
import { ref } from 'vue';
import { useEnrollmentStore } from '../stores/enrollment';

const store = useEnrollmentStore();

// Local profile state refs
const profileName = ref('Trivikraman');
const profileEmail = ref('trivikraman@example.edu');
const profileSemester = ref(6);

const handleRemove = (id) => {
  store.unenroll(id);
};
</script>

<template>
  <div class="profile-page-container">
    <div class="layout-split">
      
      <!-- Student profile details form -->
      <section class="profile-section">
        <h2>Student Profile</h2>
        <div class="profile-card">
          <form @submit.prevent>
            <div class="form-group">
              <label for="name-input">Full Name</label>
              <input 
                type="text" 
                id="name-input" 
                v-model="profileName"
                placeholder="Enter name..."
              />
            </div>

            <div class="form-group">
              <label for="email-input">Email Address</label>
              <input 
                type="email" 
                id="email-input" 
                v-model="profileEmail"
                placeholder="Enter email..."
              />
            </div>

            <div class="form-group">
              <label for="semester-input">Current Semester</label>
              <select id="semester-input" v-model="profileSemester">
                <option v-for="sem in [1,2,3,4,5,6,7,8]" :key="sem" :value="sem">
                  Semester {{ sem }}
                </option>
              </select>
            </div>
          </form>

          <div class="profile-preview">
            <h3>Real-time Preview</h3>
            <div class="preview-grid">
              <div><strong>Name:</strong> {{ profileName || '(Not set)' }}</div>
              <div><strong>Email:</strong> {{ profileEmail || '(Not set)' }}</div>
              <div><strong>Term:</strong> Semester {{ profileSemester }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pinia enrolled courses list (Step 119) -->
      <section class="enrolled-courses-section">
        <h2>Your Enrolled Courses</h2>
        
        <div class="enrolled-list-card">
          <div v-if="store.enrolledCourses.length === 0" class="no-enrollments-msg">
            <span class="info-icon">💡</span>
            <p>You are not currently enrolled in any courses. Browse the catalog to add courses.</p>
          </div>

          <div v-else>
            <!-- Step 119: Render list using v-for -->
            <ul class="enrolled-items-list">
              <li 
                v-for="course in store.enrolledCourses" 
                :key="course.id" 
                class="enrolled-item"
              >
                <div class="enrolled-item-details">
                  <span class="enrolled-item-code">{{ course.code }}</span>
                  <span class="enrolled-item-name">{{ course.name }}</span>
                  <span class="enrolled-item-credits">{{ course.credits }} Credits</span>
                </div>
                <button 
                  class="btn-remove" 
                  @click="handleRemove(course.id)"
                >
                  Remove
                </button>
              </li>
            </ul>
            
            <!-- Step 119: Credits summary footer -->
            <div class="credits-summary" style="margin-top: 1.5rem;">
              <p style="font-weight: 600; color: #10b981;">
                Total Credits Enrolled: {{ store.totalCredits }} Credits
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>
