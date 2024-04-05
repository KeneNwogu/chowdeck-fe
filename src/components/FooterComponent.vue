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

            <router-link to="/orders" class="nav-item">
                <div><i class="uil uil-shopping-bag"></i></div>
                <p>Orders</p>
            </router-link>

            <router-link to="/support" class="nav-item">
                <div><i class="uil uil-comment-alt-question"></i></div>
                <p>Support</p>
            </router-link>

            <router-link to="/profile" class="nav-item">
                <div><i class="uil uil-user"></i></div>
                <p>Profile</p>
            </router-link>
        </nav>
   </footer>
</template>

<style scoped>
a{
    text-decoration: none;
    color: initial;
}

footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 1000;
    font-size: 10px;
    text-align: center;
}

footer nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    border-top: 1px solid #e0e0e0;
}

i{
    font-size: 2em !important;
}
.nav-item > div{
    margin-bottom: -10px;
}
</style>