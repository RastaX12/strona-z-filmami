document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "c8d2a5be394f106d0d73cdbf5f13d927";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const movieContainer = document.getElementById("movieContainer");
  const movieTemplate = document.getElementById("movieTemplate");
  const searchInput = document.getElementById("searchInput");

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
    const res = await fetch(
      `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=pl-PL`
    );
    const data = await res.json();
    return data.results;
  }

  async function loadMovies() {
    const categories = ["popular", "top_rated", "now_playing", "upcoming"];
    let allMovies = [];

    for (const cat of categories) {
      const movies = await fetchMoviesByCategory(cat);
      allMovies = [...allMovies, ...movies];
    }

    displayMovies(allMovies);
  }

  function displayMovies(movies) {
    movieContainer.innerHTML = "";

    movies.forEach((movie) => {
      if (!movie.poster_path) return;

      const clone = movieTemplate.content.cloneNode(true);
      clone.querySelector(".poster").src = IMG_BASE_URL + movie.poster_path;
      clone.querySelector(".title").textContent = movie.title;
      clone.querySelector(".year").textContent =
        "Rok: " + (movie.release_date?.split("-")[0] || "brak");
      movieContainer.appendChild(clone);
    });
  }

  searchInput.addEventListener("input", async function () {
    const query = this.value.trim();

    if (query.length < 2) return loadMovies();

    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&language=pl-PL`
    );
    const data = await res.json();

    displayMovies(data.results);
  });

  loadMovies();
});
