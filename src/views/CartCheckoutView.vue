<template>
  <div class="container">
    <div class="header-container">
      <p class="header-text">Checkout Summary</p>
    </div>

    <section class="restaurant-info" style="margin-bottom: 40px; margin-top: 40px;">
      <div>
        <div>
          <p class="text">{{ restaurant.name }}</p>
          <p style="font-size: 14px; font-weight: 400; color: #000000ff">
            {{ restaurant.address }}
          </p>
        </div>
      </div>
    </section>

    <div class="order-summary">
      <p class="text">Your Order</p>

      <section>
        <div class="order-container" v-for="item in items" :key="item.id">
          <div>
            <p class="name">{{ item.name }}</p>
            <p class="quantity">Quantity: {{ item.quantity }}</p>
            <p class="quantity">
              Price: {{formatPrice(item.price)}} each, Total: {{formatPrice(item.price * item.quantity)}}
            </p>
          </div>

          <div>
            <img class="productImg" :src="item.image" alt="product" />
          </div>
        </div>
      </section>
    </div>

    <div class="checkout-details">
      <p class="text">Total Price</p>
      <p class="sub-text">Sub-total: {{ formatPrice(price) }}</p>
      <p class="sub-text">Delivery Fee: {{ formatPrice(500) }}</p>
      <p class="sub-text">Tax: {{ formatPrice(0) }}</p>
      <p class="sub-text">Total: {{ formatPrice(price + 500) }}</p>
      <button class="checkout-btn">
        <span><i class="uil uil-check-circle" style="font-size: 1.2em;"></i></span>
        <span>Complete Order</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useCartStore } from "@/store";
// import { formatPrice as priceFormatter } from "lodash"

import { usePriceFormatter } from "@/composables/usePriceFormatter";

export default {
  beforeMount() {
    this.items = this.cart.filter(
      (i) => i.restaurant.id == this.$route.params.id
    );
    if (this.items.length) this.restaurant = this.items[0].restaurant;
    this.price = this.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  },
  data() {
    return {
      items: [],
      restaurant: {},
      price: 0,
      unitPrice: 0,
    };
  },
  computed: {
    ...mapState(useCartStore, ["cart"]),
  },
  methods: {
    formatPrice(price) {
      let priceFormatter = usePriceFormatter();
      return priceFormatter(price);
    },
  },
};
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

.header-icon {
  width: 24px;
  height: 24px;
  fill: #000000ff; /* black */
}

.header-text {
  font-size: 18px;
  line-height: 28px;
  font-weight: 700;
  color: #000000ff; /* black */
  text-align: center;
}

.productImg{
  border-radius: 4px;
}
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

.checkout-details {
  margin-top: 40px;
}

.checkout-btn {
  margin-top: 20px;
  width: 100%;
  height: 48px;
  /* padding: 0 px;  */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  line-height: 28px;
  font-weight: 400;
  color: #ffffffff; /* white */
  background: rgb(15, 56, 15); /* primary-500 */
  opacity: 1;
  border: none;
  border-radius: 6px; /* border-l */
  gap: 8px;
}

</style>
