<template>
  <div class="container p-4">
    <h2>Halaman Dashboard</h2>
  </div>
  <div class="container">
    <div v-if="this.$attrs.message_success_post.length > 0" class="alert alert-success">
      <span>{{ this.$attrs.message_success_post }}</span>
    </div>
  </div>
</template>
continer