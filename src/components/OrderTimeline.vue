<template>
  <div class="timeline-item" :class="{ completed: timeline.completed }">
    <div class="content">
      <div><i class="uis uis-check-square" style="font-size: 1.2em"></i></div>
      <div>
        <p class="text">{{ timeline.name }}</p>
        <p class="sub-text">{{ description }}</p>
      </div>
    </div>
    <p class="sub-text">{{ formatTimeFromISO(timeline.createdAt) }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  timeline: Object,
});


// const titles = [
//   "Order received by vendor",
//   "Vendor is preparing your order.",
//   "Rider has accepted your order.",
//   "Rider at vendor.",
//   "Rider has picked up your order.",
//   "Your order has arrived.",
// ];

const descriptions = [
  "Your order has been received by the vendor and is being processed.",
  "Your order is being prepared by the vendor.",
  "A rider has accepted your order and is on the way to the vendor.",
  "The rider has arrived at the vendor and is picking up your order.",
  "The rider has picked up your order and is on the way to your location.",
  "Your order has arrived at your location.",
];

const description = descriptions[props.timeline.stage - 1];

function formatTimeFromISO(isoString) {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0 should be 12)

  return `${hours}:${minutes}${ampm}`;
}

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

.timeline-item .content,
.timeline-item .text {
  color: rgb(128, 138, 134);
  opacity: 0.8;
}

.timeline-item.completed .content,
.timeline-item.completed .text {
  color: rgb(15, 196, 111);
}
</style>
