<template>
  <div class="home">
    <p class="intro-text">What would you like to eat?</p>
    <div class="categories">
      <RestaurantCarousel category="Exclusive to Eat" />
      <RestaurantCarousel category="Family Meals" />
      <RestaurantCarousel category="Breakfast and Brunch" />
    </div>

    <div class="restaurants">
      <template v-if="restaurants.length">
        <RestaurantComponent 
          v-for="restaurant in restaurants" :key="restaurant.id"
          :restaurant="restaurant"
          />
      </template>
      <template v-else>
            <div class="loader">
              <div class="animate-shimmer header"></div>
              <div class="animate-shimmer content"></div>
            </div>
        </template>
    </div>
  </div>
</template>

<style scoped>
.intro-text {
  font-size: 16px;
  line: height 2px;
  color: var(--dark-green);
  font-weight: 700;
  margin-block: 25px 10px;
}
.categories{
  display:flex;
  flex-direction: column;
  gap:15px;
}
.restaurants{
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
}
.restaurants .restaurant-item{
  margin-top: 10px;
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
      restaurants: [],
      fetching:true
    };
  },
  beforeMount() {
    this.fetchRestaurants();
  },
  methods: {
    fetchRestaurants() {
      this.fetching = true;
      fetch(`${process.env.VUE_APP_API_URL}/restaurants`)
        .then((response) => response.json())
        .then((data) => {
          this.restaurants = data.restaurants;
        })
        .catch((error) => console.error(error))
        .finally(() => this.fetching = false)
    },
  },
};
</script>
