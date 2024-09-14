<template>
    <div class="timeline-item" :class="{'completed': timeline.completed}">
      <div class="content">
        <div><i class="uis uis-check-square" style="font-size: 1.2em;"></i></div>
        <div>
          <p class="text">{{ title }}</p>
          <p class="sub-text">{{ timeline.name }}</p>
        </div>
      </div>
      <p>1:40pm</p>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  timeline: Object,
});

const titles = ["Order Placed", "Order Confirmed", "Order Prepared", "Order Delivered"];

const title = titles[props.timeline.stage - 1];
</script>

<style scoped>
.text {
  /* font-family: Lexend;  */
  /* Heading */
  font-size: 17px;
  line-height: 30px;
  font-weight: 400;
  color: #000000ff; /* black */
  margin: 0;
}

.sub-text {
  font-size: 12px;
  line-height: 22px;
  font-weight: 300;
  color: #000000ff;
  margin: 2px 0;
}

.timeline-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;
}

.timeline-item .content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.timeline-item .content, .timeline-item .text {
  color: rgb(128, 138, 134);
  opacity: 0.8;
}

.timeline-item.completed .content, .timeline-item.completed .text {
  color: rgb(15, 196, 111);
}
</style>

