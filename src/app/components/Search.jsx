"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import { Search01Icon } from "@hugeicons/core-free-icons";
import axios from "axios";

const Search = ({ menuOpen, setMenuOpen }) => {
  const [text, setText] = useState("");
  const [movie, setMovie] = useState(null);
  const router = useRouter();
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    if (!text) return;

    const res = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/search/multi?query=${text}&api_key=${API_KEY}&include_adult=false&language=en-US`
        );

        const data = movieResponse.data;
        setMovie(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    res();
  }, [text]);

  const handleClick = (e) => {
    e.preventDefault();
    if (text) {
      router.push(`/search/${text}`);
      setText("");
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex items-center py-4 px-5 bg-[#0d0a1a] justify-between fixed w-full z-10 t-0 l-0">
      <div className="outline-none flex items-center gap-2">
        <HugeiconsIcon
          icon={Menu01Icon}
          size={24}
          color="currentColor"
          strokeWidth={2}
          onClick={toggleMenu}
          className="cursor-pointer"
        />
        <Link href={"/"}>
          <h1 className="hidden sm:flex font-display text-1xl md:text-2xl font-black text-red-500">
            Vahalla
          </h1>
        </Link>
      </div>
      <div className="relative flex items-center w-[300px] gap-2">
        <input
          type="text"
          placeholder="Search"
          className="flex-grow bg-purple-900/50 border-2 pr-12 border-purple-500/80 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/50 rounded-md px-3 py-2 text-white placeholder-purple-300/70 transition duration-300"
          onChange={handleChange}
          value={text}
        />
        <button
          onClick={handleClick}
          className="absolute right-5 text-white cursor-pointer text-2xl"
        >
          <HugeiconsIcon
            icon={Search01Icon}
            size={24}
            color="currentColor"
            strokeWidth={2}
          />
        </button>
        {movie && text && (
          <div className="absolute top-12 rounded-md left-0 right-0 w-full h-full">
            <div className="flex flex-col rounded-md">
              {movie.slice(0, 5).map((mov, i) => (
                <div
                  key={mov.id}
                  onClick={() => {
                    setText("");
                    if (mov.media_type === "movie")
                      router.push(`/movie/${mov.id}`);
                    else router.push(`/serie/${mov.id}`);
                  }}
                  className={`p-2 ${i === 0 ? "rounded-t-md" : ""} ${
                    i !== 4 ? "border-b-2" : ""
                  } border-purple-500/80 bg-purple-950 cursor-pointer flex items-center gap-2 hover:bg-purple-800 hover:text-cyan-300`}
                >
                  <img
                    src={`${mov.poster_path ? `https://image.tmdb.org/t/p/w500${mov.poster_path}` :"/noimage.png" }`}
                    alt=""
                    className="w-[40px] h-[40px] object-cover rounded-md"
                  />
                  <div>
                    {mov.media_type === "tv" ? (
                      <span>{mov.name}</span>
                    ) : (
                      <span>{mov.title}</span>
                    )}
                  </div>
                </div>
              ))}
              {movie?.length > 5 && (
                <div
                  onClick={handleClick}
                  className="py-3 rounded-b-sm text-center font-semibold cursor-pointer bg-white text-black"
                >
                  View all results {">"}
                </div>
              )}
            </div>
          </div>
        )}
        {movie?.length === 0 && text && (
          <div className="absolute top-12 rounded-md left-0 right-0 w-full h-[100px] bg-purple-950 text-center flex justify-center items-center text-white font-semibold">
            no results found
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
