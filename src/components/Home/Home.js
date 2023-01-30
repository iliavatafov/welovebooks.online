import { useContext } from "react";
import { BookContext } from "../../context/BookContext";

import { LoadingContext } from "../../context/LoadingContext";

import { BookCard } from "../Books/BookCard";
import { Slider } from "./Slider";
import { Modal } from "../Modal/Modal";

import "../Home/Home.css";

export const Home = () => {
  const { books } = useContext(BookContext);
  const { isModal, modalMessage } = useContext(LoadingContext);

  const recommendedBooks = books.filter((b) => b.recommended === true);

  return isModal ? (
    <Modal message={modalMessage} />
  ) : (
    <div className="home-container">
      <Slider />
      <div className="grid-title">
        <h2>Recommended from us</h2>
        <p>Check out new titles and top publishers in our online bookstore.</p>
      </div>
      <article className="grid-container">
        {recommendedBooks.map((b) => (
          <BookCard key={b.id} bookData={b} />
        ))}
      </article>
    </div>
  );
};
