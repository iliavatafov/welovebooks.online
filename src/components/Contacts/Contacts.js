import { useContext } from "react";
import { useState } from "react";

import { LoadingContext } from "../../context/LoadingContext";
import { MessagesContext } from "../../context/MessageContext";

import { AddNewMessage, GetAllMessages } from "../../apis/messages";
import { validateMessages } from "../../utils/validationService";

import { LoadingSpinner } from "../Spinner/Spinner";
import { Modal } from "../Modal/Modal";

import moment from "moment/moment";
import { v4 as uuidv4 } from "uuid";

import "../Contacts/Contacts.css";

export const Contacts = () => {
  const [invalidDataMessage, setInvalidDataMessage] = useState(null);
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const {
    showLoading,
    hideLoading,
    isLoading,
    showModal,
    isModal,
    addModalMessage,
    modalMessage,
  } = useContext(LoadingContext);
  const { updateUnreadMessages } = useContext(MessagesContext);

  const onChange = (e) => {
    setInputValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const validationResult = validateMessages(inputValues);

    if (validationResult !== undefined) {
      setInvalidDataMessage(validationResult);
    } else {
      try {
        const messages = await (await GetAllMessages()).data;

        const createdAt = moment().format("DD-MM-YYYY HH:mm A");

        const id = uuidv4();

        messages.unread.unshift({ ...inputValues, createdAt, id });
        showLoading();
        const response = await AddNewMessage(messages);
        updateUnreadMessages(messages.unread);
        hideLoading();
        setInputValues({
          name: "",
          email: "",
          message: "",
        });

        if (response.success) {
          setInvalidDataMessage(null);
          showModal();
          addModalMessage(response.message);
        } else {
          setInvalidDataMessage(null);
          showModal();
          addModalMessage(response.message);
        }
      } catch (error) {
        hideLoading();
        setInvalidDataMessage(null);
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
    <div className="contacts-container">
      <header className="contacts-header">
        <h1 className="title">Where to find us</h1>
        <p className="subtitle">Contact us</p>
      </header>
      <main className="contacts-main">
        <iframe
          title="google-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.9845066707503!2d23.2819503119042!3d42.661683715871824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa84954af64b55%3A0x1638741085a398a!2z0YPQuy4g4oCe0JzRg9GA4oCcIDcyLCAxNjgwINC60LIuINCc0LDQvdCw0YHRgtC40YDRgdC60Lgg0LvQuNCy0LDQtNC4LCDQodC-0YTQuNGP!5e0!3m2!1sbg!2sbg!4v1673704632620!5m2!1sbg!2sbg"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="bottom-container">
          <form id="contact-form" disabled={isLoading} onSubmit={onSubmit}>
            <div className="contact-form-container">
              <div className="input-first-line">
                <div className="input-container">
                  <label htmlFor="name">Your name:</label>
                  <input
                    type="name"
                    id="name"
                    name="name"
                    placeholder="type your name here..."
                    onChange={onChange}
                    value={inputValues.name}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="email">Your E-mail:</label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="on"
                    placeholder="youremail@gmail.com..."
                    id="email"
                    onChange={onChange}
                    value={inputValues.email}
                  />
                </div>
              </div>
              <div className="input-container">
                <label htmlFor="message">Your message:</label>
                <textarea
                  type="message"
                  name="message"
                  autoComplete="on"
                  placeholder="type your message..."
                  id="message"
                  onChange={onChange}
                  value={inputValues.message}
                />
              </div>
              {invalidDataMessage && (
                <span className="invalid-message">* {invalidDataMessage}</span>
              )}
              <input
                className="btn-submit"
                type="submit"
                value="Send a message"
              />
            </div>
          </form>
          <div className="contact-data">
            <img
              src="https://lh3.googleusercontent.com/69RyyC5xQjhrNOaJCyt6zzjCapJXVLL9uuYYvHGKyb72vCYzxNRiWeBIEWyC6ZJs1gHb6SRDEAwem_G2dyLoRwY"
              alt="bookstore"
            />
            <h2 className="title">Contacts</h2>
            <ul className="list">
              <li className="list-item">
                <i>Address:</i> Mur Str. 72, 1000 Sofia, Bulgaria
              </li>
              <li className="list-item">
                <i>Phone:</i> +359 882 037 375
              </li>
              <li className="list-item">
                <i>Email:</i>{" "}
                <a href="mailto: iliyavatafov@gmail.com">
                  iliyavatafov@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};
