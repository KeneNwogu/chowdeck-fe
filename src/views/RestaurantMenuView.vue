<template>
  <div class="container">
    <div v-if="restaurant">
      <div class="restaurant-details">
        <div class="flex-space">
          
          <p class="ellipsis">
            <span><i class="uil uil-arrow-left" style="font-size: 1.3em;"></i></span>
            {{ restaurant.name }}
          </p>
          <div class="icons flex-space" style="width: 15%; margin-right: 15px">
            <div><i class="uil uil-share-alt"></i></div>
            <div><i class="uil uil-heart" style="font-size: 1.2em"></i></div>
            <div><i class="uil uil-search"></i></div>
          </div>
        </div>
      </div>
      <div class="menu">
        <div v-for="item in menu" :key="item.id">
          <MenuItem :item="item" @openAddCartModal="(value) => openCartModal(value)" />
        </div>
      </div>
    </div>
    
    <AddToCartModal v-if="showCartModal" :modalItem="modalItem" @closeCartModal="showCartModal = false" />
  </div>
</template>

<script>
import MenuItem from "@/components/MenuItem.vue";
import AddToCartModal from "@/components/AddToCartModal.vue";

export default {
  components: {
    MenuItem,
    AddToCartModal
  },
  data() {
    return {
      menu: [],
      restaurant: {},
      modalItem: null,
      showCartModal: false
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
          this.menu = data.menus.map(menu => ({ ...menu, restaurant: data.restaurant }));
          this.restaurant = data.restaurant;
        })
        .catch((error) => console.error(error));
    },
    openCartModal(menuId){
      let menuItem = this.menu.find(item => item.id == menuId)
      if(!menuItem) return;
      this.modalItem = menuItem;
      this.showCartModal = true;
    }
  },
};
</script>

<style scoped>
.ellipsis{
  text-transform: capitalize
}
.icons div:not(:last-child) {
  margin-right: 10px;
}

.restaurant-details{
    margin-bottom: 15px;
    font-weight: 700;
}

.menu{
  padding-bottom: 65px;
}
</style>
