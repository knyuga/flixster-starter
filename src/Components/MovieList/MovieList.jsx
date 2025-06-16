import {useState, useEffect, useCallback} from "react"; // use state is to store values, use effect is to runs effects like fetching data from an API
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";

const MovieList = () => {
    const [movies, setMovies] = useState([]); // movies array (state variable) to hold fetched movies and function to update curr movies, empty array initialization
    const [page, setPage] = useState(1); // pagination state variable to match TMDB
    const [hasMore, setHasMore] = useState(true); // state variable to check if there are more movies to load
    const [searchQuery, setSearchQuery] = useState(""); // state variable to hold search query and updates as the user types in the search bar


    const fetchList = useCallback(async () => { // waiting for axios using async, useCallback to memoize(store) the function so it doesn't change on every render (only when dependencies change)
        try {
            const API_URL = import.meta.env.VITE_NOWPLAYING_URL;
            const API_KEY = import.meta.env.VITE_API_KEY;
            // console.log(API_KEY);
            // console.log(API_URL);

            let data; // variable to hold the data we get from the API
            if (searchQuery === "") {
                // if the search bar is empty, fetch the "now playing" movies
                const response = await axios.get(`${API_URL}?api_key=${API_KEY}&page=${page}`);
                data = response.data;
            } else {
                // if the user typed something, fetch search results
                const response = await axios.get(`${API_URL}?api_key=${API_KEY}&page=${page}&query=${searchQuery}`);
                data = response.data;
            }

            const newMovies = data.results; // get the results from the data, should be 20
            // console.log(newMovies.length);

            if(page === 1) { // if page is 1, we want to reset the movies array
                setMovies(newMovies); // set movies to the new movies
            } else { // if page is not 1, we want to append the new movies to the existing movies array
                setMovies((prevMovies) => [...prevMovies, ...newMovies]); // syntax description: use the spread operator to take all the movies we already have, and add the new ones to the end, and then update the state
            }
            console.log(data.results);

            if (page >= data.total_pages) { // check if the current page is greater than or equal to the total pages
                setHasMore(false);
            }

        } catch (err) {
            console.error("Error fetching list: ", err);
        }
    }, [page, searchQuery]); // dependency bracket holds page, so it will run the fetchList function whenever the page changes

    // step one - fetch list on mount
    useEffect(() => {
        fetchList();
    }, [fetchList] ); 

    const handleLoadMore = () => {
        console.log("Loading more movies...");
        if (hasMore) {
            setPage(prevPage => prevPage + 1);  // updates page number
        }
    };

    const handleSearchChange = (event) => { // event handler function : user types something in the search bar, a change event is triggered
        // Updating the state: Inside the event handler function, we access the new value the user has typed using the event object. We then update 
        // our component's state variable (searchQuery) with this new value. This ensures the state reflects the latest input from the user.
        setSearchQuery(event.target.value); // updates search query state variable every time the user types in the search bar
    };

    const handleSearch = async () => { 
        // when the user clicks the search button, we want to fetch movies based on the search query.
        console.log("Search for: ", searchQuery); // log the search query to the console
        try {
            const API_URL = import.meta.env.VITE_SEARCH_URL;
            const API_KEY = import.meta.env.VITE_API_KEY;

            const { data } = await axios.get(
                `${API_URL}?api_key=${API_KEY}&query=${searchQuery}` // use the search query to get the movies
            );

            setMovies(data.results); // update movies with the search results
            setPage(1); // reset page to 1 for new search results
            setHasMore(data.results.length > 0); // check if there are more results to load

        } catch (err) {
            console.error("Error searching movies: ", err);
        }
    }

    const handleClear = async() => {
        console.log("Clear search");
        setSearchQuery(""); // clear the search query
        setPage(1); // reset page to 1
    }


    return (
        <>
            <div className="search-container">
                {/* state variable (searchQuery) holds the curr text the user has typed in search bar, gets linked to the value attribute of the <input> element */}
                <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" /> 
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleClear}>Clear</button>
            </div>

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
            {hasMore ? (
                <div className="load-button-container">
                    <button className="load-button" onClick={handleLoadMore}>Load More</button>
                </div>
                ) : (
                <div className="load-button-container">
                    <button className="load-button" disabled>No More Movies</button>
                </div>
                )
        }
            

        </>
    );
};

export default MovieList;