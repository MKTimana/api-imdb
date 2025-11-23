<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <ul class="flex flex-col gap-3 md:gap-5 p-2 lg:grid lg:grid-cols-2">
    <li v-for="(movie, index) in movies" :key="index">
      <Card :movie="movie" />
    </li>
  </ul>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getPopularMovies } from './api/service';

export default {
  name: 'IMDB',
  setup() {
    const filmes = ref([])

    onMounted(async () => {
      const data = await getPopularMovies()
      filmes.value = data
    })
    return { filmes }
  }
}

</script>

<style>
#app {
  text-align: center;
}

.movie {
  display: inline-block;
  margin: 10px;
  text-align: center;
}

.movie img {
  width: 200px;
  height: auto;
}
<style scoped>

</style>