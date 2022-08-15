<template>
  <div class="celebContainer">
    <div>
      <img
        :src="imagePath + celebDetails.profile_path"
        alt="Movies"
        width="225"
        height="325"
        class="imageContent"
      />
      <h1>{{ celebDetails.name }}</h1>
      <div>
        <h3>Personal Info</h3>
        <p>Born: {{ celebDetails.birthday }}</p>
        <p>Place of Birth: {{ celebDetails.place_of_birth }}</p>
        <p>Known For: {{ celebDetails.known_for_department }}</p>
        <p>
          IMDB:
          <a :href="imdbName + celebDetails.imdb_id" target="blank">{{
            imdbName + celebDetails.imdb_id
          }}</a>
        </p>
      </div>
    </div>
    <div class="biography">
      <h3>Biography</h3>
      <p>{{ celebDetails.biography }}</p>
      <h3>Gallery</h3>
      <div class="gallery">
        <Carousel
          :settings="settingsImg"
          :breakpoints="breakpointsImg"
          style="overflow: hidden"
        >
          <Slide v-for="image in profileImages" :key="image.vote_count">
            <div>
              <a-image :width="150" :src="imagePath + image.file_path" />
            </div>
          </Slide>
          <template #addons>
            <Pagination />
          </template>
        </Carousel>
        <!-- </div> -->
      </div>
      <h3 style="margin-top: 25px">Top Rated Movies/TV</h3>
      <div class="top">
        <Carousel
          :settings="settings"
          :breakpoints="breakpoints"
          style="overflow: hidden"
        >
          <Slide v-for="(credit, index) in topCredits" :key="credit.id">
            <div class="topCredit">
              <img
                :src="
                  credit.poster_path !== null
                    ? imagePath + credit.poster_path
                    : noImage
                "
                alt="Movies"
                width="175"
                height="250"
                class="imageContent"
                @click="openImageCredit(credit)"
                @mouseover="highlightImage(index)"
                @mouseleave="disableHighlightImage()"
                v-bind:style="{
                  opacity:
                    highlightImageCredit && index === highlightIndex ? 0.3 : 1,
                  cursor: 'pointer',
                }"
              />
              <p class="title">{{ credit.title }}</p>
            </div>
          </Slide>

          <template #addons>
            <Pagination />
          </template>
        </Carousel>
      </div>
      <div>
        <h3>All Movies/TV</h3>
        <a-collapse>
          <a-collapse-panel key="1" header="Movies" class="collapsePanel">
            <div
              v-for="(movie, index) of movieCredits"
              :key="movie.title"
              class="movieCredit"
            >
              <p
                v-bind:style="{
                  color:
                    movie.vote_average >= 7
                      ? 'green'
                      : movie.vote_average < 7 && movie.vote_average >= 4
                      ? 'yellow'
                      : movie.vote_average < 4
                      ? 'red'
                      : '',
                }"
              >
                {{ movie.vote_average * 10 }}%
              </p>
              <p
                @mouseover="highlightMovie(index)"
                @mouseleave="disableHighlightMovie()"
                v-bind:style="{
                  color:
                    highlightMovieCredit && index === highlightIndex
                      ? 'deepskyblue'
                      : 'white',
                  cursor: 'pointer',
                }"
                @click="openMovieCredit(movie)"
              >
                &nbsp; &nbsp; {{ movie.title }} ({{
                  movie.release_date ? movie.release_date.split("-")[0] : ""
                }})
              </p>
              <p class="character">
                &nbsp; - &nbsp; <i>{{ movie.character }}</i>
              </p>
            </div>
          </a-collapse-panel>
        </a-collapse>

        <a-collapse>
          <a-collapse-panel key="2" header="TV" style="color: white">
            <div
              v-for="(tv, index) of tvCredits"
              :key="tv.original_name"
              class="movieCredit"
            >
              <p
                v-bind:style="{
                  color:
                    tv.vote_average * 10 >= 7
                      ? 'green'
                      : tv.vote_average * 10 < 7 && tv.vote_average * 10 >= 4
                      ? 'yellow'
                      : 'red',
                  cursor: 'pointer',
                }"
              >
                {{ tv.vote_average * 10 }}%
              </p>
              <p
                @mouseover="highlightTv(index)"
                @mouseleave="disableHighlightTv()"
                v-bind:style="{
                  color:
                    highlightTvCredit && index === highlightIndex
                      ? 'deepskyblue'
                      : 'white',
                  cursor: 'pointer',
                }"
                @click="openTvCredit(tv)"
              >
                &nbsp; &nbsp; {{ tv.original_name }} ({{
                  tv.first_air_date ? tv.first_air_date.split("-")[0] : ""
                }})
              </p>
              <p class="character">
                &nbsp; - &nbsp; <i>{{ tv.character }}</i>
              </p>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { APIKEY } from "../../apiKey";

