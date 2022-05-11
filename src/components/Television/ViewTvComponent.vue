<template>
  <div class="movieContainer" v-if="!showAllCast">
    <img
      class="bc-image"
      :src="imagePath + movieDetails.backdrop_path"
      alt="Movies"
      width="200"
      height="275"
    />
    <div class="infoContainer">
      <div>
        <img
          :src="imagePath + movieDetails.poster_path"
          alt="Movies"
          width="225"
          height="325"
          class="imageContent"
        />
      </div>
      <div class="content">
        <div>
          <h1>
            {{ movieDetails.original_name }} ({{
              movieDetails.first_air_date.split("-")[0]
            }}
            -
            {{
              movieDetails.status === "Ended"
                ? movieDetails.last_air_date.split("-")[0]
                : " "
            }})
          </h1>
          <p class="tagline">{{ movieDetails.tagline }}</p>
          <div class="release">
            <p>{{ genres.toString() }}</p>
            <p>First Air Date: {{ movieDetails.first_air_date }}</p>
            <p>
              Runtime: {{ Math.floor(runTime[0] / 60) }}h
              {{ runTime[0] % 60 }}min
            </p>
          </div>
          <div class="user">
            <div
              class="rating"
              v-bind:style="{
                borderColor:
                  movieDetails.vote_average >= 7
                    ? 'green'
                    : movieDetails.vote_average < 7 &&
                      movieDetails.vote_average >= 4
                    ? 'yellow'
                    : movieDetails.vote_average < 4
                    ? 'red'
                    : '',
              }"
            >
              <p class="number">{{ movieDetails.vote_average * 10 }}%</p>
            </div>
            <div class="watchlist">
              <font-awesome
                icon="heart"
                @click="likeContent(movieDetails)"
                v-bind:style="{
                  color: liked ? 'red' : 'white',
                  fontSize: '30px',
                  cursor: 'pointer',
                }"
              />
              <font-awesome
                v-if="!checked"
                icon="plus"
                style="font-size: 30px; cursor: pointer; color: white"
                @click="addContent(movieDetails)"
              />
              <font-awesome
                v-if="checked"
                icon="check"
                style="font-size: 30px; cursor: pointer; color: green"
                @click="removeContent()"
              />
            </div>
          </div>
        </div>

        <div>
          <h3>Overview</h3>
          <p>{{ movieDetails.overview }}</p>
        </div>
        <div class="seasons">
          <p>Seasons: {{ movieDetails.number_of_seasons }}</p>
          <p>Episodes: {{ movieDetails.number_of_episodes }}</p>
        </div>

        <div>
          <div class="stream">
            <button-container
              title="Play Trailer"
              @click="playTrailer(movieDetails.id)"
            ></button-container>
            <div class="network">
              <p>Watch now:</p>
              <a :href="streamLink" target="_blank"
                ><img
                  :src="imagePath + movieDetails.networks[0].logo_path"
                  alt="Movies"
                  width="125"
                  height="40"
                  class="imageContent"
              /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="castTitle">
      <h3>Cast</h3>
      <button-container
        title="View All"
        @click="viewAllCast"
      ></button-container>
    </div>
    <div class="allCast">
      <div v-for="(cast, index) in spliceCast" :key="cast.name" class="actor">
        <img
          :src="imagePath + cast.profile_path"
          alt="Movies"
          width="150"
          height="200"
          class="imageContent"
          @mouseover="showOptions(index)"
          @mouseleave="hideOptions"
          v-bind:style="{
            opacity: hovered && index === hoveredIndex ? '0.3' : '1',
            cursor: 'pointer',
          }"
          @click="openCeleb(cast)"
        />
        <p class="name">{{ cast.name }}</p>
        <p class="char">{{ cast.character }}</p>
      </div>
    </div>
  </div>

  <div v-if="showAllCast">
    <div class="castTitle">
      <h3>Cast</h3>
      <button-container title="Go Back" @click="goBack"></button-container>
    </div>
    <div class="allCast">
      <div
        v-for="(cast, index) in allCast"
        :key="cast.name"
        class="actor"
        @mouseover="showOptions(index)"
        @mouseleave="hideOptions"
        v-bind:style="{
          opacity: hovered && index === hoveredIndex ? '0.3' : '1',
          cursor: 'pointer',
        }"
        @click="openCeleb(cast)"
      >
        <img
          :src="imagePath + cast.profile_path"
          alt="Movies"
          width="150"
          height="200"
          class="imageContent"
        />
        <p class="name">{{ cast.name }}</p>
        <p class="char">{{ cast.character }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import setLinks from "../../links.js";

export default {
  data() {
    return {
      movieDetails: [],
      imagePath: "https://image.tmdb.org/t/p/w500",
      movieCredits: [],
      allCast: [],
      genres: [],
      runTime: [],
      streamLink: "",
      trailers: [],
      spliceCast: [],
      showAllCast: false,
      hovered: false,
      hoveredIndex: -1,
      liked: false,
      checked: false,
      iFrameLink: "",
    };
  },
  created() {
    this.loadMovieDetails();
  },
  methods: {
    async loadMovieDetails() {
      this.movieDetails = await this.$store.getters["tv/tvDetails"];
      this.movieCredits = await this.$store.getters["tv/tvCredits"];
      this.allCast = this.movieCredits.cast.filter(
        (cast) => cast.known_for_department === "Acting"
      );
      this.movieDetails.genres.forEach((g) => {
        this.genres.push(" " + g.name);
      });
      this.movieDetails.episode_run_time.forEach((t) => {
        this.runTime.push(t);
      });
      const cloneCast = this.allCast.slice(0);
      this.spliceCast = cloneCast.splice(0, 10);
      this.streamLink = setLinks(this.movieDetails.networks[0].name);
    },
    async playTrailer(movieId) {
      await this.$store.dispatch("tv/loadTvVideos", movieId);
      this.trailers = await this.$store.getters["tv/tvVideos"];
      console.log(this.trailers);
      this.trailers.forEach((t) => {
        if (t.type === "Trailer") {
          this.trailerLink = `https://www.youtube.com/watch?v=${t.key}`;
          this.iFrameLink = `https://www.youtube.com/embed/${t.key}`;
        }
      });
      let windowFeatures = "width=1500,height=1000";
      // window.open(this.trailerLink, "youtubetrailer", windowFeatures);
      window.open(this.iFrameLink, "youtubetrailer", windowFeatures);
    },
    viewAllCast() {
      this.showAllCast = true;
    },
    goBack() {
      this.showAllCast = false;
    },
    showOptions(i) {
      this.hovered = true;
      this.hoveredIndex = i;
    },
    hideOptions() {
      // this.hovered = false;
    },
    async openCeleb(cast) {
      await this.$store.dispatch("celebs/loadCelebDetails", cast.id);
      await this.$store.dispatch("celebs/loadCelebCredits", cast.id);
      this.$router.replace(`/celebs/${cast.id}`);
    },
    async likeContent(tv) {
      this.liked = !this.liked;
      await this.$store.dispatch("movies/addToLikedTv", tv);
    },
    async addContent(tv) {
      this.checked = true;
      await this.$store.dispatch("movies/addToWatchlistTv", tv);
    },
    removeContent() {
      this.checked = false;
    },
  },
};
</script>


<style scoped>
h1 {
  color: white;
  margin: 0px;
}
p {
  color: white;
}
h3 {
  color: white;
}
.movieContainer {
  width: 100vw;
  height: 92.7vh;
  border-radius: 15px;
  display: flex;
  overflow: hidden;
  position: relative;
  flex-direction: column;
}
.bc-image {
  opacity: 0.1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
}
.cast {
  display: flex;
  padding: 10px;
  position: relative;
}
.actor {
  padding: 20px;
}
.infoContainer {
  display: flex;
  padding: 65px;
}
.tagline {
  color: gray;
  font-size: 20px;
}
.release {
  display: flex;
  justify-content: space-between;
  width: 75%;
  margin-top: -20px;
}
.rating {
  border: 2px solid;
  border-radius: 25px;
  width: 40px;
  height: 40px;
}
.number {
  padding-left: 5px;
  margin-top: 7px;
}
.seasons {
  display: flex;
  justify-content: space-between;
  width: 20%;
  margin-top: -20px;
}
.content {
  padding-left: 100px;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.castTitle {
  display: flex;
  justify-content: space-between;
  margin-left: 30px;
  margin-right: 30px;
  position: relative;
}
.name {
  margin-bottom: 7px;
}
.char {
  color: gray;
  font-size: 13px;
}
.stream {
  color: white;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.network {
  display: flex;
  justify-content: space-between;
  width: 225px;
  position: relative;
}
.allCast {
  display: flex;
  padding: 10px;
  position: relative;
  flex-wrap: wrap;
}
.user {
  display: flex;
  justify-content: space-between;
  width: 20%;
}
.watchlist {
  display: flex;
  justify-content: space-between;
  width: 100px;
  margin-top: 7px;
  position: relative;
}
</style>