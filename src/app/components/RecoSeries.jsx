import Title from "@/app/components/Title";
import SerieCard from "./SerieCard";
import axios from "axios";
import { useEffect, useState } from "react";

const RecoSeries = ({ id }) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1&api_key=${API_KEY}`
      );
      setSeries(response.data.results);
    };

    fetch();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Title title="Recomended Series" />
      <SerieCard series={series} />
    </div>
  );
};

export default RecoSeries;
