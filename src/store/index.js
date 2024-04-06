import { defineStore } from 'pinia'


export const useCartStore = defineStore('cart', {
  persist: true,
  state: () => ({ cart: [], restaurants: [] }),
  actions: {
    addToCart(cartItem){
      console.log(cartItem);
      let existingRestaurant = this.restaurants.find(r => r.id == cartItem.restaurant.id)
      if(!existingRestaurant) this.restaurants.push(cartItem.restaurant)

      let existingCartItem = this.cart.findIndex(item => item.id == cartItem.id)
      if(existingCartItem == -1){ 
        this.cart.push(cartItem)
      }

      this.cart[existingCartItem] = cartItem;
    }
  },
  getters: {
    groupedCart(){
      let group = this.cart.reduce((acc, item) => {
        const restaurantId = item.restaurant.id
        acc[restaurantId] = acc[restaurantId] || { cart: [] };
        acc[restaurantId].cart.push(item);
        acc[restaurantId].restaurant = item.restaurant;
        return acc;
      }, {})

      console.log(Object.values(group))
      return Object.values(group);
    }
  }
})