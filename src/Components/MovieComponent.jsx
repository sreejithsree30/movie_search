import React from "react";
import styled from "styled-components";

import "../Components/Movie.css";

const MovieComponent = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;

  return(
    <div className="MovieContainer" onClick={() => {
        props.onMovieSelect(imdbID);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}>
      <img src={Poster} alt={Title} className="CoverImage" />
      <span className="MovieName">{Title}</span>
      <div className="InfoColumn">
        <span className="MovieInfo">Year : {Year}</span>
        <span className="MovieInfo">Type : {Type}</span>
      </div>
    </div>
  )
};
export default MovieComponent;