const watchlistMovies = document.getElementById("watchlist-movies")
const moviesFromLocalStorage = JSON.parse(localStorage.getItem("myMovies")) || []


console.log(moviesFromLocalStorage)

const renderWatchlistMovies = ()=> {

    if (moviesFromLocalStorage === null) {
        watchlistMovies.innerHTML = `
        <div class="watchlist-movies2">
            <h3>Your watchlist is looking a little empty...</h3>
            <h4><i class="fa-solid fa-circle-plus"> </i>Let's add some movies</h4>
        </div>
        `
    }else {
        watchlistMovies.innerHTML = ""
    
        for (let i = 0; i < moviesFromLocalStorage.length; i++) {
    
            watchlistMovies.innerHTML += `
            <div class="real-display">
                <div>
                    <img class="poster-img" src="${moviesFromLocalStorage[i].Poster}">
                </div>
                <div>
                    <div class="display-title">
                        <h1>${moviesFromLocalStorage[i].Title}</h1>
                        <p>⭐️</p>
                        <p>${moviesFromLocalStorage[i].Ratings[0].Value}</p>
                    </div>
                    <div class="display-title">
                        <p>${moviesFromLocalStorage[i].Runtime}</p>
                        <p>${moviesFromLocalStorage[i].Genre}</p>
                        <span class="removeFromWatchlist"><i class="fa-solid fa-circle-minus"></i><button id="watchlist-btn">Remove</button></span>
                    </div>
                    <div class="display-title">
                        <p>${moviesFromLocalStorage[i].Plot}</p>
                    </div>
                </div>
            </div>
            `
        } 

        
    }
    
}

renderWatchlistMovies()

const removeFromWatchlist = document.getElementsByClassName("removeFromWatchlist")

for (let i = 0; i < removeFromWatchlist.length; i++) {
    removeFromWatchlist[i].addEventListener("click", ()=> {
        let newWatchlistArray = moviesFromLocalStorage.splice(i,1)
        localStorage.setItem("myMovies", JSON.stringify(moviesFromLocalStorage))
        renderWatchlistMovies()
    })
}

