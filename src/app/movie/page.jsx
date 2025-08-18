"use client";

import { useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Title from "../components/Title";
import { useEffect } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Pagination from "../components/Pagination";

// const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
// const response = await axios.get(
//   `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
// );
// const movies = response.data.results;

const page = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
        );
        const movies = response.data.results;
        setMovies(movies);
        setPage(response.data.page);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };

    fetchMovies();
  }, [page]);

  if (!movies) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="sm:px-6 pb-6 p-2 flex flex-col items-center justify-center gap-6">
      <Title title="Popular Movies" />
      <Pagination totalPages={500} page={page} setPage={setPage} />
      <MovieCard movies={movies} />
      <Pagination totalPages={500} page={page} setPage={setPage} />
    </div>
  );
};

export default page;
