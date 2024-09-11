<template>
    <div class="container">
        <header>
            <img src="images/logo.png" alt="App Logo">
            <h1>Your Profile</h1>
        </header>
        <div class="profile-pic">
            <img src="images/profile.jpg" alt="Profile Picture">
        </div>
        <section class="details">
            <h2>Name</h2>
            <p>John Doe</p>
            <h2>Email</h2>
            <p>johndoe@example.com</p>
            <h2>Phone Number</h2>
            <p>+1234567890</p>
            <h2>Location</h2>
            <p>Lagos, Nigeria</p>
        </section>
        <button class="edit-btn">Edit Profile</button>
    </div>
</template>

<style scoped>
.container {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    width: 100%;
    max-width: 400px; /* Adjust for larger screens */
}

header {
    display: flex;
    justify-content: space-between;
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
    background-color: #4CAF50; /* Green color */
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}
</style>