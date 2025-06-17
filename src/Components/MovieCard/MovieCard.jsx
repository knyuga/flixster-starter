import "./MovieCard.css";

// eslint-disable-next-line react/prop-types
const MovieCard = ( {movie, handleCardClick} ) => {
    const { title, poster_path, vote_average } = movie; // destructuring the movie object to get the title, poster_path, and vote_average

    const handleLike = () => {
        console.log("Liked movie:", title);
        e.stopPropagation;

    };
    return (
        <>
            <main>
                <div className = "movie-icon" onClick={() => handleCardClick(movie)} style={{ cursor: "pointer" }}> 
                    <img
                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        alt={title}
                    />
                    <h2>{title}</h2>
                    <h3>Rating: {vote_average}</h3>
                    <button className="like-button" onClick={handleLike}>💜</button>
                </div>
            </main>
        </>
    );
};


export default MovieCard;









