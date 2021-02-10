import MainPage from './home.js';
import MoviePage from './MoviePage.js';

window.addEventListener('load', () => {
    const loadingContainer = document.querySelector(".loadingContainer");
    loadingContainer.style.display = "flex";

    let url = new URL(location.href);
    let imdbID = url.searchParams.get("id");
    let trailer = url.searchParams.get("trailer");   
    
    if(imdbID!==null){
        MoviePage(imdbID,trailer);
    }
    else{
        MainPage();
    }
});

document.querySelector('#logo').addEventListener('click' , () => {
    location.href = 'index.html';
});
