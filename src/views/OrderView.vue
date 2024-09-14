<template>
  <div class="nav-container">
    <div class="order-nav">
      <p>
        <span><i class="uil uil-arrow-left"></i></span> Orders
      </p>
      <p><button @click="clearCart" class="clear-cart" v-if="currentTab === 'cart'">Clear Cart</button></p>
    </div>

    <div class="nav" style="margin-top: -12px">
      <TabNavigation
        :tabs="tabs"
        :currentTab="currentTab"
        @updateTab="(value) => (currentTab = value)"
      />
    </div>
  </div>

  <div class="tab-content">
    <div v-if="currentTab == 'cart'">
      <CartOrderComponent
        v-for="item in groupedCart"
        :key="item.restaurant.id"
        :item="item"
      />
    </div>

    <div v-if="currentTab == 'ongoing'">
      <div class="ongoing-orders" v-if="user"></div>
      <div v-else>
        <p>Sign in to view ongoing orders</p>
      </div>
    </div>

    <div v-if="currentTab == 'completed'">
      <div class="completed-orders" v-if="user">
        <CompletedOrderComponent v-for="order in completedOrders" :key="order.id" :order="order" />
      </div>
      <div v-else>
        <p>Sign in to view completed orders</p>
      </div>
    </div>
  </div>
</template>

<script>
import CartOrderComponent from "@/components/CartOrderComponent.vue";
import CompletedOrderComponent from "@/components/CompletedOrderComponent.vue";
import TabNavigation from "@/components/TabNavigation.vue";
import { mapState, mapActions } from "pinia";
import { useCartStore, useUserStore } from "@/store";
import axios from "axios";

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
      completedOrders: [],
      ongoingOrders: [],
      fetchedOngoing: false,
      fetchedCompleted: false,
    };
  },
  computed: {
    ...mapState(useCartStore, ["groupedCart"]),
    ...mapState(useUserStore, ["user", "token"]),
  },
  methods: {
    ...mapActions(useCartStore, ["clearCart"]),
    fetchOrders(filter) {
      if (this.user) {
        axios
          .get(`${process.env.VUE_APP_API_URL}/orders?status=${filter}`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((res) => {
            if (filter == "completed") {
              this.completedOrders = res.data.orders;
              this.fetchedCompleted = true;
            } else {
              this.ongoingOrders = res.data.orders;
              this.fetchedOngoing = true;
            }
          })
          .catch(() => {
            // redirect to login
            let userStore = useUserStore();
            userStore.logout();

            this.$router.push({ name: "profile" });
          });
      }
    }
  },
  watch: {
    currentTab(value) {
      if (value == "ongoing" && !this.fetchedOngoing) {
        this.fetchOrders("in_progress");
      } else if (value == "completed" && !this.fetchedCompleted) {
        this.fetchOrders("completed");
      }
    },
  },
};
</script>

<style scoped>
.nav-container {
  margin: 0 auto;
  width: 100%;
  /* margin-bottom: 20px; */
}
.order-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.clear-cart {
  background: rgb(219, 219, 219);
  border-radius: 6px;
  border: none;
  outline: none;
  padding: 5px 10px;
  color: var(--text)
}
</style>
