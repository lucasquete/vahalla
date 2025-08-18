"use client";

import Details from "@/app/components/Details";
import RecoMovies from "@/app/components/RecoMovies";
import RecoSeries from "@/app/components/RecoSeries";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import Loading from "@/app/components/Loading";
import Error from "@/app/components/Error";

const page = () => {
  const params = useParams();
  const type = useSearchParams().get("type");
  const season = useSearchParams().get("season");
  const episode = useSearchParams().get("episode");
  const { id } = params;
  const [embedUrl, setEmbedUrl] = useState("");
  const [movie, setMovie] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [episodeSelected, setEpisodeSelected] = useState(1);
  let episodeArray = [];

  const router = useRouter();

  if (episode) {
    for (let index = 0; index < episode; index++) {
      episodeArray.push(index);
    }
  }

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        if (type === "movie") {
          const embedUrl = `https://vidsrc.to/embed/movie/${id}`;
          setEmbedUrl(embedUrl);
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
          );
          setMovie(response.data);
        } else {
          const embedUrl = `https://vidsrc.to/embed/tv/${id}/${season}/1`;
          setEmbedUrl(embedUrl);
          const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
          );
          setMovie(response.data);
          setSeasons(response.data.seasons);
          const res = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US&api_key=${API_KEY}`
          );
          setDetails(res.data);
        }
        
      } catch (error) {
        console.log(error)
        setError(error.message);
      }
    };

    fetchMovieDetails();
  }, [id, season]);

  // console.log(details)

  const handleEpisode = async (epi) => {
    const embedUrl = `https://vidsrc.to/embed/tv/${id}/${season}/${epi}`;
    setEmbedUrl(embedUrl);
    setEpisodeSelected(epi);
  };

  const handleSeason = (season_num, episode_count) => {
    if (season_num.toString() !== season) {
      router.push(
        `/watch/${id}?type-serie&season=${season_num}&episode=${episode_count}`
      );
      setIsOpen(false);
      setEpisodeSelected(1);
    }
  };

  if (!movie) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <section className="min-h-screen sm:px-6 pb-6 p-2 flex flex-col gap-10">
      <div className="flex flex-col items-center">
        <h1
          className="mb-8 font-display text-3xl text-center md:text-4xl font-black text-cyan-300 tracking-widest flicker-slow"
          style={{
            textShadow: "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #ff00ff",
          }}
        >
          {type === "movie" ? movie.title : movie.name}
        </h1>
        <div className="aspect-video w-full bg-black border-2 rounded-lg border-purple-500/50 shadow-[0_0_15px_rgba(255,0,255,0.5)]">
          <iframe
            src={embedUrl}
            className="w-full h-full border-none rounded-lg"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {season && (
        <div className="relative w-[200px] p-2 font-bold bg-purple-900/50 border-2 border-purple-500/80 flex justify-between rounded-md">
          <span>Season: {season}</span>
          {!isOpen ? (
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={24}
              color="currentColor"
              strokeWidth={2}
              className="cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            <HugeiconsIcon
              icon={ArrowUp01Icon}
              size={24}
              color="currentColor"
              strokeWidth={2}
              className="cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } flex-col border-2 border-purple-500/80 rounded-md top-12 left-0 absolute w-[200px] max-h-[200px] overflow-y-auto`}
          >
            {seasons.map((sea) => (
              <div
                key={sea.id}
                onClick={() =>
                  handleSeason(sea.season_number, sea.episode_count)
                }
                className={`flex justify-between p-2 border-b-2 border-purple-500 cursor-pointer ${
                  sea.season_number.toString() === season
                    ? "bg-purple-900 text-cyan-300"
                    : " text-white bg-purple-800 hover:bg-purple-900"
                }`}
              >
                <div
                  className={`${
                    sea.season_number.toString() === season
                      ? "text-cyan-300"
                      : "text-white"
                  }`}
                >
                  Season: {sea.season_number}
                </div>
                {sea.season_number.toString() === season && (
                  <HugeiconsIcon
                    icon={Tick01Icon}
                    size={24}
                    color="currentColor"
                    strokeWidth={2}
                    className="cursor-pointer"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {episode && (
        <div className="flex flex-wrap gap-4 justify-center text-xs md:text-base">
          {episodeArray.map((episode) => {
            return (
              <div
                onClick={() => handleEpisode(episode + 1)}
                className={`p-2 flex-1 min-w-[130px] max-w-[150px] text-center rounded-md border-2 cursor-pointer transition-all duration-300 ${
                  episodeSelected === episode + 1
                    ? "bg-purple-900/50 border-cyan-300 text-cyan-300"
                    : "bg-purple-500/50 hover:bg-purple-900/30 hover:border-purple-500 border-none  "
                }`}
                key={episode}
              >
                Episode {episode + 1}
              </div>
            );
          })}
        </div>
      )}
      <Details movie={movie} />
      {type === "movie" ? <RecoMovies id={id} /> : <RecoSeries id={id} />}
    </section>
  );
};

export default page;
