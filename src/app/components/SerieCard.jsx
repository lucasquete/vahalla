import Link from "next/link";

const SerieCard = ({series}) => {
  return (
    <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 sm:grid-cols-2 grid-cols-2">
      {series.map((serie) => (
        <Link key={serie.id} href={`/serie/${serie.id}`} className="block">
          <div className="rounded-lg border-2 xl:h-[500px] lg:h-[450px] border-purple-500/50 shadow-[0_0_10px_rgba(255,0,255,0.5)]">
            <img
              src={`${serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` :"/noimage.png" }`}
              className="w-full rounded-t-lg h-[93%] object-cover"
            />
            <p className="p-2 text-center truncate">{serie.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SerieCard;
