<template>
  <router-link class="restaurant-item" :to="{ name: 'restaurant', params: { id: restaurant.id } }">
    <img :src="restaurant.image" alt="restaurant" />
    <div class="flex">
      <p class="restaurant-name">{{ restaurant.name }}</p>
      <p><i class="uil uil-heart" style="font-size: 1.2em;"></i></p>
    </div>
    <div class="flex">
      <p>
        <span>
            <i class="uil uil-taxi" style="margin-right: 3px; font-size: 1.2em;"></i>
            <span>From ₦300</span>
        </span>
        <span>30-40 min</span>
      </p>
      <p><i class="uil uil-star"></i>{{ restaurant.averageRating }} ({{ restaurant.ratings }})</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.restaurant-item{
    flex: 0 0 auto;
    scroll-snap-align: start;
    margin-right: 20px;
    border-radius: 10px;
    min-width: 300px;
    margin-bottom: 20px;
    font-size: 0.85em;
    text-decoration: none;
    color: initial;
}

.restaurant-name{
  text-overflow: ellipsis;
  overflow: hidden; 
  width: 160px; 
  height: 1.2em; 
  white-space: nowrap;
}

.restaurant-item img{
    width: 100%;
    max-height: 150px;
    border-radius: 10px;
    object-fit: cover;
}

.flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.restaurant-item .flex:nth-last-child(1){
    margin-top: -12px;
}

span{
    margin-right: 10px;
}
</style>
