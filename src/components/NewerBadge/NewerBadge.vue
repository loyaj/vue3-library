<script setup>
defineProps({
  text: { type: String, default: "Content goes here" },
  fontSize: { type: Number, default: 14 }
});
</script>

<template>
  <div :class="$style.container">
    <span>{{ text }}</span>
  </div>
</template>

<style module>
.container {
  display: inline-block;
  font-size: v-bind(fontSize + "px");
  height: 30px;
  color: red;
  background-color: pink;
  padding: 0 8px;
  border-radius: 4px;
}
</style>
