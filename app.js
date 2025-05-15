const TMDB_API_KEY = "c8d2a5be394f106d0d73cdbf5f13d927";
const API_URL = "https://api.themoviedb.org/3/";

const movieContainer = document.getElementById("movieContainer");
const categoryList = document.getElementById("categoryList");
const modal = document.getElementById("lockerModal");
const closeModal = document.getElementById("closeModal");

let currentCategory = "popular";

// Fetch movies by category
async function fetchMovies(category) {
  try {
    const response = await fetch(`${API_URL}movie/${category}?api_key=${TMDB_API_KEY}&language=en-US`);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// Display movies on the page
function displayMovies(movies) {
  movieContainer.innerHTML = "";
  if (!movies || movies.length === 0) {
    movieContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  movies.forEach(movie => {
    if (!movie.poster_path) return; // pomijaj bez plakatu

    const template = document.getElementById("movieTemplate").content.cloneNode(true);
    template.querySelector(".poster").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    template.querySelector(".poster").alt = movie.title;
    template.querySelector(".title").textContent = movie.title;
    template.querySelector(".year").textContent = new Date(movie.release_date).getFullYear();
    template.querySelector(".watch-btn").addEventListener("click", openLocker);

    movieContainer.appendChild(template);
  });
}

// Show modal content locker
function openLocker() {
  modal.classList.add("show");
}

// Close modal locker
closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

// Change category on click
categoryList.addEventListener("click", e => {
  if (e.target && e.target.matches("li[data-category]")) {
    const selected = e.target.dataset.category;
    if (selected !== currentCategory) {
      currentCategory = selected;

      // update active class
      [...categoryList.children].forEach(li => li.classList.remove("active"));
      e.target.classList.add("active");

      fetchMovies(currentCategory);
    }
  }
});

// Initial fetch
fetchMovies(currentCategory);
