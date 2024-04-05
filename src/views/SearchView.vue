<template>
    <div class="container">
        <div class="search-bar">
            <div><i class="uil uil-search"></i></div>
            <input type="text" placeholder="Search for restaurants or dishes">
        </div>

        <div class="search-term" v-if="results.length">
            <p>1 result for "pastries"</p>
            <p style="color: tomato;">Clear search</p>
        </div>

        <div class="search-results" v-if="results.length">
            <RestaurantComponent />
            <RestaurantComponent />
            <RestaurantComponent />
            <RestaurantComponent />
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
            results: []
        }
    },
}
</script>

<style scoped>
/* .container{
    width: 95%;
    margin: 0 auto;
} */
.search-bar{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
}
.search-bar input{
    width: 80%;
    height: 100%;
    padding: 10px;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    font-size: 1.2em;
    margin-left: 10px;
}
.search-results{
    margin-top: 20px;
}

.search-term{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 0.8em;
    font-weight: bold;
}

.restaurant-item{
    margin-right: 0;
}
</style>