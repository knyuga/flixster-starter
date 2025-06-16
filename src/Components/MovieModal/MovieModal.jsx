// import React from "react";
import "./MovieModal.css";

const MovieModal = ({show, movie}) => {
    console.log('MODAL',movie)
    if (!show) return null;


    const { title, poster_path, release_date, overview, genres_id } = movie;

    

    // function getGenres() {
    //     // return movieCard.genres_id.map((genre) => genre.name).join(", ");
    //     const genreNames = [];
    //     for (let i = 0; i < genres_id.length; i++) {
    //         genreNames.push(genres_id[i].name);
    //     }
    //     return genreNames.join(", ");
    // }

    return (
        <div className="modal-container">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button >X</button>
                </div>
                <div className="modal-body">
                    <div className="details">
                        <h2>{title}</h2>
                        <img src={poster_path} alt={title} />
                        <h3>Release Date: {release_date}</h3>
                        <h3>Overview: {overview}</h3>
                        <h3>Genre: {}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
