<template>
    <div class="container">
        <div class="search-bar">
            <div><i class="uil uil-search"></i></div>
            <input type="text" 
                placeholder="Search for restaurants or dishes"
                @input="search($event)"
            >
        </div>

        <div class="search-term" v-if="results.length && !loading">
            <p>{{ results.length }} result(s) for "{{ searchTerm }}"</p>
            <p style="color: tomato;" @click="clearSearch">Clear search</p>
        </div>

        <div v-if="loading" class="loading-state">
            <p>Loading...</p>
        </div>

        <div class="search-results" v-else-if="results.length">
            <RestaurantComponent  v-for="restaurant in results" :key="restaurant.id" :restaurant="restaurant" />
        </div>

        <div class="no-results" v-else-if="searchTerm">
            <p>No results found</p>
        </div>

        <div class="prompt-to-search" v-else>
            <p>Search for restaurants or dishes</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { debounce } from 'lodash';
import RestaurantComponent from '@/components/RestaurantComponent.vue'

let results = ref([])
let searchTerm = ref('')
let loading = ref(false)

const searchApi = async (query) => {
    loading.value = true

    if (!query) {
        loading.value = false
        return
    }
    
    const response = await fetch(`${process.env.VUE_APP_API_URL}/restaurants?search=${query}`)
    const data = await response.json()
    results.value = data.restaurants
    searchTerm.value = query
    loading.value = false
}

const search = debounce((e) => {
    searchApi(e.target.value)
}, 500)


const clearSearch = () => {
    results.value = []
    searchTerm.value = ''
    loading.value = false
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
    width: 90%;
    background-color: #e0e0e0;
    border-radius: 8px;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
}

.search-bar input{
    width: 80%;
    height: 100%;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    font-size: 0.8em;
    margin-left: 10px;
    background: none;
    outline: none;
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

.loading-state, .no-results, .prompt-to-search {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 0.8em;
    height: 60vh;
}
</style>