import { useContext } from "react";

import { BookContext } from "../../context/BookContext";
import { LoadingContext } from "../../context/LoadingContext";

import { LoadingSpinner } from "../Spinner/Spinner";
import { BookCard } from "./BookCard";

import "../Books/Books.css";

export const Books = () => {
  const { books, filteredData, searchTerm } = useContext(BookContext);
  const { isLoading } = useContext(LoadingContext);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="books-container">
      {searchTerm === ""
        ? books.map((bookData) => (
            <BookCard key={bookData.id} bookData={bookData} />
          ))
        : filteredData.map((bookData) => (
            <BookCard key={bookData.id} bookData={bookData} />
          ))}
    </div>
  );
};
