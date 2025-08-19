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

const Page = () => {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("all");
  const [totalPages, setTotalPages] = useState(0);
  const { query } = useParams();

  const types = [{ name: "all" }, { name: "movies" }, { name: "series" }];

  useEffect(() => {
    if (!query) {
      setIsLoading(false);
      return;
    }

    const fetchMovies = async () => {
      setError(null);
      setIsLoading(true);
    
      let endpoint = "";
      if (type === "movies") {
        endpoint = "search/movie";
      } else if (type === "series") {
        endpoint = "search/tv";
      } else {
        endpoint = "search/multi";
      }

      const URL = `https://api.themoviedb.org/3/${endpoint}?query=${query}&api_key=${API_KEY}&include_adult=false&language=en-US&page=${page}`;

      try {
        const response = await axios.get(URL);
        const data = response.data;

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 0);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Could not fetch data. Please try again later.");
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query, page, type]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="sm:px-6 pb-6 p-2 flex flex-col items-center justify-center gap-6">
      <Title title={`Search Results for "${query}"`} />
      <div className="flex gap-4 w-full justify-center">
        {types.map((t) => (
          <div
            key={t.name}
            className={`p-2 border-2 cursor-pointer text-xs sm:text-base uppercase font-semibold bg-purple-900 rounded-md ${
              type === t.name
                ? "bg-purple-900/30 rounded-md text-cyan-300"
                : "bg-purple-900/50"
            }`}
            onClick={() => {
              setPage(1); 
              setType(t.name);
            }}
          >
            {t.name}
          </div>
        ))}
      </div>

      {totalPages > 1 && <Pagination totalPages={totalPages} page={page} setPage={setPage} />}
 
      {movies.length > 0 ? (
        <SearchCard series={movies} type={type} />
      ) : (
        <div className="text-white text-xl mt-8">No results found.</div>
      )}

      {totalPages > 1 && <Pagination totalPages={totalPages} page={page} setPage={setPage} />}
    </div>
  );
};

export default Page;
