import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../styles/homePage.css"

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
    <body>
      <head>
        <title>{t('homePage.headTitle')}</title>
      </head>
      <div className="promptContainer">
        <h3>{t('homePage.welcome_text')}</h3>
        <h4>{t('homePage.welcome_text2')}</h4>
        <div className="promptContainer__choice">
          <button className="promptContainer__choice-signin btn">{t('homePage.alt_signin')}</button>
          <h5 className="orLabel">{t('homePage.or')}</h5>
          <button className="promptContainer__choice-login btn">{t('homePage.alt_login')}</button>
        </div>
      </div>
    </body>
    </>
  );
};

export default HomePage;
