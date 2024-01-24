import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import * as BookAPI from "../BooksAPI";
import Book from "./Book";

const SearchBar = ({ changeShelf }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);

  const searchQueryHandler = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setSearchedBooks([]);
      return;
    }
  };

  const handleSearch = useCallback(async (query) => {
    if (query === "") {
      return;
    }

    try {
      const booksShelved = await BookAPI.getAll();
      const fetchedBooks = await BookAPI.search(query);

      if (!fetchedBooks || fetchedBooks.error === "empty query") {
        setSearchedBooks([]);
        return;
      }

      const updatedBooks = fetchedBooks.map((fetchedBook) => {
        const shelvedBook = booksShelved.find((book) => book.id === fetchedBook.id);
        return {
          ...fetchedBook,
          shelf: shelvedBook ? shelvedBook.shelf : "none",
        };
      });

      setSearchedBooks(updatedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div>
          <input
            type="text"
            onChange={searchQueryHandler}
            placeholder="Search by title, author, or ISBN"
          />
          <div>
            <ol className="books-grid">
              {searchedBooks.map((book) => (
                <Book key={book.id} book={book} changeShelf={changeShelf} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
