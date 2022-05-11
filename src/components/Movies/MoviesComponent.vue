<template>
  <div class="searchInput">
    <search-component type="movie"></search-component>
  </div>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Popular">
      <div class="movieContainer">
        <div
          v-for="(movie, index) of popularMovies"
          :key="movie.title"
          class="movieContent"
        >
          <div class="content" @click="openMovie(movie.id)">
            <a-card hoverable style="width: 240px; border-radius: 20px">
              <template #cover>
                <img
                  :src="imagePath + movie.poster_path"
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
                    <div class="title">{{ movie.title }}</div>
                  </div>
                </template>
              </a-card-meta>
            </a-card>
          </div>
        </div>
      </div>
      <button-container
        title="Load More"
        @click="loadMoreMovies('popular')"
      ></button-container>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Top Rated">
      <div class="movieContainer">
        <div
          v-for="(movie, index) of topRatedMovies"
          :key="movie.title"
          class="movieContent"
        >
          <div class="content" @click="openMovie(movie.id)">
            <a-card hoverable style="width: 240px; border-radius: 20px">
              <template #cover>
                <img
                  :src="imagePath + movie.poster_path"
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
                    <div class="title">{{ movie.title }}</div>
                  </div>
                </template>
              </a-card-meta>
            </a-card>
          </div>
        </div>
      </div>
      <button-container
        title="Load More"
        @click="loadMoreMovies('topRated')"
      ></button-container>
    </a-tab-pane>
    <a-tab-pane key="3" tab="Upcoming">
      <div class="movieContainer">
        <div
          v-for="(movie, index) of upcomingMovies"
          :key="movie.title"
          class="movieContent"
        >
          <div class="content" @click="openMovie(movie.id)">
            <a-card hoverable style="width: 240px; border-radius: 20px">
              <template #cover>
                <img
                  :src="imagePath + movie.poster_path"
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
                    <div class="title">{{ movie.title }}</div>
                  </div>
                </template>
              </a-card-meta>
            </a-card>
          </div>
        </div>
      </div>
      <button-container
        title="Load More"
        @click="loadMoreMovies('upcoming')"
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
      popular: true,
      topRated: false,
      upcoming: false,
      popularMovies: [],
      topRatedMovies: [],
      upcomingMovies: [],
      loadPopular: [],
      loadTopRated: [],
      loadUpcoming: [],
      popularNumber: 1,
      topRatedNumber: 1,
      upcomingNumber: 1,
      imagePath: "https://image.tmdb.org/t/p/w500",
      hovered: false,
      hoveredIndex: -1,
      activeKey: ref("1"),
    };
  },
  async created() {
    this.popularMovies = this.$store.getters["movies/popularMovies"];
    await this.$store.dispatch(
      "movies/loadTopRatedMovies",
      this.topRatedNumber
    );
    this.topRatedMovies = await this.$store.getters["movies/topRatedMovies"];
    await this.$store.dispatch(
      "movies/loadUpcomingMovies",
      this.upcomingNumber
    );
    this.upcomingMovies = await this.$store.getters["movies/upcomingMovies"];
    console.log(this.popularMovies);
    console.log(this.topRatedMovies);
  },
  methods: {
    setPopular() {
      this.popular = true;
      this.topRated = false;
      this.upcoming = false;
      console.log(this.popularMovies);
    },
    setTopRated() {
      this.popular = false;
      this.topRated = true;
      this.upcoming = false;
    },
    setUpcoming() {
      this.popular = false;
      this.topRated = false;
      this.upcoming = true;
    },
    showOptions(i) {
      this.hovered = true;
      this.hoveredIndex = i;
    },
    hideOptions() {
      this.hovered = false;
    },
    async loadMoreMovies(tab) {
      if (tab === "popular") {
        this.popularNumber = this.popularNumber + 1;
        await this.$store.dispatch(
          "movies/loadPopularMovies",
          this.popularNumber
        );
        this.loadPopular = await this.$store.getters["movies/popularMovies"];
        this.loadPopular.forEach((movie) => {
          this.popularMovies.push(movie);
        });
      } else if (tab === "topRated") {
        this.topRatedNumber = this.topRatedNumber + 1;
        await this.$store.dispatch(
          "movies/loadTopRatedMovies",
          this.topRatedNumber
        );
        this.loadTopRated = await this.$store.getters["movies/topRatedMovies"];
        this.loadTopRated.forEach((movie) => {
          this.topRatedMovies.push(movie);
        });
      } else if (tab === "upcoming") {
        this.upcomingNumber = this.upcomingNumber + 1;
        await this.$store.dispatch(
          "movies/loadUpcomingMovies",
          this.upcomingNumber
        );
        this.loadUpcoming = await this.$store.getters["movies/upcomingMovies"];
        this.loadUpcoming.forEach((movie) => {
          this.upcomingMovies.push(movie);
        });
      }
    },
    async openMovie(id) {
      await this.$store.dispatch("movies/loadMovieDetails", id);
      await this.$store.dispatch("movies/loadMovieCredits", id);
      this.$router.replace(`/movies/${id}`);
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
  /* width: 225px;
  background-color: white; */
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
