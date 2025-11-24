<script>
import Card from "./components/Card.vue";
import { getPopularMovies } from "./api/service";
import Searchbar from "./components/Searchbar.vue";

export default {
  components: {
    Card,
    Searchbar,
  },
  data() {
    return {
      filmes: [],
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    // Get all movies from API
    async fetchMovies() {
      const data = await getPopularMovies();

      this.filmes = data;
    },

    // get movie from query
    handleSearch(query) {
      return `<div>Searching for: ${query}</div>`;
    },
  },
};
</script>

<template>
  <h1 class="text-3xl text-center pt-4 pb-1 bg-surface-200 dark:bg-dark-200/40">
    <b class="text-accent-200">IMDB</b> Movie Finder
  </h1>
  <ul class="flex flex-col gap-3 md:gap-5 p-2 lg:grid lg:grid-cols-2">
    <li class="my-2">
      <Searchbar @search="handleSearch" />
    </li>
    <li v-if="filmes.length === 0">
      <h2 class="text-3xl">No movies found {{ " :(" }}</h2>
    </li>
    <li v-else v-for="(movie, index) in filmes" :key="index">
      <Card :movie="movie" />
    </li>
  </ul>
</template>

<style scoped></style>
