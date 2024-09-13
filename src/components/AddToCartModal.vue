<template>
    <div class="modal-container">
        <div class="modal-content">
            <div class="modal-image">
                <img :src="modalItem.image" alt="" />
                <div class="close-btn" @click="$emit('closeCartModal')">
                    <i class="uil uil-multiply"></i>
                </div>
            </div>

            <div class="modal-details">
                <p>{{ modalItem.name }}</p>
                <p>₦{{ modalItem.price }}</p>
            </div>

            <div class="cart-modal flex-space">
                <CartButton
                    :value="quantity"
                    @updateValue="(value) => (quantity = value)"
                />
                <button
                    class="add-btn"
                    @click="
                        addToCart({ ...modalItem, quantity });
                        $emit('closeCartModal');
                    "
                >
                    Add ₦{{ modalItem.price * quantity }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import CartButton from "@/components/CartButton.vue";
import { mapActions } from "pinia";
import { useCartStore } from "@/store";

export default {
    beforeMount() {
        let cartState = useCartStore();
        let cartItem = cartState.cart.find(
            (item) => item.id == this.modalItem.id
        );
        if (cartItem) this.quantity = cartItem.quantity;
    },
    data() {
        return {
            quantity: 1,
        };
    },
    components: {
        CartButton,
    },
    props: {
        modalItem: {
            type: Object,
            required: true,
        },
    },
    methods: {
        ...mapActions(useCartStore, ["addToCart"]),
    },
};
</script>

<style scoped>
.modal-container {
    display: flex;
    position: fixed;
    height: 100vh;
    width: 100%;
    inset: 0;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 0.65);
    align-items: end;
}

.modal-content {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    max-width: 500px;
    width: 100%;
    margin-inline: auto;
    height: 60vh;
    background-color: white;
    animation: animateDown 0.2s ease-in-out both;
}
.modal-image {
    position: relative;
}
.modal-image img {
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 200px;
    object-fit: cover;
}

.close-btn {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 10px;
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

.modal-details,
.cart-modal {
    padding: 0 20px;
}

.cart-modal {
    position: relative;
    margin-top: 30px;
}

.add-btn {
    padding: 15px 20px;
    background: rgb(7, 70, 7);
    color: white;
    border: none;
    outline: none;
    border-radius: 6px;
    letter-spacing: 0.6px;
}

@keyframes animateDown {
    0% {
        opacity: 0;
        transform: translatey(15px);
    }
    100% {
        opacity: 1;
        transform: translatey(0);
    }
}
</style>
