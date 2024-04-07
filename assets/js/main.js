const contenedor = document.getElementById('container');

document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los enlaces
    const enlaces = document.querySelectorAll('.link-content');

    // Iterar sobre cada enlace
    enlaces.forEach(function(enlace) {
        enlace.addEventListener('click', function() {
            enlaces.forEach(function(otroEnlace) {
                otroEnlace.classList.remove('activo');
            });
            enlace.classList.add('activo');
        });
    });

    //Mostrar la lista original de peliculas
    document.getElementById('nav-logo').addEventListener('click', showAllMovies);
});

let movies = [];
let movies1 = [];

//Conectar con el documento JSON
fetch('./movies.json')
    .then((data) => {
        return data.json();
    })
    .then((data) => {
        movies = data;
        movies1 = [...data];
        showProducts(movies1);
    });

//Mostrar por el DOM las cards de peliculas
const showProducts = (movies) => {
    contenedor.innerHTML = '';

    const moviesDiv = movies.map((movie, movieIndex) => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('card', 'mb-4');

        const movieFigure = document.createElement('figure');
        movieFigure.classList.add('movieCard');
        movieDiv.appendChild(movieFigure);

        const posterP = document.createElement('img');
        posterP.src = movie.Poster;
        posterP.classList.add('imgMovies');
        movieFigure.appendChild(posterP);

        const movieFigcaption = document.createElement('figcaption');
        movieFigcaption.classList.add('movieInfo');
        movieFigure.appendChild(movieFigcaption);

        const title = document.createElement('h4');
        title.textContent = movie.Title;
        title.classList.add('titleInfo');
        movieFigcaption.appendChild(title);

        const imdbRatingSpan = document.createElement('span');
        imdbRatingSpan.textContent = movie.imdbRating;
        imdbRatingSpan.classList.add('rating');
        title.appendChild(imdbRatingSpan);

        const yearP = document.createElement('p');
        yearP.innerHTML = `<strong> Año: </strong> ${movie.Year}`;
        movieFigcaption.appendChild(yearP);

        const releasedP = document.createElement('p');
        releasedP.innerHTML = `<strong> Fecha de lanzamiento: </strong> ${movie.Released}`;
        movieFigcaption.appendChild(releasedP);

        const genreP = document.createElement('p');
        genreP.innerHTML = `<strong> Género: </strong> ${movie.Genre}`;
        genreP.classList.add('overview');
        movieFigcaption.appendChild(genreP);

        const plotP = document.createElement('p');
        plotP.innerHTML = `<strong> Trama: </strong> ${movie.Plot}`;
        plotP.classList.add('overview');
        movieFigcaption.appendChild(plotP);

        return movieDiv;
    });

    moviesDiv.forEach((element) => {
        contenedor.appendChild(element);
    });
}

//Función para mostrar la lista original de películas
function showAllMovies() {
    showProducts(movies1);
}

//Función para mostrar el top 3 de películas con mejor rating
const orderTop3 = () => {
    contenedor.innerHTML = '';

    const arraySort = movies.sort((a, b) => {
        return b.imdbRating - a.imdbRating;
    });
    const result1 = arraySort.slice(0, 3);

    showProducts(result1);
}

//Función para ordenar las películas por Fecha de lanzamiento
const orderByDate = () => {
    contenedor.innerHTML = '';

    const arraySort = movies.sort((a, b) => {
        const fechaA = new Date(a.Released);
        const fechaB = new Date(b.Released);
        return fechaA - fechaB;
    });

    showProducts(arraySort);
}

//Función para ordenar las películas por Título (alfabético) 
const orderByTitle = () => {
    contenedor.innerHTML = '';

    const arraySort = movies.sort((a, b) => {
        const titleA = a.Title.toLowerCase();
        const titleB = b.Title.toLowerCase();

        if (titleA < titleB) {
            return -1;
        } else if (titleA > titleB) {
            return 1;
        } else {
            return 0;
        }
    });

    showProducts(arraySort);
}

//Función para buscar y filtrar las películas
function searchMovies() {
    contenedor.innerHTML = '';
    const searchTerm = searchInput.value.toLowerCase();
    const filteredMovies = movies.filter(movie => {
        // Buscar por año
        if (movie.Year.toString().includes(searchTerm)) {
        return true;
        }
        // Buscar por título
        else if (movie.Title.toLowerCase().includes(searchTerm)) {
        return true;
        }
        // Buscar por rating
        else if (movie.imdbRating.toString().includes(searchTerm)) {
        return true;
        }
        // Buscar por fecha de lanzamiento
        else if (movie.Released.toLowerCase().includes(searchTerm)) {
        return true;
        }
        return false;
    });

    showProducts(filteredMovies);
}

//Agregar las funciones a los elementos html 
const top3Button = document.getElementById('top3');
top3Button.addEventListener('click', orderTop3);

const orderByDateButton = document.getElementById('orderByDate');
orderByDateButton.addEventListener('click', orderByDate);

const orderByTitleButton = document.getElementById('orderByTitle');
orderByTitleButton.addEventListener('click', orderByTitle);

const searchInput = document.getElementById('search-text');
searchInput.addEventListener('input', searchMovies);
