<template>
    <div class="container">
        <div class="flex">
            <p>{{ order.restaurant.name }}</p>
            <p>Order {{ order.id.slice(0, 8) }}</p>
        </div>
        <div class="flex" style="margin-top: -1.2rem;">
            <p>-</p>
            <p style="color: green;">View timeline</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "CompletedOrderComponent",
    props: {
        order: Object
    },

};
</script>


<style scoped>
.container{
    font-size: 0.78em;
    border-bottom: 1px solid #e0e0e0;
}
.flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>