<template>
  <div id="app">
    <h1>Filmes</h1>
    <div v-for="filme in filmes" :key="filme.id" class="movie">
    <span>{{ filme.title }}</span>
    </div>
  </div>
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
</style>