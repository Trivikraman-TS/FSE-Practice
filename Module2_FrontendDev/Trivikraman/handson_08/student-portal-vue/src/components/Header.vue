<script setup>
import { useEnrollmentStore } from '../stores/enrollment';

// Step 120: Display count using store.enrolledCourses.length
const store = useEnrollmentStore();
</script>

<template>
  <header>
    <div class="logo">
      <router-link to="/" style="text-decoration: none; color: inherit;">
        <span class="logo-accent">Student</span>Portal
      </router-link>
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/" exact-active-class="active">Home</router-link>
        </li>
        <li>
          <router-link to="/courses" active-class="active">
            Courses
            <!-- Step 120: Reactive store length count -->
            <span v-if="store.enrolledCourses.length > 0" class="enrolled-badge">
              {{ store.enrolledCourses.length }}
            </span>
          </router-link>
        </li>
        <li>
          <router-link to="/profile" active-class="active">Profile</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* Relying on global stylesheet rules */
</style>
