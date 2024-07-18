import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../styles/homePage.css"

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);
  const onSigninClick = useCallback(() => {
    navigate("/signin");
  }, [navigate]);

  return (
    <>
    <body>
      <head>
        <title>{t('homePage.headTitle')}</title>
      </head>
      <div className="promptContainer">
        <h3 className="promptContainer__WT1">{t('homePage.welcome_text')}</h3>
        <h4 className="promptContainer__WT1">{t('homePage.welcome_text2')}</h4>
        <div className="promptContainer__choice">
          <button className="promptContainer__choice-signin btn" onClick={onSigninClick}>{t('homePage.alt_signin')}</button>
          <h5 className="orLabel">{t('homePage.or')}</h5>
          <button className="promptContainer__choice-login btn" onClick={onLoginClick}>{t('homePage.alt_login')}</button>
        </div>
      </div>
    </body>
    </>
  );
};

export default HomePage;
