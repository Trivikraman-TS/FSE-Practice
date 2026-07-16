<template>
  <div class="home-page text-center">
    <div class="hero-landing">
      <h1 class="portal-title">Empower Your Learning Journey</h1>
      <p class="hero-subtext">
        Access your courses, track your graduation checkpoints, review active grades, and configure your profile—all within the next-generation Vue 3 Student Portal.
      </p>
      <div class="action-buttons">
        <router-link to="/courses" class="btn-primary-link">Browse Catalog</router-link>
        <router-link to="/profile" class="btn-secondary-link">View Profile</router-link>
      </div>
    </div>
    
    <div class="features-grid">
      <div class="feature-card">
        <span class="feature-icon">📚</span>
        <h4>Composition API</h4>
        <p>Built using Vue 3 script setup ref models and computed properties.</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🍍</span>
        <h4>Pinia Store</h4>
        <p>State stores manage selections globally without prop drilling.</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🧭</span>
        <h4>Vue Router</h4>
        <p>Navigation guards log all client-side page transfers dynamically.</p>
      </div>
    </div>
  </div>
</template>
