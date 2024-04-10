<template>
    <div class="modal-container">
        <div class="modal-image">
            <img :src="modalItem.image" alt="">
            <div class="close-btn" @click="$emit('closeCartModal')">
                <i class="uil uil-multiply"></i>
            </div>
        </div>

        <div class="modal-details">
            <p>{{ modalItem.name }}</p>
            <p>₦{{ modalItem.price }}</p>
        </div>

        <div class="cart-modal flex">
            <CartButton :value="quantity" @updateValue="(value) => quantity = value" />
            <button class="add-btn" @click="addToCart({ ...modalItem, quantity }); $emit('closeCartModal')">
                Add ₦{{ modalItem.price * quantity }}
            </button>
        </div>
    </div>
</template>

<script>
import CartButton from "@/components/CartButton.vue"
import { mapActions } from 'pinia';
import { useCartStore } from "@/store";

export default {
    beforeMount(){
        let cartState = useCartStore()
        let cartItem = cartState.cart.find(item => item.id == this.modalItem.id)
        if(cartItem) this.quantity = cartItem.quantity;
    },
    data(){
        return {
            quantity: 1
        }
    },
    components: {
        CartButton
    },
    props: {
        modalItem: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapActions(useCartStore, ['addToCart'])
    }
}
</script>

<style scoped>
.modal-container{
    position: fixed;
    height: 85vh;
    width: 100vw;
    margin: 0 auto;
    bottom: 0;
    left: 0;
    z-index: 2000;
    background-color: white;
}
.modal-image{
    position: relative;
}
.modal-image img{
    width: 100vw;
    height: 150px;
    object-fit: cover;
    margin: 0 auto;
}

.close-btn{
    position: absolute;
    right: 2px;
    top: 2px;
    font-size: 1.6em;
    font-weight: 500;
    padding: 5px;
    background-color: white;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-details, .cart-modal{
    padding: 0 20px;
}

.cart-modal{
    position: relative;
    margin-top: 30vh;
}

.add-btn{
    padding: 15px 10px;
    background: rgb(7, 70, 7);
    color: white;
    border: none;
    outline: none;
    border-radius: 6px;
}
</style>