<template>
  <div class="overflow">
    <router-view/>
  </div>
  <footer-component></footer-component>
</template>

<script>
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  components: {
    FooterComponent
  }
}
</script>

<style>
body {
  font-family: Plus Jakarta Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

button{
  font-family: Plus Jakarta Sans;
}

.overflow{
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 100px;
}

.ellipsis{
  text-overflow: ellipsis;
  overflow: hidden; 
  width: 200px; 
  height: 1.6em; 
  white-space: nowrap;
}

.flex{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
