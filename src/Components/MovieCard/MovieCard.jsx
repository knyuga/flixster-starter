import "./MovieCard.css";
import React, { useState } from "react"; // importing React and useState hook

// eslint-disable-next-line react/prop-types
const MovieCard = ( {movie, handleCardClick} ) => {
    const { title, poster_path, vote_average } = movie; // destructuring the movie object to get the title, poster_path, and vote_average
    const [liked, setLiked] = useState(false);
    const [watched, setWatched] = useState(false);

    const handleLike = (e) => {
        setLiked(!liked);
        console.log("Liked movie:", title);
        e.stopPropagation();
    };

    const handleWatch = (e) => {
        setWatched(!watched);
        console.log("Watched movie:", title);
        e.stopPropagation();
    };

    return (
        <>
            <main>
                <div className = "movie-icon" onClick={() => handleCardClick(movie)} style={{ cursor: "pointer" }}> 
                    <img
                        src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F5720408-crossed-image-icon-picture-not-available-delete-picture-vector-symbol&psig=AOvVaw2n-ScSmgmNxGsDIF8EOMN6&ust=1750272582893000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOjO582P-Y0DFQAAAAAdAAAAABAE"}
                        alt={title}
                        onError={(e) => {
                            e.target.onerror = null; // Prevents infinite loop if the fallback image also fails
                            e.target.src = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F5720408-crossed-image-icon-picture-not-available-delete-picture-vector-symbol&psig=AOvVaw2n-ScSmgmNxGsDIF8EOMN6&ust=1750272582893000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOjO582P-Y0DFQAAAAAdAAAAABAE"; // image
                        }}
                    />
                    <div className="movie-card-content">
                        <h2>{title}</h2>
                        <h3>Rating: {vote_average}</h3>
                        <div className="button-container">
                            <button className={`watch-button ${watched ? "watched" : ""}`} onClick={handleWatch}> {watched ? "✅ Watched" : "🎥 Watch"} </button>
                            <button className={`like-button ${liked ? "liked" : ""}`} onClick={handleLike}> {liked ? "❤️ Liked" : "🤍 Like"} </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};


export default MovieCard;









