<template>
  <div>
    <button class="buttons">{{ title }}</button>
  </div>
</template>

<script>
export default {
  props: ['title'],
}
</script>


<style scoped>
.buttons {
  padding: 13px;
  background-color: teal;
  border: none;
  border-radius: 15px;
  min-width: 125px;
  color: white;
  cursor: pointer;
}
</style>