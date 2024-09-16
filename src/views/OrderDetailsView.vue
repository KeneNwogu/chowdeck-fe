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
    <OrderItem v-for="item in items" :key="item.stage" :item="item" />
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
import { useOrderTimelineStream } from "@/composables/useOrderTimelineStream";
import axios from "axios";


let orderTimelineStream = null;

const price = ref(null);
const formatPrice = usePriceFormatter();
const loading = ref(true);

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const items = ref([]);
const timelines = ref([
    {
        "stage": 1,
        "name": "Order received by vendor",
        "completed": false,
    },
    {
        "stage": 2,
        "name": "Vendor is preparing your order.",
        "completed": false,
    },
    {
        "stage": 3,
        "name": "Rider has accepted your order.",
        "completed": false,
    },
    {
        "stage": 4,
        "name": "Rider at vendor.",
        "completed": false,
    },
    {
        "stage": 5,
        "name": "Rider has picked up your order.",
        "completed": false,
    },
    {
        "stage": 6,
        "name": "Your order has arrived.",
        "completed": false,
    }
]);
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
      loading.value = false;
      items.value = response.data.orderItems.map((item) => ({
        ...item.menu,
        quantity: item.quantity,
      }));

      price.value = response.data.totalAmount;
      let timelineData = response.data.timeline.sort((a, b) => a.stage - b.stage);
        timelines.value.forEach((timeline) => {
            if(timelineData[timeline.stage - 1]){
                timelines.value[timeline.stage - 1] = timelineData[timeline.stage - 1];
            }
        });

      restaurant.value = response.data.restaurant;
      // if order is in progress and user has completed payment
      if(response.data.status === "in_progress" && response.data.paymentStatus !== "pending"){
        orderTimelineStream = useOrderTimelineStream();
        orderTimelineStream.initialize();
        orderTimelineStream.setEventListener((event) => {
            let data = event.data;
            data = JSON.parse(data);
            let timeline = {
                id: data.Id,
                stage: data.Stage,
                name: data.Name,
                completed: data.Completed,
                createdAt: data.CreatedAt,
            };

            if(data.OrderId === route.params.id){
                timelines.value[timeline.stage - 1] = timeline;
            }
        });
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        userStore.logout();
        router.push({ name: "profile" });
      }

      router.push({ name: "orders" });
    });
});
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
