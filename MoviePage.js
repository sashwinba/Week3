import {apiURL} from './constants.js';
import {displayError, toggleDisplay, hideLoadingContainer} from './utils.js';
const MoviePage = (imdbID, trailer) =>{
    toggleDisplay('article');
    const article = document.querySelector('article');

    let movieURl = apiURL + imdbID;    
    fetch(movieURl)
    .then(response => {
        if(response.ok){
            return response.json()
        }
        else{
            throw Error(response.statusText);
        }
    })
    .then(res => {
        res.trailer = trailer;
        initializeMoviePage(res);
    })
    .catch(err => displayError(article,err));

    const initializeMoviePage = (movieData)=>{
        let htmlText = `
            <img src="${movieData.Poster}" class="moviePoster" alt="${movieData.Title}">
            <div class="movieInfo">
                <h1 class="h1large">${movieData.Title}  (${movieData.Year})</h1>
                <div class="container">
                    <h2>${movieData.imdbRating} / 10 (${movieData.imdbVotes} votes)</h2>
                    <a href="https://www.imdb.com/title/${movieData.imdbID}" target="_blank">
                        <img src="img/imdb.png" class="imdbLarge" alt="imdb">
                    </a>
                </div>
                <p class="description">${movieData.Plot}</p>
                <iframe class="youtube" src="https://www.youtube.com/embed/${movieData.trailer}"></iframe>
            </div>`;

        hideLoadingContainer();
        article.innerHTML = htmlText;        
    };
};
export default MoviePage;