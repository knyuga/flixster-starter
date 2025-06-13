import "./MovieCard.css";

// eslint-disable-next-line react/prop-types
const MovieCard = ( {title, poster_path, vote_average} ) => {

    return (
        <>
            <main>
                <div className = "movie-icon"> 
                    <img
                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        alt={title}
                    />
                    <h2>{title}</h2>
                    <h3>Vote Average: {vote_average}</h3>
                </div>
            </main>
        </>
    );
};

export default MovieCard;









