<script>
import {ref} from "vue";

export default {
  props:{
    movie: {
      type: Object,
      required: true,
    },
  },
  data(){
    return{
      extend: false
    }
  },
  methods:{
    handleExtend(){
      this.extend = !this.extend;
    }
  }
}
</script>

<template>
  <div
    class="relative w-full md:w-2/3 lg:w-full dark:bg-dark-200/30 flex flex-col text-dark-300 dark:text-surface-100 rounded-xl p-4 shadow-md shadow-black/50"
  >
  <div class="flex gap-3 ">
    <img
    :src="`https://api.themoviedb.org/3${movie.poster_path}`"
    :alt="movie.title"
      class="flex min-w-32 max-w-40 min-h-44 max-h-56 border text-sm"
      />
    <span class="flex flex-col gap-1 sm:gap-2.5 justify-evenly">
      <h2 class="text-xl font-semibold w-full border-b-2 border-accent-300">
        {{ movie.title }}
      </h2>
      <ul
        class="text-justify text-xs sm:text-sm md:text-base max-h-32 line-clamp-4"
      >
      <li>
        Release date: {{ (movie.release_date) }}
      </li>
      <li>
        Popularity: {{ Math.floor(movie.popularity) }}
      </li>
      <li>
        Rating: <b :class="movie.vote_average> 5?'text-green-500': 'text-red-600'">
          {{ (movie.vote_average).toFixed(1) }}

        </b> 
      </li>
    </ul>
    <span class="flex gap-3 items-center">
      <button
      class="outline-0 transition-smooth self-center w-full rounded-lg shadow-sm shadow-black/30 hover:scale-95 px-2 py-0.5 bg-linear-to-t from-accent-300 to-accent-200 sm:max-w-1/2"
      >
      View
    </button>
    <button v-if="movie.overview" @click="handleExtend" class="px-2 rounded-lg shadow-sm shadow-black/30 bg-surface-300 dark:bg-dark-100 transition-smooth hover:scale-95" >
      overview
    </button>
  </span>
</span>
</div>

<!-- Details  -->
<p class="text-xs w-full text-ellipsis line-clamp-6 text-justify transition-smooth" :class="!extend ? 'h-0' : 'p-3 h-32 sm:h-16'">
  {{ movie.overview }}
</p>
</div>
</template>

<style scoped></style>
