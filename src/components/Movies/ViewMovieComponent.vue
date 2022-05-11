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
          <h1>{{ movieDetails.title }}</h1>
          <p class="tagline">{{ movieDetails.tagline }}</p>
          <div class="release">
            <p>{{ genres.toString() }}</p>
            <p>Released: {{ movieDetails.release_date }}</p>
            <p>
              Runtime: {{ Math.floor(movieDetails.runtime / 60) }}h
              {{ movieDetails.runtime % 60 }}min
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
        <div style="position: relative">
          <button-container
            title="Play Trailer"
            @click="playTrailer(movieDetails.id)"
          ></button-container>
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
    <div class="cast">
      <div
        v-for="(cast, index) in spliceCast"
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
          :src="
            cast.profile_path !== null ? imagePath + cast.profile_path : noImage
          "
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
          :src="
            cast.profile_path !== null ? imagePath + cast.profile_path : noImage
          "
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
export default {
  data() {
    return {
      movieDetails: [],
      imagePath: "https://image.tmdb.org/t/p/w500",
      noImage:
        "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg",
      movieCredits: [],
      allCast: [],
      genres: [],
      spliceCast: [],
      showAllCast: false,
      hovered: false,
      hoveredIndex: -1,
      liked: false,
      checked: false,
    };
  },
  created() {
    this.loadMovieDetails();
  },
  methods: {
    async loadMovieDetails() {
      this.movieDetails = await this.$store.getters["movies/movieDetails"];
      this.movieCredits = await this.$store.getters["movies/movieCredits"];
      this.allCast = this.movieCredits.cast.filter(
        (cast) => cast.known_for_department === "Acting"
      );
      this.movieDetails.genres.forEach((g) => {
        this.genres.push(" " + g.name);
      });
      console.log(this.allCast, this.spliceCast);
      const cloneCast = this.allCast.slice(0);
      this.spliceCast = cloneCast.splice(0, 10);
      console.log(this.allCast, this.spliceCast);
    },
    viewAllCast() {
      console.log("clicked");
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
    async likeContent(movie) {
      this.liked = !this.liked;
      await this.$store.dispatch("movies/addToLikedMovies", movie);
    },
    async addContent(movie) {
      this.checked = true;
      await this.$store.dispatch("movies/addToWatchlistMovies", movie);
    },
    removeContent() {
      this.checked = false;
    },
    async playTrailer(movieId) {
      await this.$store.dispatch("movies/loadVideos", movieId);
      this.trailers = await this.$store.getters["movies/videos"];
      console.log(this.trailers);
      this.trailers.forEach((t) => {
        if (t.type === "Trailer") {
          this.trailerLink = `https://www.youtube.com/watch?v=${t.key}`;
          this.iFrameLink = `https://www.youtube.com/embed/${t.key}`;
        }
      });
      let windowFeatures = "width=1500,height=1000";
      // window.open(this.trailerLink, "youtubetrailer", windowFeatures);
      console.log("iframe: ", this.iFrameLink);
      window.open(this.iFrameLink, "youtubetrailer", windowFeatures);
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
.content {
  padding-left: 100px;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.tagline {
  color: gray;
  font-size: 18px;
  margin-top: -5px;
  font-style: italic;
  /* margin-top: 5px; */
}
.release {
  display: flex;
  justify-content: space-between;
  width: 70%;
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