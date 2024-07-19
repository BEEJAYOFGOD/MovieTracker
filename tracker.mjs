const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWU0ZDEzNDUwNjBkMDZhODY2MzQyNDE2OTY0YTNkNCIsInN1YiI6IjY2NzQ2NTk4MmZiOGJiYTI5NjE2YzllMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EaxXxKQd3ewikFhT_LYAH5muaW3AWfVc5s7CvLQx-9o",
  },
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export function createmovie(movieArray, className, viewPercent = 0) {
  movieArray.map((item) => {
    const poster = item.poster_path;
    const movieId = item.id;
    const imgLocation = `https://image.tmdb.org/t/p/w300/${poster}`;
    let movie;

    movie =
      viewPercent > 0
        ? `<li class="movies" id=${movieId}><a href="movie-info.html?id=${movieId}"><img src=${imgLocation}><p>${viewPercent}%</p></a></li>`
        : `<li class="movies" id=${movieId}><a href="movie-info.html?id=${movieId}"><img src="${imgLocation}"></a></li>`;

    document.querySelector(className).innerHTML += movie;
  });
}

async function getSuggestions() {
  const trendingResponse = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  );
  const trendingData = await trendingResponse.json();
  const suggestions = trendingData.results;
  const className = ".suggestions";

  const filteredSuggestions = suggestions.filter(
    (suggestion) => !listCurrent.some((current) => current.id === suggestion.id)
  );

  const shuffledSuggestions = shuffle(filteredSuggestions);
  createmovie(shuffledSuggestions, className);
}

async function getPrevious() {
  try {
    const resp = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );

    console.log("ABCDE");

    const previousMovies = await resp.json();
    console.log(previousMovies);

    const viewPercent = 100;
    const watched = previousMovies.results;
    const className = ".previously-watched";

    createmovie(watched, className, viewPercent);
  } catch (err) {
    console.error(err);
  }
}

let listCurrent; // This is currently watching movies
async function getCurrent() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=b9e4d1345060d06a866342416964a3d4",
      options
    );
    const data = await response.json();
    listCurrent = data.results.splice(0, 2);
    const className = ".currently-watching";
    const viewPercent = 62;

    // Rest of your code using listCurrent data....
    createmovie(listCurrent, className, viewPercent);
    getSuggestions();
    // Second fetch with filtering logic
  } catch (err) {
    console.error(err);
  }
}

getCurrent();
getPrevious();
