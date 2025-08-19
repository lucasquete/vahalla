"use client";

import Details from "@/app/components/Details";
import Error from "@/app/components/Error";
import Loading from "@/app/components/Loading";
import RecoSeries from "@/app/components/RecoSeries";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const params = useParams();
  const { id } = params;

  const [movie, setMovie] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const res = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}popular?api_key=${API_KEY}`
        );

        setMovie(movieResponse.data);
        setSeasons(movieResponse.data.seasons);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };

    res();
  }, []);

  if (error) {
    return <Error error={error} />;
  }
  
  if (!movie) {
    return <Loading />;
  }


  return (
    <section className="flex flex-col items-center justify-center gap-8 sm:px-6 pb-6 p-2">
      <Details movie={movie} id={id} type="serie" />
      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 sm:grid-cols-2 grid-cols-2">
        {seasons.map((season) => (
          <Link
            key={season.id}
            href={`/watch/${id}?type=serie&season=${season.season_number}&episode=${season.episode_count}`}
            className="block"
          >
            <div className="rounded-lg border-2 xl:h-[500px] lg:h-[450px] border-purple-500/50 shadow-[0_0_10px_rgba(255,0,255,0.5)]">
              <img
                src={`${season.poster_path ? `https://image.tmdb.org/t/p/w500${season.poster_path}` :"/noimage.png" }`}
                className="w-full rounded-t-lg h-[93%] object-cover"
              />
              <p className="p-2 text-center truncate">{season.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <RecoSeries id={id} />
    </section>
  );
};

export default page;
