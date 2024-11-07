import React, {useState } from "react";
import Axios from "axios";
import MovieComponent from "./Components/MovieComponent";
import MovieInfoComponent from "./Components/MovieInfoComponent";

import search from "/public/search.png";
import movie from "/public/movie.png";
import found from "/public/hero_banner.jpg";
// import Login from "./Components/Login/login.js"

import "./App.css"

export const API_KEY = "d730db62";

function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
 
  return(
    <div className="Container">
      <div className="Header">
        <div className="AppName">
          <img src={movie} alt="icon" className="MovieImage" />
          Movie Search Engine n
        </div>
        <div className="SearchBox">
          <img src={search} alt="icon" className="SearchIcon" />
          <input type="text" placeholder="Search Movie"
              value={searchQuery}
              onChange={onTextChange} className="SearchInput" />
        </div>
      </div>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <div className="MovieListContainer">
        {movieList?.length ? (
            movieList.map((movie, index) => (
              <MovieComponent
                key={index}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            ))
          ) : (
            <div className="not-found">
            <img src={found} className="Placeholder" />
            <p className="des">Please Search Your Movie Choicess....</p>
            </div>
          )}
      </div>
    </div>
  )


  
}


export default App