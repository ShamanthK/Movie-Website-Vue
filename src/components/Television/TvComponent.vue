<template>
  <div class="searchInput">
    <search-component type="tv"></search-component>
  </div>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Top Rated">
      <div class="movieContainer">
        <div
          v-for="(tv, index) of topRatedTv"
          :key="tv.name"
          class="movieContent"
        >
          <div class="content" @click="openTv(tv)">
            <a-card hoverable style="width: 240px; border-radius: 20px">
              <template #cover>
                <img
                  :src="imagePath + tv.poster_path"
                  alt="Movies"
                  width="225"
                  height="325"
                  class="imageContent"
                  @mouseover="showOptions(index)"
                  @mouseleave="hideOptions"
                  v-bind:style="{
                    opacity: hovered && index === hoveredIndex ? '0.3' : '1',
                    cursor: 'pointer',
                  }"
                />
              </template>
              <a-card-meta>
                <template #description
                  ><div>
                    <div class="title">{{ tv.name }}</div>
                  </div>
                </template>
              </a-card-meta>
            </a-card>
          </div>
        </div>
      </div>
      <button-container
        title="Load More"
        @click="loadMoreTv('topRated')"
      ></button-container>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Popular" force-render>
      <div class="movieContainer">
        <div
          v-for="(tv, index) of onTelevision"
          :key="tv.name"
          class="movieContent"
        >
          <div class="content" @click="openTv(tv)">
            <a-card hoverable style="width: 240px; border-radius: 20px">
              <template #cover>
                <img
                  :src="imagePath + tv.poster_path"
                  alt="Movies"
                  width="225"
                  height="325"
                  class="imageContent"
                  @mouseover="showOptions(index)"
                  @mouseleave="hideOptions"
                  v-bind:style="{
                    opacity: hovered && index === hoveredIndex ? '0.3' : '1',
                    cursor: 'pointer',
                  }"
                />
              </template>
              <a-card-meta>
                <template #description
                  ><div>
                    <div class="title">{{ tv.name }}</div>
                  </div>
                </template>
              </a-card-meta>
            </a-card>
          </div>
        </div>
      </div>
      <button-container
        title="Load More"
        @click="loadMoreTv('onTv')"
      ></button-container>
    </a-tab-pane>
    <a-tab-pane key="3" tab="Airing Today">
      <div class="movieContainer">
        <div
          v-for="(tv, index) of airingTodayTv"
          :key="tv.name"
          class="movieContent"
        >
          <div class="content" @click="openTv(tv)">
            <a-card hoverable style="width: 240px; border-radius: 20px">
              <template #cover>
                <img
                  :src="imagePath + tv.poster_path"
                  alt="Movies"
                  width="225"
                  height="325"
                  class="imageContent"
                  @mouseover="showOptions(index)"
                  @mouseleave="hideOptions"
                  v-bind:style="{
                    opacity: hovered && index === hoveredIndex ? '0.3' : '1',
                    cursor: 'pointer',
                  }"
                />
              </template>
              <a-card-meta>
                <template #description
                  ><div>
                    <div class="title">{{ tv.name }}</div>
                  </div>
                </template>
              </a-card-meta>
            </a-card>
          </div>
        </div>
      </div>
      <button-container
        title="Load More"
        @click="loadMoreTv('airingToday')"
      ></button-container>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { ref } from "vue";
import SearchComponent from "../Shared/SearchComponent.vue";

export default {
  components: {
    SearchComponent,
  },
  data() {
    return {
      topRated: true,
      onTv: false,
      airingToday: false,
      topRatedTv: [],
      onTelevision: [],
      airingTodayTv: [],
      loadTopRated: [],
      topRatedNumber: 1,
      loadOnTv: [],
      onTvNumber: 1,
      loadAiring: [],
      airingNumber: 1,
      imagePath: "https://image.tmdb.org/t/p/w500",
      hovered: false,
      hoveredIndex: -1,
      activeKey: ref("1"),
    };
  },
  async created() {
    await this.$store.dispatch("tv/loadTopRatedTv", this.topRatedNumber);
    this.topRatedTv = await this.$store.getters["tv/topRatedTv"];
    // await this.$store.dispatch("tv/loadOnTv");
    // this.onTelevision = await this.$store.getters["tv/onTv"];
    this.onTelevision = await this.$store.getters["tv/popularTv"];
    await this.$store.dispatch("tv/loadAiringToday", this.airingNumber);
    this.airingTodayTv = await this.$store.getters["tv/airingToday"];
    console.log(this.topRatedTv);
  },
  methods: {
    setTopRated() {
      this.topRated = true;
      this.onTv = false;
      this.airingToday = false;
      console.log(this.popularMovies);
    },
    setOnTv() {
      this.topRated = false;
      this.onTv = true;
      this.airingToday = false;
    },
    setAiringToday() {
      this.topRated = false;
      this.onTv = false;
      this.airingToday = true;
    },
    showOptions(i) {
      this.hovered = true;
      this.hoveredIndex = i;
    },
    hideOptions() {
      this.hovered = false;
    },
    async loadMoreTv(tab) {
      if (tab === "topRated") {
        this.topRatedNumber = this.topRatedNumber + 1;
        await this.$store.dispatch("tv/loadTopRatedTv", this.topRatedNumber);
        this.loadTopRated = await this.$store.getters["tv/topRatedTv"];
        this.loadTopRated.forEach((movie) => {
          this.topRatedTv.push(movie);
        });
      } else if (tab === "onTv") {
        this.onTvNumber = this.onTvNumber + 1;
        await this.$store.dispatch("tv/loadPopularTv", this.onTvNumber);
        this.loadOnTv = await this.$store.getters["tv/popularTv"];
        this.loadOnTv.forEach((movie) => {
          this.onTelevision.push(movie);
        });
      } else if (tab === "airingToday") {
        this.airingNumber = this.airingNumber + 1;
        await this.$store.dispatch("tv/loadAiringToday", this.airingNumber);
        this.loadAiring = await this.$store.getters["tv/airingToday"];
        this.loadAiring.forEach((movie) => {
          this.airingTodayTv.push(movie);
        });
      }
    },
    async openTv(tv) {
      await this.$store.dispatch("tv/loadTvDetails", tv.id);
      await this.$store.dispatch("tv/loadTvCredits", tv.id);
      this.$router.replace(`/tv/${tv.id}`);
    },
  },
};
</script>

<style scoped>
div {
  color: white;
}
.tabContainer {
  display: flex;
  justify-content: space-between;
  width: 35%;
}
.content {
  width: 225px;
  border-radius: 25px;
  /* box-shadow: 0px 0px 2px 2px white; */
}
.imageContent {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.title {
  /* width: 225px; */
  background-color: white;
  color: gray;
  /* height: 30px;
  margin-top: -5px;
  padding: 10px 0px 5px 0px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px; */
  justify-content: center;
  display: flex;
}
.movieContent {
  padding: 20px;
}
.movieContainer {
  display: flex;
  flex-wrap: wrap;
}
.searchInput {
  display: flex;
  justify-content: center;
  padding: 50px;
}
</style>
