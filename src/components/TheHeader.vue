<template>
  <div class="header">
    <p class="title">
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
        width="25"
        height="25"
      />
      Entertainment City
    </p>
    <div class="options">
      <p
        v-for="(header, index) in headerOptions"
        :key="header"
        @click="routeTo(header, index)"
        v-bind:style="{
          color: headerIndex === index ? 'teal' : 'white',
        }"
      >
        {{ header }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerOptions: ["Home", "Movies", "TV", "Celebs", "List", "Login"],
      headerIndex: 0,
    };
  },
  methods: {
    routeTo(header, index) {
      this.$router.replace(`/${header.toLowerCase()}`);
      this.headerIndex = index;
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  background-color: black;
  color: white;
}
.title {
  margin-left: 35px;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
}
.options {
  display: flex;
  justify-content: space-between;
  width: 600px;
  margin-top: 14px;
  padding-right: 100px;
  cursor: pointer;
  font-size: 16px;
}
</style>
