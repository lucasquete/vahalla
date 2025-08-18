"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import axios from "axios";
import Title from "@/app/components/Title";
import Loading from "@/app/components/Loading";
import Error from "@/app/components/Error";
import Pagination from "@/app/components/Pagination";
import SearchCard from "@/app/components/SearchCard";

const page = () => {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("all");
  const [totalPages, setTotalPages] = useState(0);
  const params = useParams();
  const { query } = params;

  const types = [
    {
      name: "all",
    },
    {
      name: "movies",
    },
    {
      name: "series",
    },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (type === "all") {
          const response = await axios.get(
            // `https://api.themoviedb.org/3/search/keyword?query=${query}&page=1&api_key=${API_KEY}`
            `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${API_KEY}&include_adult=false&language=en-US&page=${page}`
          );
          const data = response.data;
          setMovies(data.results);
          setTotalPages(data.total_pages);
        } else if (type === "movies") {
          const response = await axios.get(
            // `https://api.themoviedb.org/3/search/keyword?query=${query}&page=1&api_key=${API_KEY}`
            `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false&language=en-US&page=${page}`
          );
          const data = response.data;
          setMovies(data.results);
          setTotalPages(data.total_pages);
        } else {
          const response = await axios.get(
            // `https://api.themoviedb.org/3/search/keyword?query=${query}&page=1&api_key=${API_KEY}`
            `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${API_KEY}&include_adult=false&language=en-US&page=${page}`
          );
          const data = response.data;
          setMovies(data.results);
          setTotalPages(data.total_pages);
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };
    fetchMovies();
  }, [query, page, type]);

  if (!movies) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="sm:px-6 pb-6 p-2 flex flex-col items-center justify-center gap-6">
      <Title title="Search Results" />
      <div className="flex gap-4 w-full">
        {types.map((t) => (
          <div
            key={t.name}
            className={`p-2 border-2 cursor-pointer text-xs sm:text-base uppercase font-semibold bg-purple-900 rounded-md ${
              type === t.name
                ? "bg-purple-900/30 rounded-md text-cyan-300"
                : "bg-purple-900/50"
            }`}
            onClick={() => setType(t.name)}
          >
            {t.name}
          </div>
        ))}
      </div>
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
      <SearchCard series={movies} type={type} />
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default page;
