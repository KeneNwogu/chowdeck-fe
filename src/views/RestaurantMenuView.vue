<template>
  <div class="container">
    <div v-if="restaurant">
      <div class="restaurant-details">
        <div class="flex">
          
          <p class="ellipsis">
            <span><i class="uil uil-arrow-left" style="font-size: 1.3em;"></i></span>
            {{ restaurant.name }}
          </p>
          <div class="icons flex" style="width: 15%; margin-right: 15px">
            <div><i class="uil uil-share-alt"></i></div>
            <div><i class="uil uil-heart" style="font-size: 1.2em"></i></div>
            <div><i class="uil uil-search"></i></div>
          </div>
        </div>
      </div>
      <div class="menu">
        <div v-for="item in menu" :key="item.id">
          <MenuItem :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuItem from "@/components/MenuItem.vue";

export default {
  components: {
    MenuItem,
  },
  data() {
    return {
      menu: [],
      restaurant: {},
    };
  },
  beforeMount() {
    this.fetchMenu();
  },
  methods: {
    fetchMenu() {
      fetch(
        `${process.env.VUE_APP_API_URL}/restaurants/${this.$route.params.id}/menus`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.menu);
          this.menu = data.menus;
          this.restaurant = data.restaurant;
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>

<style scoped>
.container {
  font-size: 0.85em;
}

.icons div:not(:last-child) {
  margin-right: 10px;
}

.restaurant-details{
    margin-bottom: 20px;
    font-weight: 700;
}
</style>
