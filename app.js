const TMDB_API_KEY = "c8d2a5be394f106d0d73cdbf5f13d927";
const BASE_URL = "https://api.themoviedb.org/3";

// Funkcja pobierająca filmy z danej kategorii
async function fetchMovies(category = "popular") {
  const url = `${BASE_URL}/movie/${category}?api_key=${TMDB_API_KEY}&language=pl-PL&page=1`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

// Funkcja tworząca elementy filmów na stronie
function createMovieElement(movie) {
  const movieTemplate = document.getElementById("movieTemplate").content.cloneNode(true);
  movieTemplate.querySelector(".poster").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  movieTemplate.querySelector(".title").textContent = movie.title;
  movieTemplate.querySelector(".year").textContent = new Date(movie.release_date).getFullYear();
  movieTemplate.querySelector(".watch-btn").addEventListener("click", () => {
    document.getElementById("lockerModal").classList.remove("hidden");
  });
  return movieTemplate;
}

// Funkcja do ładowania i wyświetlania filmów
async function loadMovies() {
  const categories = ["popular", "top_rated", "upcoming", "now_playing"];
  const movieContainer = document.getElementById("movieContainer");
  movieContainer.innerHTML = "";

  for (const category of categories) {
    const movies = await fetchMovies(category);
    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent =
      category.charAt(0).toUpperCase() + category.slice(1).replace("_", " ");
    movieContainer.appendChild(categoryTitle);

    for (const movie of movies) {
      const movieElement = createMovieElement(movie);
      movieContainer.appendChild(movieElement);
    }
  }
}

// Funkcja obsługująca wyszukiwanie
document.getElementById("searchInput").addEventListener("input", async (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const movieContainer = document.getElementById("movieContainer");
  movieContainer.innerHTML = "";

  const allMovies = await fetchMovies();
  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );
  filteredMovies.forEach((movie) => {
    const movieElement = createMovieElement(movie);
    movieContainer.appendChild(movieElement);
  });
});

// Ładowanie filmów po załadowaniu strony
window.onload = loadMovies;
