<template>
    <TestUserProfileList :users="users" v-if="!loading && !user" />
    <ProfileDetails v-else-if="user" />
</template>

<script>
import TestUserProfileList from '@/components/TestUserProfileList.vue'
import ProfileDetails from '@/components/ProfileDetails.vue'
import { mapState } from 'pinia'
import { useUserStore } from '@/store'

export default {
    components: {
        TestUserProfileList,
        ProfileDetails
    },
    data() {
        return {
            users: [],
            loading: true
        }
    },
    beforeMount(){
        fetch(`${process.env.VUE_APP_API_URL}/users/test-users`)
        .then(response => response.json())
        .then(data => {
            this.users = data.testUsers;
            this.loading = false;
        })
    },
    computed: {
        ...mapState(useUserStore, ['user'])
    }
}
</script>

<style scoped>

</style>
