const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWU0ZDEzNDUwNjBkMDZhODY2MzQyNDE2OTY0YTNkNCIsInN1YiI6IjY2NzQ2NTk4MmZiOGJiYTI5NjE2YzllMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EaxXxKQd3ewikFhT_LYAH5muaW3AWfVc5s7CvLQx-9o",
  },
};

fetch(
  "https://api.themoviedb.org/3/discover/movie?api_key=b9e4d1345060d06a866342416964a3d4",
  options
)
  .then((response) => response.json())
  .then((response) => {
    const list = response.results;
    console.log(list);
    /// You'll probably have to remove/modify the css you used for the classes
    // This is just to display 2 items
    list.slice(0, 2).map((item) => {
      const name = item.title;
      const poster = item.poster_path;
      const movieId = item.id;
      const imgLocation = `https://image.tmdb.org/t/p/w300/${poster}`;
      const viewPercent = "62%";
      const movie = `<li id=${movieId}><img src=${imgLocation}><p>${viewPercent}</p></li>`;

      document.querySelector(".currently-watching").innerHTML += movie;
      console.log(item);
    });

    const discoveredMovies = new Set(response.results.map((item) => item.id));
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    )
      .then((response) => response.json())

      .then((response) => {
        const suggestions = response.results;
        console.log(suggestions);

        const filteredSuggestions = suggestions.filter((suggestion) => {});

        console.log(filteredSuggestions);
        console.log("ade");
        const shuffle = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }

          return array;
        };

        const shuffledSuggestions = shuffle(suggestions);

        shuffledSuggestions.map((suggestion) => {
          const name = suggestion.title;
          const poster = suggestion.poster_path;
          const movieId = suggestion.id;
          const imgLocation = `https://image.tmdb.org/t/p/w300/${poster}`;
          const movie = `<li id=${movieId}><img src=${imgLocation}> </li>`;

          document.querySelector(".suggestions").innerHTML += movie;
        });
      })
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error(err));

// const shuffle = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

// const shuffledSuggestions = shuffle(myArray);

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    const viewPercent = "100%";
    const watched = response.results;
    console.log(watched);
    watched.map((item) => {
      const poster = item.poster_path;
      const movieId = item.id;
      const imgLocation = `https://image.tmdb.org/t/p/w300/${poster}`;
      const movie = `<li id=${movieId}><img src=${imgLocation}><p>${viewPercent}</p> </li>`;

      document.querySelector(".previously-watched").innerHTML += movie;
    });
  })
  .catch((err) => console.error(err));
