<template>
  <div class="home">
    <div class="categories">
      <RestaurantCarousel category="Exclusive to Eat" />
      <RestaurantCarousel category="Family Meals" />
      <RestaurantCarousel category="Breakfast and Brunch" />
    </div>

    <div class="restaurants" v-if="restaurants.length">
      <RestaurantComponent 
      v-for="restaurant in restaurants" :key="restaurant.id"
      :restaurant="restaurant"
      />
    </div>
  </div>
</template>

<style scoped>
.restaurants{
  display: flex;
  flex-direction: column;
}
.restaurants .restaurant-item{
  margin-block: 10px 65px;
}
</style>

<script>
import RestaurantCarousel from "@/components/RestaurantCarousel.vue";
import RestaurantComponent from "@/components/RestaurantComponent.vue";

export default {
  name: "HomeView",
  components: {
    RestaurantCarousel,
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
          this.restaurants = data.restaurants;
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>
