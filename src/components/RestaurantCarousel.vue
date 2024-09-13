<template>
    <div>
        <template v-if="!fetching && restaurants.length">
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
        </template>
        <template v-else>
            <div class="loader">
                <div class="animate-shimmer header"></div>
                <div class="animate-shimmer content"></div>
            </div>
        </template>
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
            restaurants: [],
            fetching:true
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
        fetchRestaurants() {
            this.fetching = true;
            fetch(`${process.env.VUE_APP_API_URL}/restaurants?category=${this.category}`)
            .then(response => response.json())
            .then(data => {
                this.restaurants = data.restaurants
            })
            .catch(error => console.error(error))
            .finally(() => this.fetching = false)
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
    margin-bottom: 20px;
}

.carousel .restaurant-item{
    margin-right: 20px;
}
.carousel > div:first-child {
    margin-right: 10px;
}
</style>