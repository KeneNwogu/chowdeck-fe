<template>
  <div class="container">
      <main class="overflow">
        <router-view/>
      </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import './assets/css/global.css';
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  components: {
    FooterComponent
  }
}
</script>

<style>

</style>
