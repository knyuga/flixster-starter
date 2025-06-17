import "./App.css";
import MovieList from "./Components/MovieList/MovieList";

const App = () => {
  return (
    <>
    <header id="App-header">
      <span className ="typing-effect">FLIXSTER</span>
    </header>
    <MovieList />
    <footer id="App-footer">Kenna Nyuga, 2025</footer>
    </>
  );
};

export default App;