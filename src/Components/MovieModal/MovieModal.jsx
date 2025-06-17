// import React from "react";
import "./MovieModal.css";
import axios from "axios";
import {useState, useEffect} from "react"; // use state is to store values, use effect is to runs effects like fetching data from an API


const MovieModal = ({show, movie, handleClose}) => {
    // console.log('MODAL',movie)
    if (!show) return null;

    const API_KEY = import.meta.env.VITE_API_KEY;
    const GENRE_API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
    const { title, poster_path, release_date, overview, genre_ids, backdrop_path } = movie;
    const [genreDict, setGenreDict] = useState({});

    console.log('MOVIE GENRES ID', genre_ids);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const { data } = await axios.get(GENRE_API_URL);
                const dict = {};
                data.genres.forEach((genre) => {
                    dict[genre.id] = genre.name;
                });
                setGenreDict(dict);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        fetchGenres();
    }, [GENRE_API_URL]);
    // console.log('MOVIE GENRES', movieGenres);

    function getGenres() {
        // return movieCard.genres_id.map((genre) => genre.name).join(", ");
        if (!Array.isArray(genre_ids)) return "";

        const genreNames = [];
        for (let i = 0; i < genre_ids.length; i++) {
            if (genreDict[genre_ids[i]]) {
                genreNames.push(genreDict[genre_ids[i]]);
            }
        }
        return genreNames.join(", ");
    }

    function getTrailer(){
        return;
    }

    
    return (
        <div className="modal-container">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button className="close-button" onClick={handleClose}>X</button>
                </div>
                <div className="modal-title">
                    <h2>{title}</h2>
                </div>
                <div className="modal-body">
                    <div className="details">
                        <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt={title} />
                        <h3>Release Date: {release_date}</h3>
                        <h3>Overview: {overview}</h3>
                        <h3>Genre: {getGenres()}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
