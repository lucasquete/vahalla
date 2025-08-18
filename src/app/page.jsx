import axios from "axios";
import Hero from "./components/hero/Hero";
import MovieCard from "./components/MovieCard";
import SerieCard from "./components/SerieCard";
import Trending from "./components/trending/Trending";
import Title from "./components/Title";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const response = await axios.get(
  `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
);
const movies = response.data.results;

const res = await axios.get(
  `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
);
const series = res.data.results;

export default function Home() {
  const isLoading = true
  return (
    <section className="sm:px-6 pb-6 p-2">
      <Hero />
      <div className="pb-6 pt-6 flex flex-col items-center justify-center gap-4">
        <Title title="Popular Movies" />
        <MovieCard movies={movies} />
      </div>
      <div className="pb-6 pt-6 flex flex-col items-center justify-center gap-4">
        <Title title="Popular Series" />
        <SerieCard series={series} />
      </div>
      <div className="pb-6 pt-6 flex flex-col items-center justify-center gap-4 ">
        <Title title="Trending" />
        <Trending movies={movies} />
      </div>
    </section>
  );
}
