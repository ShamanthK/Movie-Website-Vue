import { APIKEY } from '../../../apiKey'; 

export default {
    async loadPopularMovies(context, payload) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=${payload}`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setPopularMovies', responseData)
    },
    async loadNowPlaying(context) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=en-US&page=1`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setNowPlaying', responseData)
    },
    async loadVideos(context, payload) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${payload}/videos?api_key=${APIKEY}`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setVideos', responseData)
    },
    async loadMovieDetails(context, payload) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${payload}?api_key=${APIKEY}&language=en-US`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setMovieDetails', responseData)
    },
    async loadMovieCredits(context, payload) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${payload}/credits?api_key=${APIKEY}&language=en-US`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setMovieCredits', responseData)
    },
    async loadTopRatedMovies(context, payload) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=en-US&page=${payload}`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setTopRatedMovies', responseData)
    },
    async loadUpcomingMovies(context, payload) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=en-US&page=${payload}`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setUpcomingMovies', responseData)
    },
    async addToLikedMovies(context, payload) {
        console.log(payload)
        context.commit('setLikedMovies', payload)
    },
    async addToWatchlistMovies(context, payload) {
        console.log(payload)
        context.commit('setWatchlistMovies', payload)
    },
    async addToLikedTv(context, payload) {
        console.log(payload)
        context.commit('setLikedTv', payload)
    },
    async addToWatchlistTv(context, payload) {
        console.log(payload)
        context.commit('setWatchlistTv', payload)
    },
    async searchMovies(context, payload) {
        console.log(payload)
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${payload}&page=1&include_adult=false`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)
        context.commit('setSearchedMovies', responseData)
    },
    async movieVideos(context, payload) {
        console.log(payload)
        const response = await fetch(`https://api.themoviedb.org/3/movie/${payload}/videos?api_key=${APIKEY}&language=en-US`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)
        context.commit('setMovieVideos', responseData)
    },
}

