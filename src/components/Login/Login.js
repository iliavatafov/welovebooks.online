import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { LoadingContext } from "../../context/LoadingContext";

import { LoginUser } from "../../apis/authentication";
import { validateLogin } from "../../utils/validationService";

import { Modal } from "../Modal/Modal";
import { LoadingSpinner } from "../Spinner/Spinner";

import "../Login/Login.css";

export const Login = () => {
  const [invalidDataMessage, setInvalidDataMessage] = useState(null);

  const {
    showLoading,
    hideLoading,
    isLoading,
    showModal,
    isModal,
    addModalMessage,
    modalMessage,
  } = useContext(LoadingContext);
  const { userLogin } = useContext(AuthContext);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setInputValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = inputValues;

    const validationResult = validateLogin(inputValues);

    if (validationResult !== undefined) {
      setInvalidDataMessage(validationResult);
    } else {
      try {
        showLoading();
        const response = await LoginUser({ email, password });
        hideLoading();
        if (response.success) {
          setInvalidDataMessage(null);
          userLogin(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/");
          setInputValues({
            email: "",
            password: "",
          });
        } else {
          setInvalidDataMessage("Email or password don't match");
          setInputValues({
            email: "",
            password: "",
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
    <section id="login-page">
      <form id="login" onSubmit={onSubmit} disabled={isLoading}>
        <div className="login-container">
          <h1>Login</h1>
          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="somthing@gmail.com"
              onChange={onChange}
              value={inputValues.email}
            />
          </div>
          <div className="input-container">
            <label htmlFor="register-password">Password:</label>
            <input
              type="password"
              name="password"
              autoComplete="on"
              placeholder="..."
              id="register-password"
              onChange={onChange}
              value={inputValues.password}
            />
          </div>
          {invalidDataMessage && (
            <span className="invalid-message">* {invalidDataMessage}</span>
          )}
          <input className="btn submit" type="submit" value="Login" />
          <p className="field">
            <span>
              If you don`t have profile click <Link to="/register">here</Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
};
