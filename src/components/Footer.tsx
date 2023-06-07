import React from 'react';
import { Link } from 'react-router-dom';
import 'style/footer.scss';
export default function Footer() {
  return (
    <footer className="footer">
      <h2>
        <Link to="/" className="footer__title">
          QPICK
        </Link>
      </h2>
      <div className="footer__navigation">
        <div className="footer__navigation_left">
          <Link to="/favourites" className="footer__link">
            Избранное
          </Link>
          <Link to="/basket" className="footer__link">
            Корзина
          </Link>
          <Link to="/contacts" className="footer__link">
            Контакты
          </Link>
        </div>
        <div className="footer__navigation_right">
          <Link to="/rules" className="footer__link">
            Условия Сервиса
          </Link>
          <div className="footer__lang_container">
            <span className="footer__lang footer__lang-active">Рус</span>
            <span className="footer__lang">Eng</span>
          </div>
        </div>
      </div>
      <div className="social">
        <a href="#" className="social__link">
          <img src="./assets/svg/vk.svg" alt="vk" className="social__img" />
        </a>
        <a href="#" className="social__link">
          <img src="./assets/svg/telegram.svg" alt="telegram" className="social__img" />
        </a>
        <a href="#" className="social__link">
          <img src="./assets/svg/whatsapp.svg" alt="whatsapp" className="social__img" />
        </a>
      </div>
    </footer>
  );
}
