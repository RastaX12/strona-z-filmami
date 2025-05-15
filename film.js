const apiKey = 'c8d2a5be394f106d0d73cdbf5f13d927'; // <-- wklej tutaj swój klucz TMDb
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
  .then(res => {
    if (!res.ok) throw new Error('Movie not found');
    return res.json();
  })
  .then(data => {
    document.getElementById('title').textContent = data.title || 'No title';
    document.getElementById('tagline').textContent = data.tagline || '';
    document.getElementById('release-date').textContent = data.release_date || 'N/A';
    document.getElementById('runtime').textContent = data.runtime || 'N/A';
    document.getElementById('genres').textContent = data.genres.map(g => g.name).join(', ') || 'N/A';
    document.getElementById('rating').textContent = data.vote_average?.toFixed(1) || 'N/A';
    document.getElementById('vote-count').textContent = data.vote_count || 'N/A';
    document.getElementById('overview').textContent = data.overview || 'No overview available.';
    document.getElementById('poster').src = data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : 'placeholder.jpg'; // Dodaj placeholder jeśli brak plakatu
    document.getElementById('poster').alt = `Poster of ${data.title}`;
  })
  .catch(error => {
    document.getElementById('title').textContent = 'Movie not found.';
    document.getElementById('overview').textContent = '';
    console.error(error);
  });

document.getElementById('watch-btn').addEventListener('click', () => {
  alert("Tutaj będzie content locker lub redirect do streamu.");
});
