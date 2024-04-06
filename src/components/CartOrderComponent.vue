<template>
  <div class="container">
    <div class="order">
      <div class="restaurant-details">
        <div class="restaurant-header">
          <div class="restaurant-image">
            <img :src="item.restaurant.image" alt="restaurant" />
          </div>
          <div class="order-details">
            <p class="ellipsis">{{ item.restaurant.name }}</p>
            <p class="flex">
              <span>{{ item.cart.length }} {{ item.cart.length == 1 ? 'item' : 'items' }}</span>
              <span style="margin: 0 2px; font-weight: 500;">
                <i class="uil uil-circle" style="font-size: 0.5em;"></i>
              </span>
              <span>₦{{ price }}</span>
            </p>
          </div>
        </div>
        <div class="selection">
          <p>
            View Selection <span><i class="uil uil-angle-up"></i></span>
          </p>
        </div>
      </div>

      <div class="delivery-info">
        <div class="delivery-address">
          <p>
            <i
              class="uil uil-taxi"
              style="margin-right: 3px; font-size: 1.2em"
            ></i>
          </p>
          <p class="ellipsis">{{ item.restaurant.address }}</p>
        </div>
      </div>

      <div class="checkout">
        <button style="font-family: Plus Jakarta Sans">Checkout</button>
      </div>
      
      <div class="clear-selection">
        <p>Clear Selection</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      price: 0
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  beforeMount(){
    this.price = this.item.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  }
}
</script>

<style scoped>
.ellipsis{
  width: 95% !important;
}

.flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.container{
    width: 100%;
    margin: 0 auto;
}

.order {
  max-width: 100%;
  margin-bottom: 30px;
  border: 1px solid grey;
  border-radius: 6px;
  padding: 15px;
  font-size: 0.8em;
}

.restaurant-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.restaurant-header {
  display: flex;
  align-items: center;
  max-width: 80%;
}

.restaurant-image img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.delivery-info .delivery-address {
  display: flex;
  align-items: center;
}

.delivery-info p{
    max-width: 95%;
    word-wrap: break-word
}

.order-details{
    padding-left: 5px;
}
.order-details p:nth-child(2){
    margin-top: -10px;
}

.checkout button{
    width: 100%;
    padding: 8px;
    color: white;
    background-color: rgb(12 81 63);
    border-radius: 5px;
    border: none;
    outline: none;
}

.clear-selection{
    text-align: center;
    margin-top: 10px;
}
</style>
