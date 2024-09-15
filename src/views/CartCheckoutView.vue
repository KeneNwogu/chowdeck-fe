<template>
  <div class="container">
    <div class="header-container">
      <p class="header-text">Checkout Summary</p>
    </div>

    <section
      class="restaurant-info"
      style="margin-bottom: 40px; margin-top: 40px"
    >
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
              Price: {{ formatPrice(item.price) }} each, Total:
              {{ formatPrice(item.price * item.quantity) }}
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
      <button class="checkout-btn" @click="makeOrder">
        <template v-if="!completingOrder">
            <span
            ><i class="uil uil-check-circle" style="font-size: 1.2em"></i
          ></span>
          <span>Complete Order</span>
        </template>
        <div v-else class="loading-spinner"></div>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useCartStore, useUserStore } from "@/store";
// import { formatPrice as priceFormatter } from "lodash"
import axios from "axios";

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
      completingOrder: false,
      checkoutLink: "",
      orderRef: ""
    };
  },
  computed: {
    ...mapState(useCartStore, ["cart"]),
    ...mapState(useUserStore, ["token"]),
  },
  methods: {
    formatPrice(price) {
      let priceFormatter = usePriceFormatter();
      return priceFormatter(price);
    },
    makeOrder() {
      // Make order
      // get order items
      this.completingOrder = true
      let orderItems = this.items.map((i) => {
        return {
          menuId: i.id,
          quantity: i.quantity,
        };
      });

      axios
        .post(
          `${process.env.VUE_APP_API_URL}/orders`,
          {
            restaurantId: this.restaurant.id,
            orderItems,
          },
          { headers: { Authorization: `Bearer ${this.token}` } }
        )
        .then((response) => {
          let data = response.data
          let cartStore = useCartStore();
          cartStore.$state.cart = cartStore.$state.cart.filter(
            (i) => i.restaurant.id != this.$route.params.id
          );
          cartStore.$state.restaurants = cartStore.$state.cart.filter(
            (i) => i.restaurant.id != this.$route.params.id
          );

          // redirect to payment link
          this.checkoutLink = data.order.paymentLink;
          window.open(data.order.paymentLink, '_blank');
          this.$router.push({ name: "order_details", params: { id: data.order.id } });
        })
        .catch((error) => {
          // if error is 401, redirect to login
          if (error.response.status == 401) {
            let userStore = useUserStore();
            userStore.logout();
            this.$router.push({ name: "profile" });
          }
        }).finally(()=>this.completingOrder = false)

      // remove restaurant items from cart
    },
  },
  // watch: {
  //   checkoutLink(value){
  //     if(value){
  //       let context = this;
  //       setTimeout(() => {
  //         context.$refs.checkout.addEventListener('onCloseWindow', function () { 
  //           console.log('window closed')
  //           context.$router.push({ name: "profile" });
  //         }, false);
  //       }, 1000);
        
  //     }
  //   }
  // }
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
  margin-block: 40px 65px;
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


/* HTML: <div class="loader"></div> */
.loading-spinner {
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 4px solid white;
  animation:
    l20-1 0.8s infinite linear alternate,
    l20-2 1.6s infinite linear;
}
@keyframes l20-1{
   0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
   12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
   25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
   50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
   100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
}
@keyframes l20-2{ 
  0%    {transform:scaleY(1)  rotate(0deg)}
  49.99%{transform:scaleY(1)  rotate(135deg)}
  50%   {transform:scaleY(-1) rotate(0deg)}
  100%  {transform:scaleY(-1) rotate(-135deg)}
}

.payment-checkout{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  margin-top: 20px;
}
</style>
