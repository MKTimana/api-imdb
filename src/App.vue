<script setup>
import { ref, onMounted } from 'vue'
import {
  getPopularMovies,
  getMoviesByCategory,
  searchMovies,
  discoverMoviesByYear,
  getMovieDetails,
} from './api/service'


const movies = ref([])
const loading = ref(false)
const error = ref(null)

const searchQuery = ref('')
const selectedGenre = ref('')
const selectedYear = ref('')
const sortBy = ref('popularity')
const activeCategory = ref('popular')
const selectedMovieDetail = ref(null)


const categories = [
  { id: 'popular', label: '🔥 Populares' },
  { id: 'now_playing', label: '🎬 Em Cartaz' },
  { id: 'top_rated', label: '⭐ Bem Avaliados' },
  { id: 'upcoming', label: '🚀 Em Breve' },
]


const allGenres = [
  { id: 28, name: 'Ação' },
  { id: 12, name: 'Aventura' },
  { id: 16, name: 'Animação' },
  { id: 35, name: 'Comédia' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentário' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Família' },
  { id: 14, name: 'Fantasia' },
  { id: 36, name: 'História' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Música' },
  { id: 9648, name: 'Mistério' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Ficção Científica' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'Guerra' },
  { id: 37, name: 'Faroeste' },
]


const getGenreName = (genreId) => {
  const genre = allGenres.find((g) => g.id === genreId)
  return genre?.name || 'Desconhecido'
}

const formatDate = (date) => {
  if (!date) return 'Desconhecido'
  return new Date(date).toLocaleDateString('pt-PT', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const sortMovies = () => {
  const sorted = [...movies.value]

  if (sortBy.value === 'rating') {
    sorted.sort((a, b) => b.vote_average - a.vote_average)
  } else if (sortBy.value === 'release') {
    sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
  } else {
    sorted.sort((a, b) => b.popularity - a.popularity)
  }

  movies.value = sorted
}


const fetchMovies = async () => {
  loading.value = true
  error.value = null
  movies.value = []

  try {
    let results = []


    if (searchQuery.value) {
      results = await searchMovies(
        searchQuery.value,
        selectedYear.value || undefined,
      )
    }

    else if (selectedYear.value) {
      results = await discoverMoviesByYear(selectedYear.value)
    }

    else {
      if (!activeCategory.value || activeCategory.value === 'popular') {
        results = await getPopularMovies()
      } else {
        results = await getMoviesByCategory(activeCategory.value)
      }
    }

    if (!Array.isArray(results)) {
      results = []
    }


    if (selectedGenre.value) {
      const genreId = Number(selectedGenre.value)
      results = results.filter((movie) =>
        movie.genre_ids?.includes(genreId),
      )
    }

    movies.value = results
    sortMovies()
  } catch (err) {
    console.error('[fetchMovies] erro:', err)
    error.value = err?.message || 'Erro desconhecido ao carregar filmes'
  } finally {
    loading.value = false
  }
}


const selectCategory = (categoryId) => {
  activeCategory.value = categoryId

  searchQuery.value = ''
  selectedGenre.value = ''
  selectedYear.value = ''
  fetchMovies()
}

const handleSearch = () => {

  activeCategory.value = null
  fetchMovies()
}

const handleGenreFilter = () => {
  fetchMovies()
}

const handleYearFilter = () => {
  fetchMovies()
}

const handleSort = () => {
  sortMovies()
}


const selectMovie = async (movie) => {
  console.log('[selectMovie] clicado em:', movie.title)

  try {
    const full = await getMovieDetails(movie.id)
    console.log('[selectMovie] detalhes carregados:', full)
    selectedMovieDetail.value = full || movie
  } catch (err) {
    console.error('[selectMovie] erro ao buscar detalhes:', err)

    selectedMovieDetail.value = movie
  }

  console.log('[selectMovie] selectedMovieDetail:', selectedMovieDetail.value)
}


onMounted(() => {
  fetchMovies()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">


    <header class="border-b border-slate-800 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
      <div class="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="h-11 w-11 rounded-2xl bg-black/20 flex items-center justify-center shadow-inner">
            <span class="text-2xl">🎬</span>
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-white tracking-tight">
              GHMW <span class="font-extralight">Filmes</span>
            </h1>
            <p class="text-sm md:text-base text-blue-100/90">
              Descubra filmes incríveis, tendências e novidades do cinema.
            </p>
          </div>
        </div>

        <div class="hidden md:flex flex-col items-end text-xs text-blue-100/80">
          <span class="uppercase tracking-[0.2em] text-blue-200/80">Powered by</span>
          <span class="font-semibold">TMDb API</span>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-8">


      <section class="space-y-4">
        <div class="flex flex-wrap gap-2 border-b border-slate-800/80 pb-4">
          <button v-for="category in categories" :key="category.id" @click="selectCategory(category.id)" :class="[
            'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            'border border-transparent',
            activeCategory === category.id
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 border-blue-400/60'
              : 'bg-slate-900/70 text-slate-300 border-slate-700/70 hover:border-slate-500 hover:bg-slate-800'
          ]">
            <span>{{ category.label }}</span>
            <span v-if="activeCategory === category.id"
              class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
          <div class="flex flex-wrap gap-2 items-center text-slate-300/90">
            <span class="inline-flex items-center gap-2 rounded-full bg-slate-900/70 border border-slate-700 px-3 py-1">
              <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span v-if="movies.length">Mostrando {{ movies.length }} filmes</span>
              <span v-else>Nenhum filme carregado</span>
            </span>

            <span v-if="searchQuery"
              class="inline-flex items-center gap-2 rounded-full bg-slate-900/70 border border-slate-700 px-3 py-1">
              <span class="text-slate-400">Pesquisa:</span>
              <span class="font-medium text-slate-100">"{{ searchQuery }}"</span>
            </span>

            <span v-if="selectedYear"
              class="inline-flex items-center gap-2 rounded-full bg-slate-900/70 border border-slate-700 px-3 py-1">
              <span class="text-slate-400">Ano:</span>
              <span class="font-medium text-slate-100">{{ selectedYear }}</span>
            </span>
          </div>

          <div class="text-slate-500 text-[11px] md:text-xs">
            Dica: pressione <span class="px-1 py-0.5 rounded bg-slate-800/80 border border-slate-700">Enter</span> para
            pesquisar
          </div>
        </div>
      </section>


      <section
        class="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-xl shadow-black/40 p-4 md:p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">


          <div class="space-y-1.5">
            <label class="block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Pesquisar
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-3 flex items-center text-slate-500 text-sm">🔍</span>
              <input v-model="searchQuery" type="text" placeholder="Digite o título do filme..."
                @keyup.enter="handleSearch"
                class="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-950/60 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition-all" />
            </div>
          </div>


          <div class="space-y-1.5">
            <label class="block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Gênero
            </label>
            <select v-model="selectedGenre" @change="handleGenreFilter"
              class="w-full px-3 py-2.5 rounded-lg bg-slate-950/60 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition-all cursor-pointer">
              <option value="">Todos os gêneros</option>
              <option v-for="genre in allGenres" :key="genre.id" :value="genre.id">
                {{ genre.name }}
              </option>
            </select>
          </div>


          <div class="space-y-1.5">
            <label class="block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Ano
            </label>
            <input v-model="selectedYear" type="number" min="1900" max="2100" placeholder="Ex: 2024"
              @change="handleYearFilter"
              class="w-full px-3 py-2.5 rounded-lg bg-slate-950/60 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition-all" />
          </div>


          <div class="space-y-1.5">
            <label class="block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Ordenar por
            </label>
            <select v-model="sortBy" @change="handleSort"
              class="w-full px-3 py-2.5 rounded-lg bg-slate-950/60 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition-all cursor-pointer">
              <option value="popularity">Popularidade</option>
              <option value="rating">Avaliação</option>
              <option value="release">Data de Lançamento</option>
            </select>
          </div>
        </div>
      </section>




      <section v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="n in 8" :key="n"
          class="animate-pulse rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div class="w-full h-72 bg-slate-800"></div>
          <div class="p-4 space-y-3">
            <div class="h-4 bg-slate-800 rounded w-3/4"></div>
            <div class="h-3 bg-slate-800 rounded w-1/2"></div>
            <div class="h-3 bg-slate-800 rounded w-full"></div>
          </div>
        </div>
      </section>


      <section v-else-if="error"
        class="rounded-2xl border border-red-800/70 bg-red-950/40 p-6 text-red-100 text-center shadow-lg shadow-red-900/40">
        <p class="font-semibold mb-1 text-red-200">⚠️ Erro ao carregar filmes</p>
        <p class="text-sm text-red-100/90">{{ error }}</p>
        <button @click="fetchMovies"
          class="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-medium text-white transition-colors">
          <span>🔄</span>
          <span>Tentar novamente</span>
        </button>
      </section>


      <section v-else-if="movies.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <article v-for="movie in movies" :key="movie.id" @click="selectMovie(movie)"
          class="group rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md overflow-hidden hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-900/30 transition-all duration-300 cursor-pointer flex flex-col">
          <div class="relative overflow-hidden bg-slate-800 aspect-[2/3]">
            <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              :alt="movie.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div v-else class="w-full h-full flex items-center justify-center text-slate-500 text-sm">
              Sem imagem
            </div>

            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <div class="flex items-center justify-between text-xs text-white/90">
                <div class="inline-flex items-center gap-1">
                  <span>⭐</span>
                  <span class="font-bold text-sm">{{ movie.vote_average.toFixed(1) }}</span>
                </div>
                <span class="opacity-75">{{ movie.vote_count }} votos</span>
              </div>
            </div>

            <div
              class="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg shadow-blue-900/50">
              {{ movie.vote_average.toFixed(1) }}
            </div>
          </div>

          <div class="p-4 flex-1 flex flex-col">
            <h3
              class="font-semibold text-sm md:text-base mb-1 line-clamp-2 group-hover:text-blue-300 transition-colors">
              {{ movie.title }}
            </h3>

            <p v-if="movie.original_title && movie.original_title !== movie.title"
              class="text-slate-400 text-[11px] mb-2 line-clamp-1">
              {{ movie.original_title }}
            </p>

            <div class="flex items-center gap-2 text-slate-400 text-xs mb-2">
              <span>📅</span>
              <span>{{ formatDate(movie.release_date) }}</span>
            </div>

            <div v-if="movie.genre_ids && movie.genre_ids.length > 0" class="flex flex-wrap gap-1.5 mb-3">
              <span v-for="genreId in movie.genre_ids.slice(0, 2)" :key="genreId"
                class="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-600/25 text-[11px] font-medium text-blue-100 border border-blue-500/30">
                {{ getGenreName(genreId) }}
              </span>
              <span v-if="movie.genre_ids.length > 2"
                class="inline-flex items-center text-[11px] text-slate-400 px-2 py-0.5">
                +{{ movie.genre_ids.length - 2 }}
              </span>
            </div>

            <p v-if="movie.overview" class="text-slate-400 text-[11px] md:text-xs line-clamp-2 mb-4 leading-relaxed">
              {{ movie.overview }}
            </p>

            <button @click.stop="selectMovie(movie)"
              class="mt-auto w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs md:text-sm font-medium text-white transition-colors">
              Ver detalhes
            </button>
          </div>
        </article>
      </section>


      <section v-else class="text-center py-16">
        <p class="text-slate-300 text-lg mb-2">🎬 Nenhum filme encontrado</p>
        <p class="text-slate-500 text-sm">
          Tente ajustar os filtros ou pesquisar por outro título.
        </p>
      </section>
    </main>

    <!-- MODAL DETALHES QUE NAO ESTA A FUNCIOAR -->
    <div v-if="selectedMovieDetail"
      class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div
        class="bg-slate-900/95 border border-slate-700 rounded-2xl max-w-2xl w-full my-8 shadow-2xl shadow-black/70 animate-in">
        <div v-if="selectedMovieDetail.backdrop_path" class="relative h-56 md:h-72 overflow-hidden rounded-t-2xl">
          <img :src="`https://image.tmdb.org/t/p/w1280${selectedMovieDetail.backdrop_path}`"
            :alt="selectedMovieDetail.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/30 to-transparent"></div>
          <button @click="selectedMovieDetail = null"
            class="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all">
            ✕
          </button>
        </div>
        <div v-else class="bg-slate-800 h-32 rounded-t-2xl flex items-center justify-between px-4 relative">
          <span class="text-slate-300 text-sm">Sem imagem de capa</span>
          <button @click="selectedMovieDetail = null"
            class="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all">
            ✕
          </button>
        </div>

        <div class="p-6 md:p-8 space-y-5">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-white mb-1">
              {{ selectedMovieDetail.title }}
            </h2>
            <p v-if="selectedMovieDetail.original_title && selectedMovieDetail.original_title !== selectedMovieDetail.title"
              class="text-slate-400 text-sm">
              {{ selectedMovieDetail.original_title }}
            </p>
          </div>

          <div class="flex flex-wrap gap-4 text-xs md:text-sm text-slate-200">
            <div class="flex items-center gap-2">
              <span class="text-yellow-400">⭐</span>
              <span class="font-semibold">{{ selectedMovieDetail.vote_average.toFixed(1) }}</span>
              <span class="text-slate-400">({{ selectedMovieDetail.vote_count }} votos)</span>
            </div>
            <div class="flex items-center gap-2">
              <span>📅</span>
              <span>{{ formatDate(selectedMovieDetail.release_date) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span>🔥</span>
              <span>{{ selectedMovieDetail.popularity.toFixed(0) }} popularidade</span>
            </div>
          </div>

          <div v-if="selectedMovieDetail.genre_ids && selectedMovieDetail.genre_ids.length > 0" class="space-y-2">
            <p class="text-slate-300 text-sm font-medium">Gêneros</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="genreId in selectedMovieDetail.genre_ids" :key="genreId"
                class="bg-blue-600/25 text-blue-100 px-3 py-1 rounded-full text-xs border border-blue-500/40">
                {{ getGenreName(genreId) }}
              </span>
            </div>
          </div>

          <div v-if="selectedMovieDetail.overview" class="space-y-2">
            <p class="text-slate-300 text-sm font-medium">Sinopse</p>
            <p class="text-slate-200 text-sm leading-relaxed">
              {{ selectedMovieDetail.overview }}
            </p>
          </div>

          <div class="pt-4 border-t border-slate-800">
            <button @click="selectedMovieDetail = null"
              class="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium text-white transition-colors">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-in {
  animation: fade-in 0.3s ease-out;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>