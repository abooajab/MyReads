import React from 'react';

const Book = ({ book, changeShelf }) => {
  const options = [
    { name: "Currently Reading", id: "currentlyReading" },
    { name: "Want to Read", id: "wantToRead" },
    { name: "Read", id: "read" },
    { name: "None", id: "none" },
  ];

  const renderOptions = () => (
    <>
      <option disabled>Move to...</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </>
  );

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${
              book.imageLinks && book.imageLinks.thumbnail
                ? book.imageLinks.thumbnail
                : "https://via.placeholder.com/128x193"
            }")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={book.shelf}
            onChange={(e) => changeShelf(book, e.target.value)}
          >
            {renderOptions()}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
};

export default Book;
