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
  console.log(data);  // Sprawdzanie odpowiedzi API
  displayMovies(data.results);
}

// Fetch movies by search term
async function searchMovies(query) {
  const response = await fetch(`${API_URL}search/movie?api_key=${TMDB_API_KEY}&language=pl-PL&query=${query}`);
  const data = await response.json();
  console.log(data);  // Sprawdzanie odpowiedzi API
  displayMovies(data.results);
}

// Display movies on the page
function displayMovies(movies) {
  movieContainer.innerHTML = "";
  if (movies.length === 0) {
    movieContainer.innerHTML = "Brak wyników";
  } else {
    movies.forEach(movie => {
      // Sprawdzamy, czy dane filmu zawierają poster_path
      console.log(movie.poster_path);  // Sprawdzamy, czy istnieje poster_path
      if (movie.poster_path) {
        const movieElement = document.getElementById("movieTemplate").content.cloneNode(true);
        movieElement.querySelector(".poster").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieElement.querySelector(".title").textContent = movie.title;
        movieElement.querySelector(".year").textContent = new Date(movie.release_date).getFullYear();
        movieElement.querySelector(".watch-btn").addEventListener("click", () => openLocker());
        movieContainer.appendChild(movieElement);
      } else {
        console.log(`Brak obrazu dla filmu: ${movie.title}`);  // Jeśli brak obrazu, logujemy to
      }
    });
  }
}

// Open content locker modal
function openLocker() {
  modal.classList.add("show");
}

// Close content locker modal
closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

// Set up category click event
categoryList.addEventListener("click", (event) => {
  if (event.target && event.target.matches("li[data-category]") && event.target.dataset.category !== currentCategory) {
    currentCategory = event.target.dataset.category;
    fetchMovies(currentCategory);
  }
});

// Set up search input event
searchInput.addEventListener("input", (event) => {
  const query = event.target.value;
  if (query.length >= 3) {
    searchMovies(query);
  } else if (query.length === 0) {
    fetchMovies(currentCategory);
  }
});

// Fetch popular movies by default
fetchMovies(currentCategory);
