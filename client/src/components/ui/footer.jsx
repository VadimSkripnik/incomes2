import React from "react";
import { NavLink } from "react-router-dom";
import FooterGoogleSvg from "../../svgFile/footerGoogleSvg";
import FooterAppSvg from "../../svgFile/footerAppSvg";

const Footer = () => {
  return (
    <>
      <footer className="ws-layout-row ws-align-items-center footer">
        <div className="container footer-container">
          <div className="ws-layout-row-wrap ws-align-items-space-between-start ws-body-1 footer__content">
            <div className="footer__left">
              <div className="ws-action-1 footer__item">
                © 2022 Компания по разработке ПО
              </div>
              <div className="ws-action-1 footer__item">
                Техническая поддержка 8-800-234-7-777
              </div>
              <div className="ws-action-1 footer__item">
                Инструкция для пользователей личного кабинета
              </div>
            </div>
            <div className="footer__right">
              <div className="ws-action-1 footer__item">
                Скачать мобильную версию личного кабинета
              </div>
              <div className="ws-layout-row ws-align-items-start footer__item">
                <NavLink
                  className="footer__mobile-link"
                  to="/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <div>
                    <div>
                      <FooterAppSvg />
                    </div>
                  </div>
                </NavLink>
                <NavLink
                  className="footer__mobile-link"
                  to="/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <div>
                    <div>
                      <FooterGoogleSvg />
                    </div>
                  </div>
                </NavLink>
              </div>
              <div className="ws-layout-row ws-align-items-start footer__item"></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
