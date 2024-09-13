<template>
    <div class="cart-btn-container">
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
    width: 150px;
    border: 1px solid rgb(7, 70, 7);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
}

.cart-btn-container button{
    background: inherit;
    border: none;
    outline: none;
    font-size: 1.2em;
    color:var(--dark-green)
}
</style>