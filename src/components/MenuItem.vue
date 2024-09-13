<template>
  <div class="flex-space space">
    <div class="menu-details">
      <p>{{ item.name }}</p>
      <p>{{ formatPrice(item.price) }}</p>
    </div>

    <div class="menu-item">
      <div class="menu-image" style="position: relative;">
        <div style="margin: 0; padding: 0">
            <img :src="item.image" alt="menu item" />
        </div>
        <button @click="$emit('openAddCartModal', item.id)">Add +</button>
      </div>
    </div>
  </div>
</template>


<script>
import { usePriceFormatter } from "@/composables/usePriceFormatter";
export default{
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    methods: {
      formatPrice(price) {
        let priceFormatter = usePriceFormatter();
        return priceFormatter(price);
      }
    }
}
</script>

<style scoped>
.space{
    margin-bottom: 35px;
}
.menu-details{
    font-weight: 700;
}
.menu-item, .menu-image{
    border-radius: 8px;
}
.menu-image img{
    width: 100px;
    height: 50px;
    object-fit: cover;
    padding: 0;
    margin: 0;
    border-radius: 5px 5px 0 0;
}

button{
    position: absolute;
    left: 0;
    border: none;
    padding: 11px 10px;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    outline: none;
    margin-top: -3px;
    background-color: rgb(121, 235, 187);
    color: rgb(32, 121, 69);
    border-radius: 0 0 5px 5px;
}
</style>
