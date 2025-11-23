const apiKey = 'ef5be530451329d0405c4fae2da47611';

export async function fetchPopularMovies() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`);
  return (await res.json()).results;
}

export async function searchMovies(title, year) {
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`;
  if (year) url += `&primary_release_year=${year}`;
  const res = await fetch(url);
  return (await res.json()).results;
}

export async function discoverMoviesByYear(year) {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${year}`;
  const res = await fetch(url);
  return (await res.json()).results;
}

export async function getMovieDetails(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`);
  return await res.json();
}
