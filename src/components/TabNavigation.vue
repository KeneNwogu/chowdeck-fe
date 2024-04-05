<template>
  <ul class="tab-group">
    <div class="tab" v-for="tab in tabs" :key="tab.action">
      <li :class="{active: tab.action == currentTab}" @click="$emit('updateTab', tab.action)">
        <button>{{ tab.name }}</button>
      </li>
    </div>
    <!-- <div class="tab">
      <li><button>Ongoing</button></li>
    </div>
    <div class="tab">
      <li><button>Completed</button></li>
    </div> -->
  </ul>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    currentTab: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.tab-group {
  display: flex;
  align-items: center;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
  border-radius: 6px;
  background: rgba(160, 179, 176, 0.25);
}

.tab {
  flex-grow: 1;
  margin: 5px 5px;
  border-radius: 6px;
}

.tab-group li button {
  display: block;
  text-decoration: none;
  padding: 15px;
  color: rgb(138, 138, 138);
  font-size: 0.9em;
  text-align: center;
  cursor: pointer;
  transition: 0.5s ease;
  border-radius: 6px;
  border: none;
  outline: none;
  background: none;
}

/* .tab-group li button:hover {
  background: black;
  color: #fff;
} */
.tab-group .active button {
  background: black;
  color: #fff;
}
.tab-content > div:last-child {
  display: none;
}
</style>
