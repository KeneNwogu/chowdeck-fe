<template>
  <div class="nav-container">
    <div class="order-nav">
      <p>
        <span><i class="uil uil-arrow-left"></i></span> Orders
      </p>
      <p><button class="clear-cart">Clear Cart</button></p>
    </div>

    <div class="nav" style="margin-top: -12px;">
      <TabNavigation
        :tabs="tabs"
        :currentTab="currentTab"
        @updateTab="(value) => (currentTab = value)"
      />
    </div>
  </div>

  <div class="tab-content">
    <div v-if="currentTab == 'cart'">
      <CartOrderComponent v-for="item in groupedCart" :key="item.restaurant.id" :item="item" />
    </div>

    <div v-if="currentTab == 'completed'">
      <CompletedOrderComponent />
      <CompletedOrderComponent />
      <CompletedOrderComponent />
      <CompletedOrderComponent />
      <CompletedOrderComponent />
      <CompletedOrderComponent />
    </div>
  </div>
</template>

<script>
import CartOrderComponent from "@/components/CartOrderComponent.vue";
import CompletedOrderComponent from "@/components/CompletedOrderComponent.vue";
import TabNavigation from "@/components/TabNavigation.vue";
import { mapGetters } from "pinia";
import { useCartStore } from "@/store";

export default {
  components: {
    CartOrderComponent,
    CompletedOrderComponent,
    TabNavigation,
  },
  data() {
    return {
      tabs: [
        { name: "My Cart", action: "cart" },
        { name: "Ongoing", action: "ongoing" },
        { name: "Completed", action: "completed" },
      ],
      currentTab: "cart",
    };
  },
  computed: {
    ...mapGetters(useCartStore, ['groupedCart'])
  }
};
</script>

<style scoped>
.nav-container {
    margin: 0 auto;
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 20px;
}
.order-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.clear-cart {
  background: rgb(219, 219, 219);
  color: rgb(1, 41, 1);
  border-radius: 6px;
  border: none;
  outline: none;
  padding: 5px 10px;
}
</style>
