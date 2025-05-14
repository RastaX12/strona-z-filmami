const TMDB_API_KEY = "c8d2a5be394f106d0d73cdbf5f13d927";
const API_URL = "https://api.themoviedb.org/3/";

const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const categoryList = document.getElementById("categoryList");
const modal = document.getElementById("lockerModal");
const closeModal = document.getElementById("closeModal");

let currentCategory = "popular";

// Fetch movies by category or search term
async function fetchMovies(category) {
  const response = await fetch(`${API_URL}movie/${category}?api_key=${TMDB_API_KEY}&language=pl-PL`);
  const data = await response.json();
  console.log(data);  // Sprawdzenie odpowiedzi API w konsoli
  displayMovies(data.results);
}

// Fetch movies by search term
async function searchMovies(query) {
  const response = await fetch(`${API_URL}search/movie?api_key=${TMDB_API_KEY}&language=pl-PL&query=${query}`);
  const data = await response.json();
  console.log(data);  //
