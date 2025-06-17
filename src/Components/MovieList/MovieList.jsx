import {useState, useEffect, useCallback} from "react"; // use state is to store values, use effect is to runs effects like fetching data from an API
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import MovieModal from "../MovieModal/MovieModal"; 
import "./MovieList.css";

const MovieList = () => {
    const [movies, setMovies] = useState([]); // movies array (state variable) to hold fetched movies and function to update curr movies, empty array initialization
    const [page, setPage] = useState(1); // pagination state variable to match TMDB
    const [hasMore, setHasMore] = useState(true); // state variable to check if there are more movies to load
    const [searchQuery, setSearchQuery] = useState(""); // state variable to hold search query and updates as the user types in the search bar
    const [selectedMovie, setSelectedMovie] = useState(null); // holds details of the movie that is clicked on, initially set to null
    const [showModal, setShowModal] = useState(false); // state variable to control the visibility of the modal, initially set to false (modal is hidden)
    const [selectedSort, setSelectedSort] = useState("now-playing"); // state variable to hold the selected sort option, initially set to "now-playing"

    const fetchList = useCallback(async () => { // waiting for axios using async, useCallback to memoize(store) the function so it doesn't change on every render (only when dependencies change)
        try {
            const NOWPLAYING = import.meta.env.VITE_NOWPLAYING_URL;
            const API_KEY = import.meta.env.VITE_API_KEY;

            const SEARCH_URL = import.meta.env.VITE_SEARCH_URL;
            const POPULAR_URL = import.meta.env.VITE_POPULAR_URL;
            const TOP_RATED_URL = import.meta.env.VITE_TOP_RATED_URL;
            const UPCOMING_URL = import.meta.env.VITE_UPCOMING_URL; 
            const DISCOVER_URL = import.meta.env.VITE_DISCOVER_URL;
            // alphabetic-order, rating-descending, release-date-newest, now-playing, popular, top-rated, upcoming

            let data; // variable to hold the data we get from the API

            if (searchQuery === "") { // if the search query is empty, we want to fetch the movies based on the selected sort option
                if (selectedSort === "now-playing") {
                    const response = await axios.get(`${NOWPLAYING}?api_key=${API_KEY}&page=${page}`);
                    data = response.data;
                } else if (selectedSort === "alphabetic-order") {
                    const response = await axios.get(`${DISCOVER_URL}?api_key=${API_KEY}&page=${page}&sort_by=original_title.asc`);
                    data = response.data;
                } else if (selectedSort === "rating-descending") {
                    const response = await axios.get(`${DISCOVER_URL}?api_key=${API_KEY}&page=${page}&sort_by=vote_average.desc`);
                    data = response.data;
                } else if (selectedSort === "release-date-newest") {
                    const response = await axios.get(`${DISCOVER_URL}?api_key=${API_KEY}&page=${page}&sort_by=release_date.desc`);
                    data = response.data;
                } else if (selectedSort === "popular") {
                    const response = await axios.get(`${POPULAR_URL}?api_key=${API_KEY}&page=${page}`);
                    data = response.data;
                } else if (selectedSort === "top-rated") {
                    const response = await axios.get(`${TOP_RATED_URL}?api_key=${API_KEY}&page=${page}`);
                    data = response.data;
                } else if (selectedSort === "upcoming") {
                    const response = await axios.get(`${UPCOMING_URL}?api_key=${API_KEY}&page=${page}`);
                    data = response.data;
                }  else if (selectedSort === "now-playing") {
                    const response = await axios.get(`${NOWPLAYING}?api_key=${API_KEY}&page=${page}`);
                    data = response.data;
                }
            } else {
                // if the user typed something, fetch search results
                const response = await axios.get(`${SEARCH_URL}?api_key=${API_KEY}&page=${page}&query=${searchQuery}`);
                data = response.data;
            }

            const newMovies = data.results; // get the results from the data, should be 20

            if(page === 1) { // if page is 1, we want to reset the movies array
                setMovies(newMovies); // set movies to the new movies
            } else { // if page is not 1, we want to append the new movies to the existing movies array
                setMovies((prevMovies) => [...prevMovies, ...newMovies]); // syntax description: use the spread operator to take all the movies we already have, and add the new ones to the end, and then update the state
            }

            if (page >= data.total_pages) { // check if the current page is greater than or equal to the total pages
                setHasMore(false);
            }

        } catch (err) {
            console.error("Error fetching list: ", err);
        }
    }, [page, selectedSort]); // dependency bracket holds page, so it will run the fetchList function whenever the page changes

    // fetch list on mount
    useEffect(() => {
        fetchList();
    }, [fetchList] ); 

    // open modal
    const handleCardClick = (movie) => {
        setShowModal(true);
        setSelectedMovie(movie); // setting it to null triggers the loading state (from devarsh code)
    };

    // close modal
    const handleClose = () => {
        // reset the modal state
        console.log("Closing modal");
        setShowModal(false);
        setSelectedMovie(null);
    };

    // load more movies when the user clicks the "Load More" button
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
            const SEARCH_URL = import.meta.env.VITE_SEARCH_URL;
            const API_KEY = import.meta.env.VITE_API_KEY;
            setPage(1); // reset page to 1 when searching, so we start from the first page of results

            const { data } = await axios.get(
                `${SEARCH_URL}?api_key=${API_KEY}&page=${page}&query=${searchQuery}` // use the search query to get the movies
            );

            setMovies(data.results); // update movies with the search results
            setHasMore(data.results.length > 0); // check if there are more results to load

            // if(page === 1) { // if page is 1, we want to reset the movies array
            //     setMovies(newMovies); // set movies to the new movies
            // } else { // if page is not 1, we want to append the new movies to the existing movies array
            //     setMovies((prevMovies) => [...prevMovies, ...newMovies]); // syntax description: use the spread operator to take all the movies we already have, and add the new ones to the end, and then update the state
            // }

        } catch (err) {
            console.error("Error searching movies: ", err);
        }
    }

    // clear search results and reset the search query
    const handleClear = async() => {
        console.log("Clear search");

        try {
            const NOWPLAYING = import.meta.env.VITE_NOWPLAYING_URL;
            const API_KEY = import.meta.env.VITE_API_KEY;
            setPage(1); // reset page to 1 when searching, so we start from the first page of results

            const { data } = await axios.get(
                `${NOWPLAYING}?api_key=${API_KEY}&page=${page}&query=${searchQuery}` // use the search query to get the movies
            );

            setMovies(data.results); // update movies with the search results
            setHasMore(data.results.length > 0); // check if there are more results to load

        } catch (err) {
            console.error("Error clearing movies: ", err);
        }

        setSearchQuery(""); // clear the search query
    }

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
    };

    return (
        <>
            <div className="search-container">
                {/* state variable (searchQuery) holds the curr text the user has typed in search bar, gets linked to the value attribute of the <input> element */}
                <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" /> 
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleClear}>Clear</button>
            </div>

            <div>
                <label htmlFor="sort-options">Sort Options</label>
                <select id="sort-options" value={selectedSort} onChange={handleSortChange}>
                    <option value="now-playing">Now Playing</option>
                    <option value="alphabetic-order">Alphabetic (A-Z)</option>
                    <option value="rating-descending"> Ratings (Highest to Lowest)</option>
                    <option value="release-date-newest">Release Date (Newest)</option>
                    <option value="popular">Popular</option>
                    <option value="top-rated">Top Rated</option>
                    <option value="upcoming">Upcoming</option>
                </select>
            </div>

            <div className="movie-list"> 
                {movies.map((m) => {    
                    return (
                        <MovieCard
                            key={m.id}
                            movie={m}
                            handleCardClick={handleCardClick}
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
            <MovieModal
                show={showModal}
                movie={selectedMovie}
                handleClose={handleClose}
            />

        </>
    );
};

export default MovieList;