fetch("https://imdb8.p.rapidapi.com/auto-complete?game", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "imdb8.p.rapidapi.com",
    "x-rapidapi-key": "44c764c389msh0e9b557039b9289p1abaa9jsn23edf8a8cdcf",
  },
})
  .then((response) => console.log(response))

  .catch((err) => {
    console.error(err);
  });
