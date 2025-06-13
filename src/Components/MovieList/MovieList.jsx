import {useState, useEffect} from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";

const MovieList = () => {
    const [movies, setMovies] = useState([]); // movies and function to update curr movies, empty array initialization

    // step one - fetch list on mount
    useEffect(() => {
        const fetchList = async () => { // waiting for axios
            try {
                const API_URL = import.meta.env.VITE_NOWPLAYING_URL;
                const API_KEY = import.meta.env.VITE_API_KEY;
                // const moreMovies = [];
                console.log(API_KEY);
                console.log(API_URL);
                const { data } = await axios.get(
                    `${API_URL}?api_key=${API_KEY}` // backticks not single quotes
                );
                setMovies(data.results); // update movies
                console.log(data.results);
            } catch (err) {
                console.error("Error fetching list: ", err);
            }
        };
        fetchList();
    }, [] ); // dependency bracket
    
    return (
        <>
            <div className="movie-list"> 
                {movies.map((m) => {    
                    return (
                        <MovieCard
                            key={m.id}
                            title={m.title}
                            vote_average={m.vote_average}
                            poster_path={m.poster_path}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default MovieList;