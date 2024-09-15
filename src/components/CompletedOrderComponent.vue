<template>
  <div class="container flex">
    <div>
      <p>{{ order.restaurant.name }}</p>
      <p>{{ formatDate(order.createdAt) }}</p>
    </div>
    <div>
      <p>Order {{ order.id.slice(0, 8) }}</p>
      <router-link :to="{ name: 'order_details', params: { id: order.id } }">
        <p style="color: green">View timeline</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompletedOrderComponent",
  props: {
    order: Object,
  },
  methods: {
    formatDate(date) {
        date = new Date(date);
      const suffixes = ["th", "st", "nd", "rd"];
      const day = date.getDate();
      const daySuffix =
        suffixes[
          day % 10 > 3 ? 0 : ((day % 100) - (day % 10) !== 10) * (day % 10)
        ] || suffixes[0];

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${day}${daySuffix} ${
        monthNames[date.getMonth()]
      }, ${date.getFullYear()}. ${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
.container {
  font-size: 0.78em;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

a {
  text-decoration: none;
}

p {
  margin: 6px;
}
</style>
