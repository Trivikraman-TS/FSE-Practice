<script setup>
import { defineProps, defineEmits } from 'vue';

// Step 108: Define Props
const props = defineProps({
  id: Number,
  name: String,
  code: String,
  credits: Number,
  grade: String,
  isEnrolled: Boolean
});

// Emits to notify parent view on enroll
const emit = defineEmits(['enroll']);
</script>

<template>
  <article :class="['course-card', { enrolled: isEnrolled }]">
    <div class="card-tag">{{ credits >= 4 ? 'Core' : 'Elective' }}</div>
    <h3>{{ name }}</h3>
    <p class="course-desc">This is a Vue Composition API course component for {{ name }} ({{ code }}).</p>
    
    <div class="card-links">
      <router-link :to="'/courses/' + id" class="detail-link">View Details &rarr;</router-link>
    </div>

    <div class="card-footer">
      <span class="course-code">{{ code }}</span>
      <span class="course-credits">{{ credits }} Credits</span>
      <button 
        v-if="!isEnrolled" 
        class="btn-card btn-enroll" 
        @click="emit('enroll', id)"
      >
        Enroll
      </button>
      <button 
        v-else 
        class="btn-card btn-enrolled" 
        disabled
      >
        Enrolled
      </button>
    </div>
  </article>
</template>

<style scoped>
/* Scoped styles are left blank to rely on our main global index.css rules */
</style>
