<template>
    <div class="container">
        <header>
            <h1>Your Profile</h1>
        </header>
        <!-- <div class="profile-pic">
            <img :src="user.profileImage" alt="Profile Picture">
        </div> -->
        <section class="details">
            <h2>Name</h2>
            <p>{{ user.username }}</p>
            <h2>Email</h2>
            <p>{{ user.email }}</p>
        </section>
        <button class="edit-btn" @click="logout">Log Out</button>
    </div>
</template>

<script setup>
import { useUserStore } from '@/store';

const userStore = useUserStore();
const user = userStore.user;

const logout = () => {
    userStore.logout();
}
</script>

<style scoped>
.container {
    position: fixed;
    top: 200px;
    background-color: #fff;
    border-radius: 5px;
    /* padding: 20px; */
    width: 90%;
    /* max-width: 90%;
    min-width: 90%; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* vertical center */
}

header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

header img {
    width: 50px; /* Adjust logo size */
}

h1 {
    font-size: 20px;
    margin: 0;
}

.profile-pic {
    text-align: center;
    margin-bottom: 20px;
}

.profile-pic img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.details {
    margin-bottom: 20px;
}

.details h2 {
    font-size: 16px;
    margin-bottom: 5px;
}

.details p {
    font-size: 14px;
    margin: 0;
}

.edit-btn {
    background-color: #e61a1a; /* Green color */
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    width: 90%;
}
</style>