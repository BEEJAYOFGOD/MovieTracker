const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWU0ZDEzNDUwNjBkMDZhODY2MzQyNDE2OTY0YTNkNCIsInN1YiI6IjY2NzQ2NTk4MmZiOGJiYTI5NjE2YzllMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EaxXxKQd3ewikFhT_LYAH5muaW3AWfVc5s7CvLQx-9o",
  },
};

let movie_title = document.querySelector(".movie-title");
let poster_container = document.querySelector(".poster-container");

const urlParams = new URLSearchParams(window.location.search); // parses the query string from the current URL and stores it as a URLSearchParams object in the variable urlParams
const movieId = urlParams.get("id");

async function getMovie() {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );

  const movieData = await resp.json();
  movie_title.innerHTML += movieData.title;
  const genres = movieData.genres;

  let poster = document.createElement("img");
  const overview = document.querySelector(".overview");
  let poster_path = `https://image.tmdb.org/t/p/w300/${movieData.poster_path}`;
  // poster_path requires adding the json to a definte address

  overview.innerHTML += movieData.overview;

  poster.setAttribute("src", poster_path);

  document.querySelector(".poster-container").appendChild(poster);

  genres.map((genre) => {
    let btn = `<button>${genre.name}</button>`;
    document.querySelector(".genres").innerHTML += btn;
  });

  //   console.log(movieData);
}

getMovie();

async function getTrailer() {
  try {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      options
    );

    let trailerData = await resp.json();
    const iframe = document.querySelector("#frame");
    let trailerData_info = trailerData.results;
    let ytPath;

    trailerData_info.forEach((trailer) => {
      if (trailer.type === "Trailer") {
        ytPath = trailer.key;
      }
    });

    // const trailerUrl = `http://www.youtube.com/embed/${ytPath}`; // YouTube embed URL

    iframe.src += ytPath;
    iframe.setAttribute("allow", "autoplay"); // Allow autoplay (optional)

    console.log(trailerData_info);
  } catch (error) {
    console.error(error);
  }
}

getTrailer();

let iframe = document.querySelector("#frame");
// const iframeDocument = iframe.contentDocument;

// Wait for the iframe content to load
// JavaScript

// iframe.addEventListener("click", function () {
//   // Check if the iframe is already playing
//   if (!iframe.contentWindow.paused) {
//     console.log("Video is already playing");
//     return;
//   }

//   // Get the iframe's contentWindow object
//   const iframeWindow = iframe.contentWindow;

//   // Get the video element inside the iframe
//   const iframeDoc = iframeWindow.document;
//   const videoElement = iframeDoc.querySelector("video");

//   // Play the video
//   videoElement.play();

//   console.log("Video started playing");
// });

let trailer_container = document.querySelector(".trailer-container");

trailer_container.addEventListener("mouseover", () => {
  if (window.innerWidth <= 768) {
    document.querySelector(".poster-container").style.height = 0;
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    poster_container.style.display = "flex";
  }
});

poster_container.style.display = "flex";
