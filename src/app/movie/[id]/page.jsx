"use client";

import Details from "@/app/components/Details";
import Error from "@/app/components/Error";
import Loading from "@/app/components/Loading";
import RecoMovies from "@/app/components/RecoMovies";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const params = useParams();
  const { id } = params;

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const res = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}popular?api_key=${API_KEY}`
        );
        setMovie(movieResponse.data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };

    res();
  }, []);

  if (error) {
    return <Error />;
  }
  
  if (!movie) {
    return <Loading />;
  }


  return (
    <div className="flex flex-col items-center justify-center gap-8 sm:px-6 pb-6 p-2">
      <Details movie={movie} id={id} type="movie" />
      <RecoMovies id={id} />
    </div>
  );
};

export default page;
