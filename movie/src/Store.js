import React from "react";
import "./Store.css";

class Store extends React.Component {
  state = {
    data: null,
  };
  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=32995b62260b7c64f6b6f2af3cbbb2f4&query=a"
    )
      .then((response) => response.json())
      .then((movielists) => {
        this.setState({
          data: movielists,
        });
      });
  }

  render() {
    if (!this.state.data) {
      return (
        <div className="container">
          <p>No Data</p>
        </div>
      );
    }
    const movieLists = this.state.data.results;
    return (
      <div className="container">
        <h1>Movie</h1>
        {movieLists.map((movie) => {
          return (
            <div className="image-card">
              <img
                src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                alt={movie.title}
              />
              <p className="title">{movie.title}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Store;
