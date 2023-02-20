import { createContext, useEffect, useReducer } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DeleteBook, GetAllBooks } from "../apis/books";
import { LoadingContext } from "./LoadingContext";

export const BookContext = createContext();

const bookReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOKS":
      return [...action.payload];
    case "ADD_BOOK":
      return [action.payload, ...state];
    case "EDIT_BOOK":
      return state.map((x) => (x.id === action.bookId ? action.payload : x));
    case "DELETE_BOOK":
      return state.filter((x) => x.id !== action.bookId);
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const [books, dispatcher] = useReducer(bookReducer, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { showLoading, hideLoading, addModalMessage, showModal } =
    useContext(LoadingContext);

  const navigate = useNavigate();

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
        hideLoading();
        addModalMessage(error.message);
        showModal();
      });
  }, [showLoading, hideLoading, addModalMessage, showModal]);

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
      return null;
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

  const onDelete = async (bookId) => {
    try {
      showLoading();
      const response = await DeleteBook(bookId);
      hideLoading();
      if (response.success) {
        dispatcher({
          type: "DELETE_BOOK",
          bookId,
        });
        navigate("/books/");
      } else {
        showModal();
        addModalMessage("Somthing went wrong!");
      }
    } catch (error) {
      hideLoading();
      showModal();
      addModalMessage("Somthing went wrong!");
    }
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
