import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import * as BookAPI from "./BooksAPI";
import ListBooks from "./components/ListBooks";
import SearchBar from "./components/SearchBar";

const options = [
  { name: "Currently Reading", id: "currentlyReading" },
  { name: "Want to Read", id: "wantToRead" },
  { name: "Read", id: "read" },
];

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await BookAPI.getAll();
      setBooks(result);
    })();
  }, []);

  const changeShelf = async (book, shelf) => {
    try {
      await BookAPI.update(book, shelf);
      const updatedBooks = await BookAPI.getAll();
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error updating shelf:", error);
    }
  };

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={<ListBooks books={books} changeShelf={changeShelf} options={options} />}
        />
        <Route
          exact
          path="/search"
          element={<SearchBar books={books} changeShelf={changeShelf} options={options} />}
        />
      </Routes>
    </div>
  );
}

export default App;
