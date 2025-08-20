"use client"
import axios from "axios";
import SerieCard from "../components/SerieCard";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Pagination from "../components/Pagination";

const page = () => {

  const [series, setSeries] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`
        );
        setSeries(response.data.results);
        setPage(response.data.page);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };

    fetchMovies();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [page]);

  if (!series) {
    return <Loading />
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="sm:px-6 pb-6 p-2 flex flex-col items-center justify-center gap-6">
      <Title title="Popular Series" />
      <Pagination totalPages={500} page={page} setPage={setPage} />
      <SerieCard series={series} />
      <Pagination totalPages={500} page={page} setPage={setPage} />
    </div>
  )
}

export default page