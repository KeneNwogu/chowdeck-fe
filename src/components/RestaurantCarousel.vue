<template>
    <div v-if="restaurants.length">
        <div class="container">
            <p>{{ category }}</p>
        </div>
        <div class="carousel">
            <RestaurantComponent 
            v-for="restaurant in restaurants" 
            :key="restaurant.id"
            :restaurant="restaurant"
            />
        </div>
    </div>
</template>


<script>
import RestaurantComponent from '@/components/RestaurantComponent.vue'
export default {
    components: {
        RestaurantComponent
    },
    data(){
        return {
            restaurants: []
        }
    },
    props: {
        category: {
            type: String,
            required: true
        }
    },
    beforeMount(){
        this.fetchRestaurants()
    },
    methods: {
        fetchRestaurants(){
            fetch(`${process.env.VUE_APP_API_URL}/restaurants?category=${this.category}`)
            .then(response => response.json())
            .then(data => {
                this.restaurants = data.restaurants
            })
            .catch(error => console.error(error))
        }
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

.carousel .restaurant-item{
    margin-right: 20px;
}
.carousel > div:first-child {
    margin-right: 10px;
}
</style>