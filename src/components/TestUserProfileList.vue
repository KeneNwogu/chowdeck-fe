<template>
  <div class="profile">
    <div class="container">
      <h1>Sign in with a Test Account</h1>
      <p>Choose an existing account or create a new one.</p>
      <div class="account-list">
        <ul>
          <button v-for="user in users" :key="user.id" @click="login(user.id)" :disabled="loading">
            <img
              :src="user.profileImage"
              :alt="user.username"
              class="profile-pic"
            />
            <div>
              <span class="username">{{ user.username }}</span>
              <span class="email">{{ user.email }}</span>
            </div>
          </button>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import { useUserStore } from '@/store'

export default {
    data() {
        return {
            loading: false
        }
    },
    props: {
        users: Array,
    },
    methods: {
        login(userId) {
            // Log in the user
            this.loading = true
            const store = useUserStore()
            fetch(`${process.env.VUE_APP_API_URL}/users/test-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ testUserId: userId })
            })
            .then(response => response.json())
            .then(data => {
                store.login(data.user, data.token);
                this.loading = false;
            })
        }
    }
}
</script>


<style scoped>
.profile {
  /* font-family: Arial, sans-serif; */
  position: fixed;
  top: 100px;
  left: 0;
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  padding: 40px;
  text-align: center;
  width: 400px; /* Adjust width for larger screens */
  margin-inline:auto;
}

h1 {
  font-size: 20px;
  margin-bottom: 10px;
}

p {
  font-size: 14px;
  margin-bottom: 20px;
}

.account-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.account-list button {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  display: flex;
  /* justify-content: space-between;  */
  align-items: center; /* Align content vertically */
  cursor: pointer;
  background: none;
  border: none;
  border-bottom: 0.5px solid #999;
  width: 100%;
  outline: none;
}

.account-list button div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.account-list button:hover {
  background-color: #eee;
}

.username {
  font-weight: bold;
}

.email {
  color: #999;
  font-size: 13px;
}

.create-btn {
  background-color: #4caf50; /* Green color */
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.profile-pic {
  width: 40px; /* Adjust size as needed */
  height: 40px; /* Adjust size as needed */
  border-radius: 50%; /* Circular profile picture */
  margin-right: 10px; /* Spacing between profile picture and username */
}

@media (max-width: 768px) {
  .container {
    width: 80%;
  }

  h1 {
    font-size: 18px;
  }

  p {
    font-size: 12px;
  }

  .create-btn {
    font-size: 14px;
  }

  .profile-pic {
    width: 30px; /* Adjust size for smaller screens */
    height: 30px; /* Adjust size for smaller screens */
  }
}

@media (max-width: 480px) {
  .container {
    padding: 20px;
  }

  .profile-pic {
    margin-bottom: 5px; /* Add spacing between profile picture and username on small screens */
  }
}
</style>