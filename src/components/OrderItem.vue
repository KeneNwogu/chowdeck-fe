<template>
  <div class="order-container">
    <div>
      <p class="name">{{ item.name }}</p>
      <p class="quantity">Quantity: {{ item.quantity }}</p>
      <p class="quantity">
        Price: {{ formatPrice(item.price) }} each, Total:
        {{ formatPrice(item.price * item.quantity) }}
      </p>
    </div>

    <div>
      <img class="productImg" :src="item.image" alt="product" />
    </div>
  </div>
</template>



<script setup>
import { usePriceFormatter } from "@/composables/usePriceFormatter";
import { defineProps } from "vue";

defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const formatPrice = usePriceFormatter();
</script>



<style>
.order-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  border-radius: 4px;
  box-shadow: 0px 0px 1px #171a1f, 0px 0px 2px #171a1f;
  /* padding-bottom: 10px; */
  padding: 10px;
  margin-bottom: 20px;
  width: 95%;
}

.order-container img {
  width: 112px;
  height: 149px;
  object-fit: cover;
}

.order-container .name {
  font-size: 14px;
  line-height: 22px;
  font-weight: 700;
}

.order-container .quantity {
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  color: #9095a1ff;
  margin: 3px;
}
</style>
