import { Link } from "react-router-dom";

import "../Footer/Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="text-content">
        <div className="address-container">
          <h2>Contact us</h2>
          <ul className="list">
            <li className="list-item">
              <i>Address:</i> Mur Str. 72, 1000 Sofia, Bulgaria
            </li>
            <li className="list-item">
              <i>Phone:</i> +359 882 037 375
            </li>
            <li className="list-item">
              <i>Email:</i> iliyavatafov@gmail.com
            </li>
          </ul>
        </div>
        <div className="social-links">
          <ul className="list">
            <li className="list-item">
              <a href="https://www.linkedin.com/in/ilia-vatafov-517ba3163/">
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li className="list-item">
              <a href="https://www.facebook.com/iliya.vatafov">
                <i className="fab fa-facebook-square"></i>
              </a>
            </li>
            <li className="list-item">
              <a href="https://www.youtube.com/watch?v=qF9dCWmq3pM">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li className="list-item">
              <a href="https://www.youtube.com/watch?v=9XaS93WMRQQ">
                <i className="fab fa-pinterest-square"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="useful-links-container">
          <h2>Useful links</h2>
          <ul className="list">
            <li className="list-item">
              <Link to="/about">About</Link>
            </li>
            <li className="list-item">
              <Link to="/books">Books</Link>
            </li>
            <li className="list-item">
              <Link to="/contacts">Contacts</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
