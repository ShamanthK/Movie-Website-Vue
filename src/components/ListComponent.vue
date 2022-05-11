<template>
  <a-collapse>
    <a-collapse-panel key="1" header="Liked Movies" style="color: white">
      <div>
        <Carousel :settings="settings">
          <Slide v-for="movie in likedMovies" :key="movie.title">
            <div>
              <div>
                <div class="content">
                  <img
                    :src="path + movie.poster_path"
                    alt="Movies"
                    width="200"
                    height="275"
                    class="imageContent"
                  />
                  <p>{{ movie.title }}</p>
                </div>
              </div>
            </div>
            <div class="rating">
              <div
                class="percent"
                v-bind:style="{
                  borderColor:
                    movie.vote_average >= 7
                      ? 'green'
                      : movie.vote_average < 7 && movie.vote_average >= 4
                      ? 'yellow'
                      : movie.vote_average < 4
                      ? 'red'
                      : '',
                }"
              >
                <p class="vote">{{ movie.vote_average * 10 }}%</p>
              </div>
              <!-- <div class="moreOptions" v-if="hovered && index === hoveredIndex">
            <button-container
              title="View More"
              @click="openMovie(item)"
            ></button-container>
          </div> -->
            </div>
          </Slide>

          <template #addons>
            <Pagination />
          </template>
        </Carousel>
      </div>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="In Watchlist Movies" style="color: white">
      <div>
        <Carousel :settings="settings">
          <Slide v-for="movie in watchlistMovies" :key="movie.title">
            <div>
              <div>
                <div class="content">
                  <img
                    :src="path + movie.poster_path"
                    alt="Movies"
                    width="200"
                    height="275"
                    class="imageContent"
                  />
                  <p>{{ movie.title }}</p>
                </div>
              </div>
            </div>
            <div class="rating">
              <div
                class="percent"
                v-bind:style="{
                  borderColor:
                    movie.vote_average >= 7
                      ? 'green'
                      : movie.vote_average < 7 && movie.vote_average >= 4
                      ? 'yellow'
                      : movie.vote_average < 4
                      ? 'red'
                      : '',
                }"
              >
                <p class="vote">{{ movie.vote_average * 10 }}%</p>
              </div>
              <!-- <div class="moreOptions" v-if="hovered && index === hoveredIndex">
            <button-container
              title="View More"
              @click="openMovie(item)"
            ></button-container>
          </div> -->
            </div>
          </Slide>

          <template #addons>
            <Pagination />
          </template>
        </Carousel>
      </div>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="Liked TV" style="color: white">
      <div>
        <Carousel :settings="settings">
          <Slide v-for="tv in likedTv" :key="tv.original_name">
            <div>
              <div>
                <div class="content">
                  <img
                    :src="path + tv.poster_path"
                    alt="Movies"
                    width="200"
                    height="275"
                    class="imageContent"
                  />
                  <p>{{ tv.original_name }}</p>
                </div>
              </div>
            </div>
            <div class="rating">
              <div
                class="percent"
                v-bind:style="{
                  borderColor:
                    tv.vote_average >= 7
                      ? 'green'
                      : tv.vote_average < 7 && tv.vote_average >= 4
                      ? 'yellow'
                      : tv.vote_average < 4
                      ? 'red'
                      : '',
                }"
              >
                <p class="vote">{{ tv.vote_average * 10 }}%</p>
              </div>
              <!-- <div class="moreOptions" v-if="hovered && index === hoveredIndex">
            <button-container
              title="View More"
              @click="openMovie(item)"
            ></button-container>
          </div> -->
            </div>
          </Slide>

          <template #addons>
            <Pagination />
          </template>
        </Carousel>
      </div>
    </a-collapse-panel>
    <a-collapse-panel key="4" header="In Watchlist TV" style="color: white">
      <div>
        <Carousel :settings="settings">
          <Slide v-for="tv in watchlistTv" :key="tv.original_name">
            <div>
              <div>
                <div class="content">
                  <img
                    :src="path + tv.poster_path"
                    alt="Movies"
                    width="200"
                    height="275"
                    class="imageContent"
                  />
                  <p>{{ tv.original_name }}</p>
                </div>
              </div>
            </div>
            <div class="rating">
              <div
                class="percent"
                v-bind:style="{
                  borderColor:
                    tv.vote_average >= 7
                      ? 'green'
                      : tv.vote_average < 7 && tv.vote_average >= 4
                      ? 'yellow'
                      : tv.vote_average < 4
                      ? 'red'
                      : '',
                }"
              >
                <p class="vote">{{ tv.vote_average * 10 }}%</p>
              </div>
              <!-- <div class="moreOptions" v-if="hovered && index === hoveredIndex">
            <button-container
              title="View More"
              @click="openMovie(item)"
            ></button-container>
          </div> -->
            </div>
          </Slide>

          <template #addons>
            <Pagination />
          </template>
        </Carousel>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import { Carousel, Slide, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {
  components: {
    Pagination,
    Carousel,
    Slide,
  },
  data() {
    return {
      likedMovies: [],
      watchlistMovies: [],
      likedTv: [],
      watchlistTv: [],
      path: "https://image.tmdb.org/t/p/w500",
      settings: {
        itemsToShow: 7,
        snapAlign: "center",
      },
    };
  },
  created() {
    this.getAllMovies();
    this.getAllTv();
  },
  methods: {
    async getAllMovies() {
      this.likedMovies = await this.$store.getters["movies/likedMovies"];
      this.watchlistMovies = await this.$store.getters[
        "movies/watchlistMovies"
      ];
      console.log(this.likedMovies);
    },
    async getAllTv() {
      this.likedTv = await this.$store.getters["movies/likedTv"];
      this.watchlistTv = await this.$store.getters["movies/watchlistTv"];
      console.log(this.likedMovies);
    },
  },
};
</script>


<style scoped>
h3 {
  color: white;
}
p {
  color: white;
}
.percent {
  border: 2px solid;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  font-size: 13px;
  top: 20;
  position: absolute;
  top: 250px;
  left: 20px;
  background-color: black;
}
.imageContent {
  border: 1px solid teal;
  border-radius: 15px;
}
</style>