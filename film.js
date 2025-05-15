const apiKey = 'c8d2a5be394f106d0d73cdbf5f13d927'; // zamień na swój klucz TMDb
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('title').textContent = data.title;
    document.getElementById('poster').src = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
    document.getElementById('overview').textContent = data.overview;
    document.getElementById('genres').textContent = data.genres.map(g => g.name).join(', ');
    document.getElementById('rating').textContent = data.vote_average;
  })
  .catch(error => {
    document.getElementById('title').textContent = 'Movie not found.';
    console.error(error);
  });

document.getElementById('watch-btn').addEventListener('click', () => {
  // tutaj możesz dodać content locker lub przekierowanie
  alert("Tutaj będzie content locker lub redirect do streamu.");
});
