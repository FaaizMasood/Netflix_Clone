import React, { useState, useEffect } from "react";
import axios from "./axios";

function Row({ title, fetchUrl }) {
  // state is like short term memory , the way to wrote variables in react
  const [movies, setMovies] = useState([]); // we give initaial value to empty array
  // now we need to fill it with stuff
  //  we need a snippet of code which runs based on specific condition/ variable
  // we are trying to achiveve that when the row loads i want to make a request to tmdb to return the information
  useEffect(() => {
    // if we leave the bracket blank eg [] then we are saying run once when the row loads and dont run again
    // run an async function
    async function fetchData() {
      // "https//api.themoviedb.org/3", and the `/discover/tv?api_key=${API_KEY}&with_networks=213`,
      const request = await axios.get(fetchUrl);
      console.log(request);
      return request;
    }
    fetchData();
  }, []);
  return (
    <div>
      {/* Title */}
      <h2>{title}</h2>

      {/* Container - posters */}
    </div>
  );
}

export default Row;
