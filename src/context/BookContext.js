import { useContext } from "react";
import { createContext, useEffect, useReducer } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoadingContext } from "./LoadingContext";

import { DeleteBook, GetAllBooks } from "../apis/books";

export const BookContext = createContext();

const bookReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOKS":
      return [...action.payload];
      break;
    case "ADD_BOOK":
      return [action.payload, ...state];
      break;
    case "EDIT_BOOK":
      return state.map((x) => (x.id === action.bookId ? action.payload : x));
      break;
    case "DELETE_BOOK":
      return state.filter((x) => x.id !== action.bookId);
      break;
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const [books, dispatcher] = useReducer(bookReducer, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();

  const { showLoading, hideLoading, showModal, addModalMessage } =
    useContext(LoadingContext);

  useEffect(() => {
    showLoading();
    GetAllBooks()
      .then((result) => {
        hideLoading();
        window.localStorage.setItem("books", JSON.stringify(result.data));
        return dispatcher({
          type: "ADD_BOOKS",
          payload: result.data,
        });
      })
      .catch((error) => {
        showModal();
        addModalMessage(error.message);
      });
  }, []);

  const booksLocalStorage = JSON.parse(localStorage.getItem("books"));

  if (books.length === 0 && booksLocalStorage) {
    dispatcher({
      type: "ADD_BOOKS",
      payload: JSON.parse(localStorage.getItem("books")),
    });
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    let data = [];
    books.filter((item) => {
      if (
        item.description.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.genre.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        data.push(item);
      }
    });
    setFilteredData(data);
    navigate("/books/");
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  const addBook = (bookData) => {
    dispatcher({
      type: "ADD_BOOK",
      payload: bookData.data,
    });
    navigate("/details/" + bookData.data.id);
  };

  const bookEdit = (bookId, bookData) => {
    dispatcher({
      type: "EDIT_BOOK",
      payload: bookData,
      bookId,
    });
    navigate("/details/" + bookId);
  };

  const onDelete = (bookId) => {
    DeleteBook(bookId);
    dispatcher({
      type: "DELETE_BOOK",
      bookId,
    });
    navigate("/books/");
  };

  return (
    <BookContext.Provider
      value={{
        books,
        filteredData,
        searchTerm,
        addBook,
        bookEdit,
        onDelete,
        handleSearch,
        clearSearchTerm,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
