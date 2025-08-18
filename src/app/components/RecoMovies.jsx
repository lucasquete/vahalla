import Title from "@/app/components/Title";
import MovieCard from "@/app/components/MovieCard";
import axios from "axios";
import { useEffect, useState } from "react";

const RecoMovies = ({id}) => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1&api_key=${API_KEY}`
      );
      setMovies(response.data.results);
    };

    fetch();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
        <Title title="Recomended Movies"/>
        <MovieCard movies={movies}/>
    </div>
  )
}

export default RecoMovies