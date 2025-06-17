import "./App.css";
import MovieList from "./Components/MovieList/MovieList";

const App = () => {
  return (
    <>
    <header id="App-header">
      <span className ="typing-effect">FLIXSTER🎬</span>
    </header>
    <MovieList />
    <footer id="App-footer">2025 Flixster Inc, Kenna Nyuga</footer>
    </>
  );
};

export default App;