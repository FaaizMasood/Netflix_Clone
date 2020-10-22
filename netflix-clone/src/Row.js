import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "http://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow }) {
  // state is like short term memory , the way to wrote variables in react
  const [movies, setMovies] = useState([]); // we give initaial value to empty array
  const [trailerUrl, setTrailerUrl] = useState("");
  // now we need to fill it with stuff
  //  we need a snippet of code which runs based on specific condition/ variable
  // we are trying to achiveve that when the row loads i want to make a request to tmdb to return the information
  useEffect(() => {
    // if we leave the bracket blank eg [] then we are saying run once when the row loads and dont run again
    // run an async function
    async function fetchData() {
      // "https//api.themoviedb.org/3", and the `/discover/tv?api_key=${API_KEY}&with_networks=213`,
      //console.log(axios.get(fetchUrl));
      const request = await axios.get(fetchUrl);
      console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  //console.table(movies);
  // from react-youtube
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  //gets only the specific video trailer to play when clicked on
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      //onsole.log(trailerUrl);
      movieTrailer(movie?.name || "")
        .then((url) => {
          //console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          //
        })
        .catch((error) => console.log(error));
    }
  };
  //
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          //
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
