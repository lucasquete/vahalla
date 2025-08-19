import Link from 'next/link';

const SearchSerieCard = ({serie}) => {
  if (!serie) {
    return null;
  }

  return (
    <Link href={`/serie/${serie.id}`} className="block">
      <div className="rounded-lg border-2 h-full border-purple-500/50 shadow-[0_0_10px_rgba(255,0,255,0.5)] flex flex-col">
        <img
          src={serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : "/noimage.png"}
          alt={serie.name}
          className="w-full rounded-t-lg object-cover flex-grow"
        />
        <p className="p-2 text-center truncate">{serie.name}</p>
      </div>
    </Link>
  );
};

export default SearchSerieCard