import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { LoadingContext } from "../../context/LoadingContext";

import { RegisterUser } from "../../apis/authentication";
import { validateRegister } from "../../utils/validationService";

import { LoadingSpinner } from "../Spinner/Spinner";
import { Modal } from "../Modal/Modal";

import "../Register/Register.css";

export const Register = () => {
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
    confirmPassword: "",
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

    const validationResult = validateRegister(inputValues);

    if (validationResult !== undefined) {
      setInvalidDataMessage(validationResult);
    } else {
      try {
        showLoading();
        const response = await RegisterUser({ email, password });
        hideLoading();
        if (response.success) {
          userLogin(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/");
          setInputValues({
            email: "",
            password: "",
            confirmPassword: "",
          });
        } else {
          setInvalidDataMessage(response.message);
          setInputValues({
            email: "",
            password: "",
            confirmPassword: "",
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
    <section id="register-page">
      <form id="register" disabled={isLoading} onSubmit={onSubmit}>
        <div className="register-container">
          <h1>Register</h1>
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
          <div className="input-container">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              autoComplete="on"
              placeholder="..."
              id="confirmPassword"
              onChange={onChange}
              value={inputValues.confirmPassword}
            />
          </div>
          {invalidDataMessage && (
            <span className="invalid-message">* {invalidDataMessage}</span>
          )}
          <input className="btn submit" type="submit" value="Register" />
          <p className="field">
            <span>
              If you already have profile click <Link to="/login">here</Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
};
