import SearchMovieCard from "./searchCards/SearchMovieCard";
import SearchSerieCard from "./searchCards/SearchSerieCard";

const SearchCard = ({ series, type }) => {
  if (!Array.isArray(series)) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 sm:grid-cols-2 grid-cols-2">
      {series.map((item) => {
       
        if (!item || !item.id) return null;

        if (type === "all") {
          if (item.media_type === "movie") {
            return <SearchMovieCard key={item.id} movie={item} />;
          }
          if (item.media_type === "tv") {
            return <SearchSerieCard key={item.id} serie={item} />;
          }
          return null;
        }

        if (type === "movies") {
          return <SearchMovieCard key={item.id} movie={item} />;
        }
        
        return <SearchSerieCard key={item.id} serie={item} />;
      })}
    </div>
  );
};

export default SearchCard;