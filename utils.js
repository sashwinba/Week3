import {contentSiz,titleSiz} from './constants.js';

const truncateContent = (description,title)=>{
    return description.length <= contentSiz? description :
                description.substr(0,contentSiz-3) + `<a class='truncateContent' title="${title}">...</a>` ;
};

const truncateTitle = (title)=>{
    return title.length <= titleSiz? title : title.substr(0,titleSiz-2) + ".." ;
};

const addListener = (func,ele) => {
    ele.addEventListener('click', evt => func(evt.target.getAttribute("title")));
};

const hideLoadingContainer = () =>{
    const loadingContainer = document.querySelector(".loadingContainer");
    loadingContainer.style.display = "none";
};

const displayError = (element,err) => {
    hideLoadingContainer();
    element.innerHTML = `
        <div class="snackbox">
            <h1>${err}</h1>
        </div>`;
    setTimeout(()=>{
        document.querySelector(".snackbox").style.display = "none";
    },2000);
};

const toggleDisplay = (show) =>{
    let hide = (show==='section'?'article':'section');

    const hideElement = document.querySelector(hide);
    hideElement.style.display = "none";

    const showElement = document.querySelector(show);
    showElement.style.display = "flex";

    const inputField = document.querySelector('#searchBar');
    inputField.style.display = (show==='section'?'block':'none');
};

export {truncateContent,truncateTitle,addListener,displayError,toggleDisplay,hideLoadingContainer};