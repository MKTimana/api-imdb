
import axios from 'axios'


const apiKey = 'ef5be530451329d0405c4fae2da47611'
const base_url = 'https://api.themoviedb.org/3'

const db = axios.create({
  baseURL: base_url,
  params: {
    api_key: apiKey,
    language: 'pt-PT', 
  },
})

export const getPopularMovies = async (page = 1) => {
  try {
    const res = await db.get('/movie/popular', { params: { page } })
    return res.data.results
  } catch (error) {
    console.error('Erro ao buscar filmes populares', error)
    throw error
  }
}

export const getMoviesByCategory = async (category, page = 1) => {
  try {
    const res = await db.get(`/movie/${category}`, { params: { page } })
    return res.data.results
  } catch (error) {
    console.error('Erro ao buscar filmes por categoria', error)
    throw error
  }
}

export const searchMovies = async (title, year, page = 1) => {
  try {
    const res = await db.get('/search/movie', {
      params: {
        query: title,
        primary_release_year: year || undefined,
        page,
      },
    })
    return res.data.results
  } catch (error) {
    console.error('Erro na pesquisa de filmes', error)
    throw error
  }
}

export const discoverMoviesByYear = async (year, page = 1) => {
  try {
    const res = await db.get('/discover/movie', {
      params: {
        primary_release_year: year,
        page,
      },
    })
    return res.data.results
  } catch (error) {
    console.error('Erro ao descobrir filmes por ano', error)
    throw error
  }
}

export const getMovieDetails = async (id) => {
  try {
    const res = await db.get(`/movie/${id}`)
    return res.data
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme', error)
    throw error
  }
}

export default db