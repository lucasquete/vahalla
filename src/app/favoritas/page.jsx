"use client"

import { useEffect, useRef, useState } from "react";
import Title from "../components/Title";
import SerieCard from "../components/SerieCard";
import Pagination from "../components/Pagination";
import MovieFavouriteCard from "../components/favourites/MovieFavouriteCard";
import SerieFavouriteCard from "../components/favourites/SerieFavouriteCard";

const Page = () => {

    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [seriePage, setSeriePage] = useState(1);
    const [moviePage, setMoviePage] = useState(1);
    const [totalMoviesPage, setTotalMoviesPage] = useState(0);
    const [totalSeriesPage, setTotalSeriesPage] = useState(0);

    const [showRemoveMovieModal, setShowRemoveMovieModal] = useState(false);
    const [showRemoveSerieModal, setShowRemoveSerieModal] = useState(false);
    const [idToRemove, setIdToRemove] = useState(null);

    const [type, setType] = useState("movies");
    const ITEMS_PER_PAGE = 20;

    // NUEVO: Estado y referencia para la notificación
    const [notification, setNotification] = useState({ show: false, message: "" });
    const notificationTimer = useRef(null);

    // NUEVO: useEffect para limpiar el temporizador si el componente se desmonta
    useEffect(() => {
        return () => {
            if (notificationTimer.current) {
                clearTimeout(notificationTimer.current);
            }
        };
    }, []);

    // NUEVO: Función para mostrar una notificación por 3 segundos
    const showNotification = (message) => {
        // Si ya hay un temporizador activo, lo limpiamos para reiniciarlo
        if (notificationTimer.current) {
            clearTimeout(notificationTimer.current);
        }

        // Mostramos la notificación
        setNotification({ show: true, message });

        // Creamos un nuevo temporizador para ocultarla después de 3 segundos
        notificationTimer.current = setTimeout(() => {
            setNotification({ show: false, message: "" });
        }, 3000);
    };

    const updateMovies = (page) => {
        const favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies")) || [];
        const totalPages = Math.ceil(favouriteMovies.length / ITEMS_PER_PAGE) || 1;

        let currentPage = page;
        if (page > totalPages) {
            currentPage = totalPages;
            setMoviePage(totalPages);
        }

        const paginatedMovies = favouriteMovies.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

        setMovies(paginatedMovies);
        setTotalMoviesPage(totalPages);
    };

    const updateSeries = (page) => {
        const favouriteSeries = JSON.parse(localStorage.getItem("favouriteSeries")) || [];
        const totalPages = Math.ceil(favouriteSeries.length / ITEMS_PER_PAGE) || 1;

        let currentPage = page;
        if (page > totalPages) {
            currentPage = totalPages;
            setSeriePage(totalPages);
        }

        const paginatedSeries = favouriteSeries.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

        setSeries(paginatedSeries);
        setTotalSeriesPage(totalPages);
    };

    useEffect(() => {
        if (type === "movies") {
            updateMovies(moviePage);
        } else {
            updateSeries(seriePage);
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [moviePage, seriePage, type]);

    const handleRemoveMovie = () => {
        const favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies")) || [];
        const updatedMovies = favouriteMovies.filter((movie) => movie.id !== idToRemove);
        localStorage.setItem("favouriteMovies", JSON.stringify(updatedMovies));

        updateMovies(moviePage);
        setShowRemoveMovieModal(false);
        setIdToRemove(null);
        showNotification("Movie removed successfully!"); // NUEVO: Llama a la notificación
    };

    const handleRemoveSerie = () => {
        const favouriteSeries = JSON.parse(localStorage.getItem("favouriteSeries")) || [];
        const updatedSeries = favouriteSeries.filter((serie) => serie.id !== idToRemove);
        localStorage.setItem("favouriteSeries", JSON.stringify(updatedSeries));

        updateSeries(seriePage);
        setShowRemoveSerieModal(false);
        setIdToRemove(null);
        showNotification("Serie removed successfully!"); // NUEVO: Llama a la notificación
    };

    const openRemoveMovieModal = (id) => {
        setIdToRemove(id);
        setShowRemoveMovieModal(true);
    };

    const openRemoveSerieModal = (id) => {
        setIdToRemove(id);
        setShowRemoveSerieModal(true);
    };


    return (
        <div className="sm:px-6 pb-6 p-2 flex flex-col items-center justify-center gap-6 relative">
            {/* Modal para eliminar películas */}
            {showRemoveMovieModal && (
                <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-black/50 z-20">
                    <div className="w-fit h-fit p-4 bg-gray-900 flex items-center justify-center flex-col gap-4 rounded-md">
                        <p className="font-semibold">Do you want to remove this movie?</p>
                        <div className="flex gap-4 font-semibold">
                            <button onClick={handleRemoveMovie} className="py-2 px-3 bg-green-400 rounded-md cursor-pointer">Yes</button>
                            <button onClick={() => { setShowRemoveMovieModal(false); setIdToRemove(null); }} className="py-2 px-3 bg-red-400 rounded-md cursor-pointer">No</button>
                        </div>
                    </div>
                </div>
            )}
            {/* NUEVO: Modal para eliminar series */}
            {showRemoveSerieModal && (
                <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-black/50 z-20">
                    <div className="w-fit h-fit p-4 bg-gray-900 flex items-center justify-center flex-col gap-4 rounded-md">
                        <p className="font-semibold">Do you want to remove this serie?</p>
                        <div className="flex gap-4 font-semibold">
                            <button onClick={handleRemoveSerie} className="py-2 px-3 bg-green-400 rounded-md cursor-pointer">Yes</button>
                            <button onClick={() => { setShowRemoveSerieModal(false); setIdToRemove(null); }} className="py-2 px-3 bg-red-400 rounded-md cursor-pointer">No</button>
                        </div>
                    </div>
                </div>
            )}

            {notification.show && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-600 text-center text-white py-2 px-5 rounded-lg shadow-xl z-50 animate-fade-in-out">
                    {notification.message}
                </div>
            )}

            <Title title="Favourites" />
            <div className="flex gap-3">
                <button onClick={() => setType("movies")} className={`p-2 border-2 cursor-pointer text-xs sm:text-base uppercase font-semibold rounded-md ${type === "movies" ? "bg-purple-900 text-cyan-300" : "bg-purple-900/50"}`}>
                    Movies
                </button>
                <button onClick={() => setType("series")} className={`p-2 border-2 cursor-pointer text-xs sm:text-base uppercase font-semibold rounded-md ${type === "series" ? "bg-purple-900 text-cyan-300" : "bg-purple-900/50"}`}>
                    Series
                </button>
            </div>
            {type === "movies" ? (
                <div>
                    {movies.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {totalMoviesPage > 1 && <Pagination totalPages={totalMoviesPage} page={moviePage} setPage={setMoviePage} />}
                            <MovieFavouriteCard movies={movies} openRemoveModal={openRemoveMovieModal} />
                            {totalMoviesPage > 1 && <Pagination totalPages={totalMoviesPage} page={moviePage} setPage={setMoviePage} />}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center text-center text-2xl font-bold text-white h-[200px]">No movies yet.</div>
                    )}
                </div>
            ) : (
                <div>
                    {series.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {totalSeriesPage > 1 && <Pagination totalPages={totalSeriesPage} page={seriePage} setPage={setSeriePage} />}
                            {/* NUEVO: Pasamos la función openRemoveSerieModal al componente de series */}
                            <SerieFavouriteCard series={series} openRemoveModal={openRemoveSerieModal} />
                            {totalSeriesPage > 1 && <Pagination totalPages={totalSeriesPage} page={seriePage} setPage={setSeriePage} />}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center text-center text-2xl font-bold text-white h-[200px]">No series yet.</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Page;