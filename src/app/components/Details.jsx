import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Details = ({ movie, id, type }) => {
  const path = usePathname();
  const separetePath = path.split("/")[1];

  const addFavourite = () => {
    if (type === "movie") {
      const favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies")) || [];
      if (favouriteMovies.some((m) => m.id === movie.id)) {
        return;
      }
      const newFavouriteMovies = [...favouriteMovies, movie];
      localStorage.setItem("favouriteMovies", JSON.stringify(newFavouriteMovies));
    } else {
      const favouriteMovies = JSON.parse(localStorage.getItem("favouriteSeries")) || [];
      if (favouriteMovies.some((m) => m.id === movie.id)) {
        return;
      }
      const newFavouriteMovies = [...favouriteMovies, movie];
      localStorage.setItem("favouriteSeries", JSON.stringify(newFavouriteMovies));
    }
  }

  return (
    <div className="md:flex-row flex-col flex gap-6 text-sm md:text-base">
      <div className="flex-1 w-full h-full">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-2 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-cyan-300">
          {movie.title === undefined ? movie.name : movie.title}
        </h2>
        <p className="text-gray-300 w-[80%]">{movie.overview}</p>
        <div className="flex gap-2">
          <span className="font-semibold rounded-md p-1 bg-amber-300 text-black w-fit">
            TMDB: {movie.vote_average.toFixed(1)}
          </span>
          <span className="font-semibold rounded-md py-1 px-2 bg-white text-black w-fit uppercase">
            {movie.original_language}
          </span>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 flex flex-col gap-1">
            <span className="font-semibold">
              Release Date:{" "}
              <span className="font-normal text-white/40">
                {movie.release_date}
              </span>
            </span>
            <span className="font-semibold">
              Runtime:{" "}
              <span className="font-normal text-white/40">
                {movie.runtime} min
              </span>
            </span>
            <span className="font-semibold">
              Production Companies:{" "}
              <span className="font-normal text-white/40 cursor-pointer">
                {movie.production_companies
                  .map((company) => company.name)
                  .join(", ")}
              </span>
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <span className="font-semibold">
              Genres:{" "}
              <span className="font-normal text-white/40 cursor-pointer">
                {movie.genres.map((genre) => genre.name).join(", ")}
              </span>
            </span>
            <span className="font-semibold">
              Origin country:{" "}
              <span className="font-normal text-white/40">
                {movie.origin_country}
              </span>
            </span>
            <span className="font-semibold">
              Status:{" "}
              <span className="font-normal text-white/40">{movie.status}</span>
            </span>
          </div>
        </div>
        <div className="flex gap-4">
            {separetePath === "movie" && (

            <Link href={`/watch/${id}?type=movie`}>
                <button className="bg-red-600 hover:bg-red-700 text-2xl text-white font-bold p-3 rounded-md outline-none cursor-pointer">
                Watch Now
                </button>
            </Link>
            )}
          <button onClick={addFavourite} className="p-3 border-none bg-white text-black flex items-center justify-center gap-2 cursor-pointer rounded-md outline-none">
            <span className="text-2xl font-bold">+ </span>Add Favourite
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
