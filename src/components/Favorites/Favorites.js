import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import { LoadingContext } from "../../context/LoadingContext";
import { BookContext } from "../../context/BookContext";

import { BookCard } from "../Books/BookCard";
import { LoadingSpinner } from "../Spinner/Spinner";

import "../Favorites/Favorites.css";

export const Favorites = () => {
  const { user } = useContext(AuthContext);
  const { isLoading } = useContext(LoadingContext);
  const { books } = useContext(BookContext);

  const favoriteBooks = [];

  user.favoriteBooks.map((id) => {
    books.map((el) => {
      if (el.id === id) {
        favoriteBooks.push(el);
      }
    });
  });

  const isGrid = favoriteBooks.length > 0;

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div
      className={isGrid ? "favorites-container-grid" : "favorites-container"}
    >
      {favoriteBooks?.length > 0 ? (
        favoriteBooks?.map((bookData) => (
          <BookCard key={bookData.id} bookData={bookData} />
        ))
      ) : (
        <div className="no-books-wrapper">
          <div className="no-books-container">
            <h1 className="no-books">No books added</h1>
          </div>
        </div>
      )}
    </div>
  );
};
