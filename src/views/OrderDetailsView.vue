<template>
  <div class="container">
    <div class="header-container">
      <p class="header-text">Order Details</p>
    </div>
  </div>
  <section
    class="restaurant-info"
    style="margin-bottom: 40px; margin-top: 40px"
  >
    <div>
      <div>
        <p class="text">Order #000000</p>
        <p style="font-size: 14px; font-weight: 400; color: #000000ff">
          Gourmet Restaurant
        </p>
      </div>
    </div>
  </section>

  <section class="order-timeline">
    <p class="text">Timeline</p>
    <OrderTimeline v-for="timeline in timelines" :key="timeline.stage" :timeline="timeline" />
  </section>

  <section class="order-summary">
    <p class="text">Order Summary</p>
    <OrderItem v-for="item in items" :key="item.id" :item="item" />
  </section>

  <div class="checkout-details" style="margin-top: 40px;">
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
</template>

<script setup>
import OrderItem from "@/components/OrderItem.vue";
import OrderTimeline from "@/components/OrderTimeline.vue";
import { usePriceFormatter } from "@/composables/usePriceFormatter";

const price = 9560;

const formatPrice = usePriceFormatter()

const items = [
  {
    id: "e31581b9-57d6-43b7-9685-db4d068c7a67",
    amount: 9560,
    quantity: 4,
    menuId: "c45a6c71-c4fa-4c79-818b-0410037d9b94",
    orderId: "11ed081f-5d09-488b-970c-495d3df5416d",
    menu: {
      id: "c45a6c71-c4fa-4c79-818b-0410037d9b94",
      name: "Home Fries",
      category: "Picked for you",
      description: "",
      price: 2390,
      image:
        "https://images.unsplash.com/photo-1528279027-68f0d7fce9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODE5NjF8MHwxfHNlYXJjaHw5fHxmYXN0JTIwZm9vZHxlbnwwfHx8fDE3MTExMDE1MjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
      restaurantId: "001eedec-0601-4e41-b112-7e36c5e55e0a",
      createdAt: "2024-03-22T11:09:06.281208",
      restaurant: null,
    },
  },
].map((item) => ({ ...item.menu, quantity: item.quantity }));

const timelines = [
  {
    stage: 1,
    title: "Order Placed",
    name: "Your order has been received",
    time: "1:40pm",
    completed: true,
  },
  {
    stage: 2,
    title: "Order Confirmed",
    name: "Your order has been confirmed",
    time: "1:45pm",
    completed: true,
  },
  {
    stage: 3,
    title: "Order Prepared",
    name: "Your order is being prepared",
    time: "1:50pm",
    completed: true
  },
  {
    stage: 4,
    title: "Order Delivered",
    name: "Your order has been delivered",
    time: "2:00pm",
    completed: false
  },
];
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
