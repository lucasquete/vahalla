import Link from 'next/link'

const MovieFavouriteCard = ({movies, openRemoveModal}) => {
  return (
    <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 sm:grid-cols-2 grid-cols-2">
      {movies.map((movie) => (
        <div className='relative' key={movie.id}>
            <span 
                className="absolute top-2 right-2 py-1 px-3 fonst-bold z-5 bg-black/50 rounded-full cursor-pointer hover:bg-black"
                onClick={() => openRemoveModal(movie.id)}
            >
                    X
            </span>
            <Link href={`/movie/${movie.id}`} className="block relative">
            <div className="border rounded-lg xl:h-[500px] lg:h-[450px] border-white/50 shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                <img
                src={`${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` :"/noimage.png" }`}
                className="w-full rounded-t-lg h-[93%] object-cover"
                />
                <p className="p-2 text-center truncate">{movie.title}</p>
            </div>
            </Link>
        </div>
      ))}
    </div>
  )
}

export default MovieFavouriteCard