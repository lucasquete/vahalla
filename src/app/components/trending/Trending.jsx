"use client";
import { useEffect, useState } from "react";
import "./trending.css";
import Link from "next/link";
import axios from "axios";

const Trending = ({ movies }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?&api_key=${API_KEY}&language=en-US`
      );
      setTrending(response.data.results);
    };

    fetch();
  }, []);

  const clickNext = () => {
    activeImage === movies.length - 1
      ? setActiveImage(0)
      : setActiveImage(activeImage + 1);
  };
  const clickPrev = () => {
    activeImage === 0
      ? setActiveImage(movies.length - 1)
      : setActiveImage(activeImage - 1);
  };

  //    useEffect(() => {
  //     const timer = setTimeout(() => {
  //       clickNext();
  //     }, 5000);
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }, [activeImage]);

  return (
    <div className="lg:w-full flex flex-col items-center">
      <div className="lg:w-[70vw] lg:h-[70vh] flex transition-all duration-500 ease-in-out overflow-hidden p-1.5 lg:rounded-3xl rounded-md bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 hover:bg-gradient-to-l hover:shadow-2xl hover:shadow-purple-600/30">
        {trending.map((movie, i) => (
          <div
            className={`${
              i === activeImage
                ? "w-full h-full flex transition-all duration-500 ease-in-out"
                : "hidden"
            }`}
            key={i}
          >
            <Link href={movie.media_type === "movie" ? `/movie/${movie.id}` : `/serie/${movie.id}`}>
              <img
                className="w-full h-full object-cover lg:rounded-tl-3xl lg:rounded-bl-3xl"
                src={`${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` :"/noimage.png" }`}
                alt={movies.title}
              />
            </Link>
            <div className="bg-white text-black lg:flex hidden flex-col justify-center items-center w-full h-full md:rounded-tr-3xl md:rounded-br-3xl">
              <div className="p-8 flex flex-col justify-center gap-6">
                <span className="p-2 rounded-md font-semibold text-xl bg-amber-300 w-fit">
                  TRENDING #{i + 1}
                </span>
                <h1 className="font-bold text-2xl text-[#0d0a1a]">
                  {movie.title}
                </h1>
                <span>{movie.overview}</span>
                <Link href={movie.media_type === "movie" ? `/movie/${movie.id}` : `/serie/${movie.id}`}>
                  <button className="bg-red-600 w-fit hover:bg-red-700 text-xl text-white font-bold p-3 rounded-md outline-none cursor-pointer">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 py-4">
        <div
          onClick={clickPrev}
          className="rounded-full font-bold text-2xl px-4 py-2 text-center bg-purple-900/50 hover:bg-purple-900/30 hover:text-cyan-300 cursor-pointer"
        >
          {"<"}
        </div>
        <div
          onClick={clickNext}
          className="rounded-full font-bold text-2xl px-4 py-2 text-center bg-purple-900/50 hover:bg-purple-900/30 hover:text-cyan-300 cursor-pointer"
        >
          {">"}
        </div>
      </div>
    </div>
  );
};

export default Trending;
