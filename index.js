

const searchInput = document.getElementById("search-movies")
const searchBtn = document.getElementById("search-btn")
const ClearSearchBtn = document.getElementById("clear-search")
const searchDisplay = document.getElementById("search-display")





// localStorage.clear()

const displayMovies = async ()=> {
    searchDisplay.innerHTML = ""
    console.log(searchInput.value)
    const response = await fetch(`http://www.omdbapi.com/?apikey=d7260d24&s=${searchInput.value}`)
    const data = await response.json().catch(err => {
        searchDisplay.innerHTML = `
        <div class="empty-page-placeholder"">
            <p>Unable to find what you’re looking for. Please try another search.</p>
        </div>
        `
    })
    console.log(data)

    const moviesArray = []
    for (let i = 0; i < data.Search.length; i++) {
        const res = await fetch(`http://www.omdbapi.com/?apikey=d7260d24&i=${data.Search[i].imdbID}`)
        const dat = await res.json()
        moviesArray.push(dat)

        searchDisplay.innerHTML += `
        <div class="real-display">
            <div>
                <img class="poster-img" src="${dat.Poster}">
            </div>
            <div>
                <div class="display-title">
                    <h1>${dat.Title}</h1>
                    <p>⭐</p>
                    <p>${dat.Ratings[0].Value}</p>
                </div>
                <div class="display-title">
                    <p>${dat.Runtime}</p>
                    <p>${dat.Genre}</p>
                    <span class="addToWatchlist"><i class="fa-solid fa-circle-plus"></i><button id="watchlist-btn">Watchlist</button></span>
                </div>
                <div class="display-title">
                    <p>${dat.Plot}</p>
                </div>
            </div>
        </div>
        <hr>
        `
        let addToWatchlist = document.getElementsByClassName("addToWatchlist")

        for (let i = 0; i < addToWatchlist.length; i++) {
            addToWatchlist[i].addEventListener("click", ()=> {
                console.log(moviesArray[i])
                const moviesFromLocalStorage = JSON.parse(localStorage.getItem("myMovies"))
                
                if (moviesFromLocalStorage === null) {
                    localStorage.setItem("myMovies", JSON.stringify([moviesArray[i]]))
                }else {
                    for (let a = 0; a < moviesFromLocalStorage.length; a++) {
                        if (moviesArray[i].imdbID === moviesFromLocalStorage[a].imdbID) {
                            break
                        }else {
                            localStorage.setItem("myMovies", JSON.stringify([...moviesFromLocalStorage, moviesArray[i]]))
                        }
                    }
                }
            })
        }
    }

    
            
}

searchBtn.addEventListener("click", displayMovies)


