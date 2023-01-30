import { Route, Routes } from "react-router-dom";

import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import { CartProvider } from "./context/CartContext";
import { LoadingProvider } from "./context/LoadingContext";
import { MessagesProvider } from "./context/MessageContext";
import { AuthProvider } from "./context/AuthContext.js";
import { BookProvider } from "./context/BookContext";

import { About } from "./components/About/About";
import { AddBook } from "./components/AddBook/AddBook";
import { Books } from "./components/Books/Books";
import { Cart } from "./components/Cart/Cart";
import { Contacts } from "./components/Contacts/Contacts";
import { Details } from "./components/Details/Details";
import { EditBook } from "./components/EditBook/EditBook";
import { Favorites } from "./components/Favorites/Favorites";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Messages } from "./components/Messages/Messages";
import { Navbar } from "./components/Navbar/Navbar";
import { Register } from "./components/Register/Register";
import { Orders } from "./components/Orders/Orders";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="container">
        <LoadingProvider>
          <BookProvider>
            <MessagesProvider>
              <CartProvider>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/details/:id" element={<Details />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route
                    path="/add-book"
                    element={
                      <AdminProtectedRoute>
                        <AddBook />
                      </AdminProtectedRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <AdminProtectedRoute>
                        <Orders />
                      </AdminProtectedRoute>
                    }
                  />
                  <Route
                    path="/edit-book/:id"
                    element={
                      <AdminProtectedRoute>
                        <EditBook />
                      </AdminProtectedRoute>
                    }
                  />
                  <Route
                    path="/messages"
                    element={
                      <AdminProtectedRoute>
                        <Messages />
                      </AdminProtectedRoute>
                    }
                  />
                  <Route
                    path="/favorites"
                    element={
                      <ProtectedRoute>
                        <Favorites />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <PublicRoute>
                        <Register />
                      </PublicRoute>
                    }
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/about" element={<About />} />
                </Routes>
                <Footer />
              </CartProvider>
            </MessagesProvider>
          </BookProvider>
        </LoadingProvider>
      </div>
    </AuthProvider>
  );
}

export default App;