export default {
  components: {
    Pagination,
    Carousel,
    Slide,
  },
  data() {
    return {
      celebDetails: [],
      celebCredits: [],
      topCredits: [],
      imagePath: "https://image.tmdb.org/t/p/w500",
      imdbName: "https://www.imdb.com/name/",
      movieCredits: [],
      tvCredits: [],
      highlightMovieCredit: false,
      highlightTvCredit: false,
      highlightImageCredit: false,
      highlightIndex: -1,
      profileImages: [],
      noImage:
        "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg",
      settings: {
        itemsToShow: 7,
        snapAlign: "center",
      },
      breakpoints: {
        // 700px and up
        1024: {
          itemsToShow: 5,
          snapAlign: "center",
        },
        // 1024 and up
        1600: {
          itemsToShow: 7,
          snapAlign: "start",
        },
      },
      settingsImg: {
        itemsToShow: 8,
        snapAlign: "center",
      },
      breakpointsImg: {
        // 700px and up
        1024: {
          itemsToShow: 7,
          snapAlign: "center",
        },
        // 1024 and up
        1600: {
          itemsToShow: 7,
          snapAlign: "start",
        },
      },
    };
  },
  created() {
    this.loadCelebDetails();
  },
  methods: {
    async loadCelebDetails() {
      this.celebDetails = await this.$store.getters["celebs/celebDetails"];
      this.celebCredits = await this.$store.getters["celebs/celebCredits"];
      fetch(
        `https://api.themoviedb.org/3/person/${this.celebDetails.id}/images?api_key=${APIKEY}`,
        {
          headers: { "Content-type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          this.profileImages = response.profiles;
        })
        .catch((error) => {
          console.log("Looks like there was a problem: \n", error);
        });
      this.topCredits = this.celebCredits.filter(
        (credit) => credit.vote_average >= 7
      );
      this.movieCredits = this.celebCredits.filter(
        (credit) => credit.media_type === "movie"
      );
      this.tvCredits = this.celebCredits.filter(
        (credit) => credit.media_type === "tv"
      );
      console.log(this.movieCredits);
      console.log(this.celebCredits);
      this.topCredits = this.topCredits.splice(0, 10);
    },
    highlightMovie(i) {
      this.highlightMovieCredit = true;
      this.highlightIndex = i;
    },
    disableHighlightMovie() {
      this.highlightMovieCredit = false;
    },
    highlightTv(i) {
      this.highlightTvCredit = true;
      this.highlightIndex = i;
    },
    disableHighlightTv() {
      this.highlightTvCredit = false;
    },
    highlightImage(i) {
      this.highlightImageCredit = true;
      this.highlightIndex = i;
    },
    disableHighlightImage() {
      this.highlightImageCredit = false;
    },
    async openMovieCredit(movie) {
      await this.$store.dispatch("movies/loadMovieDetails", movie.id);
      await this.$store.dispatch("movies/loadMovieCredits", movie.id);
      this.$router.replace(`/movies/${movie.id}`);
    },
    async openTvCredit(tv) {
      await this.$store.dispatch("tv/loadTvDetails", tv.id);
      await this.$store.dispatch("tv/loadTvCredits", tv.id);
      this.$router.replace(`/tv/${tv.id}`);
    },
    async openImageCredit(credit) {
      if (credit.media_type === "movie") {
        await this.$store.dispatch("movies/loadMovieDetails", credit.id);
        await this.$store.dispatch("movies/loadMovieCredits", credit.id);
        this.$router.replace(`/movies/${credit.id}`);
      } else if (credit.media_type === "tv") {
        await this.$store.dispatch("tv/loadTvDetails", credit.id);
        await this.$store.dispatch("tv/loadTvCredits", credit.id);
        this.$router.replace(`/tv/${credit.id}`);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: white;
}
h3 {
  color: white;
}
h4 {
  color: white;
}
p {
  color: white;
}
.celebContainer {
  display: flex;
  padding: 20px;
  justify-content: space-between;
}
.biography {
  width: 78%;
  margin-top: -18px;
}
/* .top {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
} */
.percent {
  position: absolute;
  border: 2px solid green;
  width: 35px;
  height: 35px;
  border-radius: 20px;
  margin-top: -25px;
  margin-left: -18px;
  font-size: 13px;
  background-color: black;
}
.vote {
  margin-top: 10px;
  margin-left: 5px;
}
.movieCredit {
  display: flex;
}
.topCredit {
  display: flex;
  flex-direction: column;
  width: 175px;
  height: 303px;
}
.character {
  color: lightgray;
}
.gallery {
  display: flex;
  flex-wrap: wrap;
}
.imageContent {
  border-radius: 60px;
  border: 1px solid teal;
}
</style>
