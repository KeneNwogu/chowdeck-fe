<template>
  <div class="order-container">
    <div>
      <p class="name">{{ order.name }}</p>
      <p class="quantity">Total Quantity: {{ order.quantity }}</p>
      <p class="quantity">
        Total Price:{{ formatPrice(order.totalAmount) }}
      </p>

      <router-link :to="{ name: 'order_details', params: { id: order.id }}" class="btn btn-primary">
        View Order
      </router-link>
    </div>

    <div>
      <img class="productImg" :src="order.image" alt="product" />
    </div>
  </div>
</template>


<script setup>
import { usePriceFormatter } from "@/composables/usePriceFormatter";
import { defineProps } from "vue";

defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const formatPrice = usePriceFormatter();
</script>


<style scoped>
.btn{
    background-color: white;
    color: var(--dark-green);
    border: 1px solid var(--dark-green);
    padding: 7px 13px;
    border-radius: 5px;
    text-decoration: none;
    margin-top: 10px;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
}
</style>