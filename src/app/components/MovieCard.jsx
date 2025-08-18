import Link from "next/link";


const MovieCard = ({movies}) => {
  return (
    <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 sm:grid-cols-2 grid-cols-2">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`} className="block">
          <div className="border rounded-lg xl:h-[500px] lg:h-[450px] border-white/50 shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            <img
              src={`${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` :"/noimage.png" }`}
              className="w-full rounded-t-lg h-[93%] object-cover"
            />
            <p className="p-2 text-center truncate">{movie.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieCard;
