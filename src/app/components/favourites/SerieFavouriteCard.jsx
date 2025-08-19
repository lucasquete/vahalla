import Link from 'next/link'

const SerieFavouriteCard = ({series, openRemoveModal}) => {
    return (
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 sm:grid-cols-2 grid-cols-2">
            {series.map((serie) => (
                <div className='relative' key={serie.id}>
                    <span
                        className="absolute top-2 right-2 py-1 px-3 fonst-bold z-5 bg-black/50 rounded-full cursor-pointer hover:bg-black"
                        onClick={() => openRemoveModal(serie.id)}
                    >
                        X
                    </span>
                    <Link href={`/serie/${serie.id}`} className="block relative">
                        <div className="border rounded-lg xl:h-[500px] lg:h-[450px] border-purple-500/50 shadow-[0_0_10px_rgba(255,0,255,0.5)]">
                            <img
                                src={`${serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : "/noimage.png"}`}
                                className="w-full rounded-t-lg h-[93%] object-cover"
                            />
                            <p className="p-2 text-center truncate">{serie.name}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default SerieFavouriteCard