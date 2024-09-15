<template>
  <div class="container" v-if="!loading">
    <div class="header-container">
      <p class="header-text">Order Details</p>
    </div>
  <section
    class="restaurant-info"
    style="margin-bottom: 40px; margin-top: 40px"
  >
    <div>
      <div>
        <p class="text">
          Order #{{ route.params.id.slice(0, 8).toUpperCase() }}
        </p>
        <p style="font-size: 14px; font-weight: 500; color: #000000ff">
          {{ restaurant.name }}
        </p>
        <p style="font-size: 14px; font-weight: 500; color: #000000ff">{{ restaurant.address }}</p>
      </div>
    </div>
  </section>

  <section class="order-timeline">
    <p class="text">Timeline</p>
    <OrderTimeline
      v-for="timeline in timelines"
      :key="timeline.stage"
      :timeline="timeline"
    />
  </section>

  <section class="order-summary">
    <p class="text">Order Summary</p>
    <OrderItem v-for="item in items" :key="item.id" :item="item" />
  </section>

  <div class="checkout-details" style="margin-top: 40px">
    <p class="text">Total Price</p>
    <p class="sub-text">Sub-total: {{ formatPrice(price) }}</p>
    <p class="sub-text">Delivery Fee: {{ formatPrice(500) }}</p>
    <p class="sub-text">Tax: {{ formatPrice(0) }}</p>
    <p class="sub-text">Total: {{ formatPrice(price + 500) }}</p>
    <!-- <button class="checkout-btn" @click="makeOrder">
      <template v-if="!completingOrder">
        <span
          ><i class="uil uil-check-circle" style="font-size: 1.2em"></i
        ></span>
        <span>Complete Order</span>
      </template>
      <div v-else class="loading-spinner"></div>
    </button> -->
  </div>
  </div>
</template>

<script setup>
import OrderItem from "@/components/OrderItem.vue";
import OrderTimeline from "@/components/OrderTimeline.vue";
import { usePriceFormatter } from "@/composables/usePriceFormatter";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store";
import axios from "axios";

const price = 9560;
const formatPrice = usePriceFormatter();
const loading = ref(true);

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const items = ref([]);
const timelines = ref([]);
const restaurant = ref(null);

// get data from api
onBeforeMount(() => {
  // fetch data from api
  axios
    .get(`${process.env.VUE_APP_API_URL}/orders/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      loading.value = false;
      items.value = response.data.orderItems.map((item) => ({
        ...item.menu,
        quantity: item.quantity,
      }));
      timelines.value = response.data.timeline.sort((a, b) => a.stage - b.stage);
      restaurant.value = response.data.restaurant;
    })
    .catch((error) => {
      console.error(error);
      loading.value = false;
      if (error.response.status === 401) {
        userStore.logout();
        router.push({ name: "profile" });
      }
    });
});

// const timelines = [
//   {
//     stage: 1,
//     title: "Order Placed",
//     name: "Your order has been received",
//     time: "1:40pm",
//     completed: true,
//   },
//   {
//     stage: 2,
//     title: "Order Confirmed",
//     name: "Your order has been confirmed",
//     time: "1:45pm",
//     completed: true,
//   },
//   {
//     stage: 3,
//     title: "Order Prepared",
//     name: "Your order is being prepared",
//     time: "1:50pm",
//     completed: true
//   },
//   {
//     stage: 4,
//     title: "Order Delivered",
//     name: "Your order has been delivered",
//     time: "2:00pm",
//     completed: false
//   },
// ];
</script>

<style scoped>
.container {
  margin: 10px;
}

.text {
  /* font-family: Lexend;  */
  /* Heading */
  font-size: 17px;
  line-height: 30px;
  font-weight: 700;
  color: #000000ff; /* black */
  margin: 0;
}

.sub-text {
  font-size: 12px;
  line-height: 22px;
  font-weight: 400;
  color: #000000ff;
  margin: 2px 0;
}

.header-container {
  /* position: relative; 
  top: 52px;  */
  margin: 20px auto;
  height: 36px;
  background: #ffffff00; /* white */
  border-radius: 0px;
}

.header-text {
  font-size: 18px;
  line-height: 28px;
  font-weight: 700;
  color: #000000ff; /* black */
  text-align: center;
}

.timeline-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;
}

.timeline-item .content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.order-summary {
  margin-top: 40px;
}
</style>
