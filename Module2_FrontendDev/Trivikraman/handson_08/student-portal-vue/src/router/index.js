import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CoursesView from '../views/CoursesView.vue';
import ProfileView from '../views/ProfileView.vue';
import CourseDetailView from '../views/CourseDetailView.vue';

// Step 112: Define Vue Router routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/courses',
    name: 'courses',
    component: CoursesView
  },
  {
    path: '/courses/:id',
    name: 'course-detail',
    component: CourseDetailView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Step 116: Add a navigation guard logging routes
router.beforeEach((to, from, next) => {
  console.log(`[Vue Router Guard] Navigating to: ${to.path}`);
  next();
});

export default router;
