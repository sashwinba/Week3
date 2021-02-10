import {truncateContent,addListener,truncateTitle, displayError, toggleDisplay,hideLoadingContainer} from './utils.js';
import debounce from './debounceSearch.js';
import {fetchURL,ariaHidden, listenerClasses} from './constants.js';

const MainPage = () => {
    toggleDisplay('section');
    const titleToData = {};
    const input = document.querySelector('input');
    const section = document.querySelector('section');

    fetch(fetchURL)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            throw Error(response.statusText);
        }
    })
    .then(result => {
        initialize(result.shows);
    })
    .catch(err => displayError(section,err));


    const generatePage = (title)=>{
        window.open(`index.html?id=${titleToData[title].imdbID}&trailer=${titleToData[title].trailer}`);
    };

    const initialize = (data)=>{ 
        input.addEventListener('input', debounce(500) );
        data.forEach(movie => {
            movie.title = movie.title.toUpperCase();
            titleToData[movie.title] = movie;
        });

        let htmlText = data.map(movie => {
            return `
                <div class="movie" title="${movie.title}">
                    <img src="img/posters/${movie.poster}" class="poster" title="${movie.title}">
                    <div class="content">
                        <a class="titlewrapper">
                            <h1 class="compressedTitle">${truncateTitle(movie.title)}</h1>
                            <h1 class="expandedTitle" title="${movie.title}">${movie.title}</h1>
                        </a>
                        <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank"> 
                                <img src="img/imdb.png" class="imdb" , alt="imdb">   
                        </a>
                        <h2>(${movie.year})</h2>
                        <p title="${movie.title}">${truncateContent(movie.description,movie.title)}</p>
                    </div>
                </div>`;
        }).join('');

        htmlText = htmlText + ariaHidden;

        hideLoadingContainer();
        section.innerHTML = htmlText;

        listenerClasses.forEach( classsName => {
            document.querySelectorAll(classsName).forEach(ele => addListener(generatePage,ele));
        });
    };
};

export default MainPage;

