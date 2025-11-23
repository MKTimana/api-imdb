import axios from "axios";
const apiKey = 'ef5be530451329d0405c4fae2da47611';
const base_url = 'https://api.themoviedb.org/3'

const db = axios.create({
  baseURL: base_url,
  params: {
    api_key: apiKey,
    language: 'pt-PT'
  }
})

// export const getPopularMovies = async () => {
//   try {
//     const res = await db.get('/movie/popular')
//     console.log(res.data)
//     return res.data
//   } catch (error) {
//     console.log('erro de consulta', error)
//     return null
//   }
// }

export const getPopularMovies = async () => {
  try {
    const res = await db.get('/movie/popular'); 
    console.log("🚀 ~ fetchPopularMovies ~ res:", res.data)
    return res.data.results;  
  } catch (error) {
    console.log('Erro de consulta', error);
    return [];
  }
};

export const searchMovies = async (title, year) => {
  try {
    let url = `/search/movie?query=${encodeURIComponent(title)}`;
    if (year) url += `&primary_release_year=${year}`;
    const res = await db.get(url);  // Usando axios para pesquisa de filmes
    return res.data.results;  // Retorna os filmes encontrados
  } catch (error) {
    console.log('Erro de consulta', error);
    return [];
  }
};

export const discoverMoviesByYear = async (year) => {
  try {
    const res = await db.get(`/discover/movie?primary_release_year=${year}`);  // Usando axios para descobrir filmes por ano
    return res.data.results;  // Retorna os filmes do ano especificado
  } catch (error) {
    console.log('Erro de consulta', error);
    return [];
  }
};

export const getMovieDetails = async (id) => {
  try {
    const res = await db.get(`/movie/${id}`);  // Usando axios para obter detalhes do filme
    return res.data;  // Retorna os detalhes do filme
  } catch (error) {
    console.log('Erro de consulta', error);
    return null;
  }
};

export default db;
