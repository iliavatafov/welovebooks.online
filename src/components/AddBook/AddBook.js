import { useContext } from "react";
import { useState } from "react";

import { BookContext } from "../../context/BookContext";
import { LoadingContext } from "../../context/LoadingContext";

import { CreateBook } from "../../apis/books";

import { LoadingSpinner } from "../Spinner/Spinner";
import { Modal } from "../Modal/Modal";

import "../AddBook/AddBook.css";

export const AddBook = () => {
  const [invalidDataMessage, setInvalidDataMessage] = useState(null);
  const [inputValues, setInputValues] = useState({
    title: "",
    imageUrl: "",
    description: "",
    author: "",
    genre: "",
    size: "",
    price: "",
    pageCount: "",
    issueYear: "",
    rating: "0",
    rating: {
      rating: 0,
      usersRated: [],
    },
  });

  const { addBook } = useContext(BookContext);
  const {
    showLoading,
    hideLoading,
    isLoading,
    showModal,
    isModal,
    addModalMessage,
    modalMessage,
  } = useContext(LoadingContext);

  const onChange = (e) => {
    setInputValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(inputValues).some((x) => x === "")) {
      setInvalidDataMessage("All fileds are required!");
    } else {
      try {
        showLoading();
        const response = await CreateBook(inputValues);
        hideLoading();
        if (response.success) {
          addBook(response.data);
          showModal();
          addModalMessage(response.message);
          setInputValues({
            title: "",
            imageUrl: "",
            description: "",
            author: "",
            genre: "",
            size: "",
            price: "",
            pageCount: "",
            issueYear: "",
            rating: "0",
          });
        }
      } catch (error) {
        hideLoading();
        showModal();
        addModalMessage(error.message);
      }
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : isModal ? (
    <Modal message={modalMessage} />
  ) : (
    <section id="create-page">
      <form id="create" onSubmit={onSubmit} disabled={isLoading}>
        <div className="create-container">
          <h1>Add New Book</h1>
          <div className="input-container">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={onChange}
              value={inputValues.title}
            />
          </div>
          <div className="input-container">
            <label htmlFor="description">Description:</label>
            <textarea
              rows={3}
              id="description"
              name="description"
              onChange={onChange}
              value={inputValues.description}
            />
          </div>
          <div className="input-container">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              onChange={onChange}
              value={inputValues.imageUrl}
            />
          </div>
          <div className="input-container">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              onChange={onChange}
              value={inputValues.price}
            />
          </div>
          <div className="input-container">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              onChange={onChange}
              value={inputValues.author}
            />
          </div>
          <div className="input-container">
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              id="genre"
              name="genre"
              onChange={onChange}
              value={inputValues.genre}
            />
          </div>
          <div className="input-container">
            <label htmlFor="size">Size:</label>
            <input
              type="text"
              id="size"
              name="size"
              onChange={onChange}
              value={inputValues.size}
            />
          </div>
          <div className="input-container">
            <label htmlFor="pageCount">Page Count:</label>
            <input
              type="text"
              id="pageCount"
              name="pageCount"
              onChange={onChange}
              value={inputValues.pageCount}
            />
          </div>
          <div className="input-container">
            <label htmlFor="issueYear">Year:</label>
            <input
              type="text"
              id="issueYear"
              name="issueYear"
              onChange={onChange}
              value={inputValues.issueYear}
            />
          </div>
          {invalidDataMessage && (
            <span className="invalid-message">* {invalidDataMessage}</span>
          )}
          <input
            onSubmit={onSubmit}
            className="btn submit"
            type="submit"
            defaultValue="Add Book"
          />
        </div>
      </form>
    </section>
  );
};
