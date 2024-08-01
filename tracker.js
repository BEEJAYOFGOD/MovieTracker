const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWU0ZDEzNDUwNjBkMDZhODY2MzQyNDE2OTY0YTNkNCIsInN1YiI6IjY2NzQ2NTk4MmZiOGJiYTI5NjE2YzllMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EaxXxKQd3ewikFhT_LYAH5muaW3AWfVc5s7CvLQx-9o",
  },
};
// document.querySelector(".hide").style.display = "block";

// Function to shuffle an array using the Fisher-Yates algorithm
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

// Function to create movie elements and append them to the specified container
async function createMovie(movieArray, className, viewPercent = 0) {
  movieArray.map(async (item) => {
    const poster_path = item.poster_path;
    const movieId = item.id;
    const imgLocation = `https://image.tmdb.org/t/p/w300/${poster_path}`;

    // Create the movie element based on whether viewPercent is provided
    let movie =
      viewPercent > 0
        ? `<li class="movies" id=${movieId}><a href="movie-info.html?id=${movieId}"><img src=${imgLocation}><p>${viewPercent}%</p></a></li>`
        : `<li class="movies" id=${movieId}><a href="movie-info.html?id=${movieId}"><img src="${imgLocation}"></a></li>`;

    // Append the movie element to the container
    document.querySelector(className).innerHTML += movie;
  });
}

// Function to fetch and process suggested movies
async function getSuggestions() {
  try {
    // Fetch trending movies
    const trendingResponse = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    );
    const trendingData = await trendingResponse.json();
    const suggestions = trendingData.results;

    // Filter out movies already in the current list
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        !listCurrent.some((current) => current.id === suggestion.id)
    );

    // Shuffle the filtered suggestions
    const shuffledSuggestions = shuffle(filteredSuggestions);

    // Create movie elements for suggestions
    createMovie(shuffledSuggestions, ".suggestions");
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
}

// Function to fetch and process previously watched movies
async function getPrevious() {
  try {
    // Fetch top-rated movies
    const resp = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );
    const previousMovies = await resp.json();

    // Treat top-rated movies as previously watched
    const viewPercent = 100;
    const watched = previousMovies.results;
    const prev = ".previously-watched";

    // Create movie elements for previously watched movies
    createMovie(watched, prev, viewPercent);
  } catch (error) {
    console.error("Error fetching previous movies:", error);
  }
}

// Function to fetch and process currently watching movies
async function getCurrent() {
  try {
    // Fetch discover movies
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=b9e4d1345060d06a866342416964a3d4",
      options
    );
    const data = await response.json();
    listCurrent = data.results.splice(0, 2);
    const className = ".currently-watching";
    const viewPercent = 62;

    // Create movie elements for currently watching movies
    createMovie(listCurrent, className, viewPercent);

    // Fetch suggestions and previous movies
    getSuggestions();
    getPrevious();
  } catch (error) {
    console.error("Error fetching current movies:", error);
  }
}

// Call the function to start the process
getCurrent();

let searchMovieTemplate = document.querySelector("[data-search-movie]");
let searchedMoviesContainer = document.querySelector("[data-searched-movies]");

let search = document.querySelector("[data-search]");
// search.defaultValue = "";
let searchQuery;

search.addEventListener("input", async (e) => {
  search.defaultValue = "";
  searchQuery = e.target.value;

  try {
    let searchResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
      options
    );

    const searchJson = await searchResponse.json();

    let searchResults = searchJson.results;
    searchedMoviesContainer.textContent = "";

    //*** This is the beginning of the search  that hides every other component on the page when one search for a mv*/
    document
      .querySelector(".hide")
      .classList.toggle("clear", searchResults.length > 0);
    document
      .querySelector("#stubborn")
      .classList.toggle("clear", searchResults.length > 0);
    //** End of code

    let errorText = document.createElement("div");

    if (searchResults.length == 0 && searchQuery.length > 0) {
      // if search results is empty and there's a query (whether empty or not)
      document.querySelector(".hide").classList.toggle("clear");
      document.querySelector("#stubborn").classList.toggle("clear");
      // the toggle clears the page to show the error text
      errorText.innerHTML =
        "<p>Oops!!</p>" +
        `<img src ="images/look.gif"/>` +
        "<p>Wetin you dey find, Ejeh?</p>";
      searchedMoviesContainer.style.display = "flex";
      searchedMoviesContainer.style.justifyContent = "center";
      errorText.setAttribute("id", "error-text");

      searchedMoviesContainer.append(errorText);
    } else if (searchQuery.length == 0) {
      // when the user doesn't input anything on the searchbar
      // don't disply error text
      errorText.textContent = "";
    }

    searchResults.forEach((movie) => {
      searchedMoviesContainer.style.display = "grid";

      let poster_path = movie.poster_path;
      let imageUrl = `https://image.tmdb.org/t/p/w300/${poster_path}`;
      let movieId = movie.id;
      let movieDiv = document.createElement("div");
      let movieLink = document.createElement("a");
      // if (movieId === 1293690)

      movieLink.setAttribute("href", `movie-info.html?id=${movieId}`);
      movieLink.append(movieDiv);

      movieDiv.style.backgroundImage = `url(${imageUrl})`;

      searchedMoviesContainer.append(movieLink);
    });

    // console.log(searchedMoviesContainer.innerHTML);
  } catch (error) {}
});
