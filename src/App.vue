<template>
  <ul class="flex flex-col gap-3 md:gap-5 p-2 lg:grid lg:grid-cols-2">
    <li v-if="filmes.length === 0">
      <h2>No movies found {{ " :(" }}</h2>
    </li>
    <li v-else v-for="(movie, index) in filmes" :key="index">
      <Card :movie="movie" />
    </li>
  </ul>
</template>

<script>
import { ref, onMounted } from "vue";
import { getPopularMovies } from "./api/service";
import Card from "./components/Card.vue";

export default {
  name: "IMDB",
  components: { Card },
  setup() {
    const filmes = ref([]);

    onMounted(async () => {
      const data = await getPopularMovies();

      filmes.value = data;
    });
    return { filmes };
  },
};
</script>

<style scoped></style>
