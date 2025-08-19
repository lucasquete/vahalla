import Link from 'next/link';

const SearchMovieCard = ({movie}) => {
  if (!movie) {
    return null;
  }

  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <div className="rounded-lg border-2 h-full border-white/50 shadow-[0_0_10px_rgba(255,255,255,0.5)] flex flex-col">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/noimage.png"}
          alt={movie.title}
          className="w-full rounded-t-lg object-cover flex-grow"
        />
        <p className="p-2 text-center truncate">{movie.title}</p>
      </div>
    </Link>
  );
};

export default SearchMovieCard