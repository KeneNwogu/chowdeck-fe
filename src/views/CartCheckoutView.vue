<template>
  <div>
    <div class="checkout-header">
        <h3><span><i class="uil uil-arrow-left" style="font-size: 1.1em;"></i></span> Checkout</h3>
      <!-- <div class="checkout-nav">
        <div class="nav-item">
          <p>Your Order</p>
          <div class="nav-bar"></div>
        </div>
        <div class="nav-item">
          <p>Delivery & Payment</p>
          <div class="nav-bar"></div>
        </div>
      </div> -->
    </div>

    <div class="order-summary">
      <div class="heading"><p>Order Summary</p></div>
      <div>
        <div class="restaurant">
          <div class="restaurant-header">
            <div class="restaurant-image">
              <img :src="restaurant.image" alt="restaurant" />
            </div>
            <div class="order-details">
              <p class="ellipsis">{{ restaurant.name }}</p>
              <p>
                <span
                  >{{ items.length }}
                  {{ items.length == 1 ? "item" : "items" }}</span
                >
                <span style="margin: 0 2px; font-weight: 500">
                  <i class="uil uil-circle" style="font-size: 0.5em"></i>
                </span>
                <span>₦{{ price }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="items">
            <div class="flex" v-for="item in items" :key="item.id">
                <div style="margin-top: 12px;">
                    <span><i class="uil uil-rocket"></i></span> 
                    <span>{{ item.name }}</span>
                    <p class="item-price">₦{{ item.price }}</p>
                </div>
                <p>Quantity: {{ item.quantity }}</p>
            </div>
        </div>
      </div>
    </div>

    <footer>
        <p>By proceeding, you agree to our <span>Terms of Use</span> and <span>Privacy Policy</span></p>
        <button class="checkout-btn">
            <p>Make Payment</p>
            <p>₦{{ price }}</p>
        </button>
    </footer>
  </div>
</template>

<script>
import { mapState } from "pinia"
import { useCartStore } from "@/store"

export default {
    beforeMount(){
        this.items = this.cart.filter(i => i.restaurant.id == this.$route.params.id)
        if(this.items.length) this.restaurant = this.items[0].restaurant;
        this.price = this.items.reduce((acc, i) => acc + i.price * i.quantity, 0)
    },
    data(){
        return {
            items: [],
            restaurant: {},
            price: 0
        }
    },
    computed: {
        ...mapState(useCartStore, ['cart'])
    }
}
</script>

<style scoped>
.restaurant-image img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.restaurant-header{
    display: flex;
    align-items: center;
    margin-top: 20px;
}

.restaurant-header p{
    margin: 0;
}

.order-details{
    margin-left: 10px;
}

.order-summary .heading{
    padding: 5px;
    /* background: rgb(212, 212, 212); */
    width: 100vw;
    margin: 0 auto;
    /* position: absolute; */
    /* left: 0; */
    font-size: 1.2em;
    color: black;
}

.items{
    margin-top: 20px;
}

.item-price{
    margin-left: 12px;
    font-weight: 200;
    color: rgb(139, 139, 136);
}

footer{
    /* position: absolute;
    bottom: 90px; */
    text-align: center;
    font-size: 0.85em;
    width: 100%;
    margin-top: 50vh;
}

footer p > span{
    color: rgb(118, 209, 118);
    text-decoration: underline;
}

footer .checkout-btn{
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 1.05em;
    border: none;
    outline: none;
    background: rgb(9, 70, 9);
    color: white;
    border-radius: 5px;
}
</style>
