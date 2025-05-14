const API_KEY = 'c8d2a5be394f106d0d73cdbf5f13d927';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const movieContainer = document.getElementById('movieContainer');
const movieTemplate = document.getElementById('movieTemplate');
const searchInput = document.getElementById('searchInput');

const modal = document.getElementById("lockerModal");
const closeModal = document.getElementById("closeModal");

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("watch-btn")) {
    modal.classList.remove("hidden");
  }
});

async function fetchMoviesByCategory(category) {
  const res = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=pl-PL`);
  const data = await res.json();
  return data.results;
}

async function loadMovies() {
  const categories = ['popular', 'top_rated', 'now_playing', 'upcoming'];
  let allMovies = [];

  for (const cat of categories) {
    const movies = await fetchMoviesByCategory(cat);
    allMovies = [...allMovies, ...movies];
  }

  displayMovies(allMovies);
}

function
