<script>
import Card from './components/Card.vue'
import Searchbar from './components/Searchbar.vue'
export default {
  components: {
    Card, Searchbar
  },
  data() {
    return {
      movies: [
        {title: "Home", image_url: "https://via.placeholder.com/150", description: "A family of mice living in a quiet suburban home are uprooted by a group of streetwise cats."},
        {title: "Home", image_url: "https://via.placeholder.com/150", description: "A family of mice living in a quiet suburban home are uprooted by a group of streetwise cats."},
        {title: "Home", image_url: "https://via.placeholder.com/150", description: "A family of mice living in a quiet suburban home are uprooted by a group of streetwise cats."},
      ]
    };
  },
  methods: {
    handleSearch(query) {
      return `<div>Searching for: ${query}</div>`;
      
    }
  }
};
</script>

<template>
  <div>
    <Searchbar @search="handleSearch"/>
  </div>

  <ul class="flex flex-col gap-3 md:gap-5 p-2 lg:grid lg:grid-cols-2">
    <li v-for="(movie, index) in movies" :key="index">
      <Card :movie="movie" />
    </li>
  </ul>
</template>

<style scoped>

</style>