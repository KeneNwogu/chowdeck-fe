<template>
   <footer>
        <nav>
            <router-link to="/" class="nav-item">
                <div>
                    <i class="uil uil-estate"></i>
                </div><p>Home</p>
            </router-link>

            <router-link to="/search" class="nav-item">
                <div><i class="uil uil-search"></i></div>
                <p>Search</p>
            </router-link>

            <router-link to="/orders" class="nav-item" style="position: relative;">
                <div><i class="uil uil-shopping-bag"></i></div>
                <p>Orders</p>

                <p class="cart-length flex-center" v-if="restaurants.length">{{ restaurants.length }}</p>
            </router-link>

            <router-link to="/support" class="nav-item">
                <div><i class="uil uil-comment-dots"></i></div>
                <p>Support</p>
            </router-link>

            <router-link to="/profile" class="nav-item">
                <div><i class="uil uil-user"></i></div>
                <p>Profile</p>
            </router-link>
        </nav>
   </footer>
</template>

<script>
import { mapState } from 'pinia'
import { useCartStore } from '@/store';

export default {
    computed: {
        ...mapState(useCartStore, ['restaurants'])
    }
};
</script>

<style scoped>
a{
    text-decoration: none;
    color: var(--light-grey);
}

.router-link-active{
    color: var(--dark-green)
}
.router-link-active p {
    font-weight: 800;
}

footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #fff;
    z-index: 1000;
    font-size: 10px;
    text-align: center;
    max-width: 500px;
    margin-inline: auto;
}

footer nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    border-top: 1px solid #e0e0e066;
}

i{
    font-size: 2em !important;
}
.nav-item > div{
    margin-bottom: -10px;
}

.cart-length{
    position: absolute;
    right: -5px;
    top: -12px;
    background-color: rgb(15, 56, 15);
    padding: 3px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    color: white;
}
</style>