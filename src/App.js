import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";

import MovieHeader from "./components/MovieHeader";

import FavoriteMovieList from "./components/FavoriteMovieList";

import axios from "axios";
import EditMovieForm from "./components/EditMovieForm";
import AddMovieForm from "./components/AddMovieForm";
import { GiNightSleep } from "react-icons/gi";
import { BsSun } from "react-icons/bs";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const history = useHistory();
  const [toggle, setToggle] = useState(true);

  const dataOku = () => {
    axios
      .get("http://localhost:9000/api/movies")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dataOku();
  }, []);

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:9000/api/movies/${id}`)
      .then((res) => {
        if (favoriteMovies.filter((item) => item.id === id).length === 1) {
          setFavoriteMovies(favoriteMovies.filter((item) => item.id !== id));
        }
        dataOku();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((item) => {
        history.push("/movies");
      });
  };

  const addToFavorites = (movie) => {
    !favoriteMovies.some((item) => item.id === movie.id) &&
      setFavoriteMovies([...favoriteMovies, movie]);
  };

  const toggleMode = () => {
    setToggle(!toggle);
  };

  return (
    <div className={toggle ? "bg-black" : "bg-white"}>
      <nav className="bg-zinc-800 px-6 py-3 flex justify-between">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
        <button onClick={toggleMode}>
          {toggle ? <BsSun /> : <GiNightSleep />}
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route exact path="/movies/add">
              <AddMovieForm
                setMovies={setMovies}
                dataOku={dataOku}
              ></AddMovieForm>
            </Route>

            <Route exact path="/movies/edit/:id">
              <EditMovieForm
                dataOku={dataOku}
                setMovies={setMovies}
              ></EditMovieForm>
            </Route>

            <Route exact path="/movies/:id">
              <Movie
                addToFavorites={addToFavorites}
                deleteMovie={deleteMovie}
              />
            </Route>

            <Route exact path="/movies">
              <MovieList movies={movies} favoriteMovies={favoriteMovies} />
            </Route>

            <Route exact path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
