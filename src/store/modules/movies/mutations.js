export default {
    setPopularMovies(state, payload) {
        console.log('payload: ', payload)
        state.popularMovies = payload.results
    },
    setNowPlaying(state, payload) {
        console.log('payload: ', payload)
        state.nowPlaying = payload.results
    },
    setVideos(state, payload) {
        console.log('payload: ', payload)
        state.videos = payload.results
    },
    setMovieDetails(state, payload) {
        console.log('payload: ', payload)
        state.movieDetails = payload
    },
    setMovieCredits(state, payload) {
        state.movieCredits = payload
    },
    setTopRatedMovies(state, payload) {
        state.topRatedMovies = payload.results
    },
    setUpcomingMovies(state, payload) {
        state.upcomingMovies = payload.results
    },
    setLikedMovies(state, payload) {
        state.likedMovies.push(payload)
    },
    setWatchlistMovies(state, payload) {
        state.watchlistMovies.push(payload)
    },
    setLikedTv(state, payload) {
        state.likedTv.push(payload)
    },
    setWatchlistTv(state, payload) {
        state.watchlistTv.push(payload)
    },
    setSearchedMovies(state, payload) {
        console.log('payload: ', payload)
        state.searchedMovies = payload.results
    },
    setMovieVideos(state, payload) {
        console.log('payload: ', payload)
        state.movieVideos = payload.results
    }
}