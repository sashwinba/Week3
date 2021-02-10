const debounce = (delay) =>{
    let timer;
    return () => {
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(search,delay);
    }
};

const search = () => {
    const input = document.querySelector('input');
    let inputTitle = input.value.toUpperCase(); 
    document.querySelectorAll(".movie").forEach(movie => {
        let title = movie.getAttribute("title");
        movie.style.display = ( title.indexOf(inputTitle) == -1 ? "none" : "flex");
    })
};

export default debounce; 