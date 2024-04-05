<template>
    <div class="container">
        <p>Featured</p>
    </div>
    <div class="carousel">
        <RestaurantComponent />
        <RestaurantComponent />
    </div>
</template>


<script>
import RestaurantComponent from '@/components/RestaurantComponent.vue'
export default {
    components: {
        RestaurantComponent
    }
}
</script>


<style scoped>
.container {
    font-size: 1.2em;
    font-weight: bold;
}
.carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    padding: 10px 0;
    margin-bottom: 50px;
}

.carousel > div:first-child {
    margin-right: 10px;
}
</style>