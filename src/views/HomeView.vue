<template>
  <div class="home">
    <div class="categories">
      <!-- <RestaurantCarousel />
      <RestaurantCarousel />
      <RestaurantCarousel />
      <RestaurantCarousel /> -->
    </div>

    <div class="restaurants" v-if="restaurants.length">
      <RestaurantComponent 
      v-for="restaurant in restaurants" :key="restaurant.id"
      :restaurant="restaurant"
      />
    </div>
  </div>
</template>

<script>
// import RestaurantCarousel from "@/components/RestaurantCarousel.vue";
import RestaurantComponent from "@/components/RestaurantComponent.vue";

export default {
  name: "HomeView",
  components: {
    // RestaurantCarousel,
    RestaurantComponent,
  },
  data() {
    return {
      restaurants: []
    };
  },
  beforeMount() {
    this.fetchRestaurants();
  },
  methods: {
    fetchRestaurants() {
      fetch(`${process.env.VUE_APP_API_URL}/restaurants`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.restaurants)
          this.restaurants = data.restaurants;
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>
