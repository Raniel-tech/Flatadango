fetch("http://localhost:3000/films")
  .then(res => res.json())
  .then(films => {
    displayFilms(films);
  })
  .catch(err => console.error("Error:", err));

function displayFilms(films) {
  const filmList = document.getElementById('film-list');
  filmList.innerHTML = '';

  films.forEach(film => {
    const li = document.createElement('li');
    li.textContent = film.title;
    li.style.cursor = 'pointer'; 
    filmList.appendChild(li);

    
    li.addEventListener('click', () => {
      showFilmDetails(film);
    });
  });
}

function showFilmDetails(film) {
  document.getElementById('film-title').textContent = film.title;
  document.getElementById('film-poster').src = film.poster;
  document.getElementById('film-description').textContent = film.description;
  document.getElementById('film-runtime').textContent = film.runtime;
  document.getElementById('film-capacity').textContent = film.capacity;
  document.getElementById('film-tickets-sold').textContent = film.tickets_sold;
  document.getElementById('film-tickets-available').textContent = film.capacity - film.tickets_sold;

  
  const buyBtn = document.getElementById('buy-ticket-btn');
  buyBtn.disabled = film.tickets_sold >= film.capacity; 
  buyBtn.textContent = buyBtn.disabled ? 'Sold Out' : 'Buy Ticket';
  
  buyBtn.onclick = () => {
    if(film.tickets_sold < film.capacity) {
      film.tickets_sold++;
      document.getElementById('film-tickets-sold').textContent = film.tickets_sold;
      document.getElementById('film-tickets-available').textContent = film.capacity - film.tickets_sold;

      if(film.tickets_sold >= film.capacity) {
        buyBtn.disabled = true;
        buyBtn.textContent = 'Sold Out';
      }
    }
  };
}
