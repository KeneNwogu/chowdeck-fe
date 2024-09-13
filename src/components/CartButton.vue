<template>
    <div class="cart-btn-container flex-space">
        <button @click="$emit('updateValue', value + 1)"><i class="uil uil-plus"></i></button>
        <p>{{ value }}</p>
        <button @click="$emit('updateValue', value > 1 ? value - 1 : 1)"><i class="uil uil-minus"></i></button>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            required: true
        }
    }
}
</script>

<style scoped>
.cart-btn-container{
    width: 100px;
    border: 1px solid rgb(7, 70, 7);
    border-radius: 6px;
}

.cart-btn-container button{
    background: inherit;
    border: none;
    outline: none;
    font-size: 1.2em;
}
</style>