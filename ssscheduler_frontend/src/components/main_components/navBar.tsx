import React, { useCallback, useEffect, useState } from "react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import SSS_Logo from "../../images/SSSLogo_full_vector.svg"
import "../../styles/navBar.css"
import i18n from "utilities/i18n";
import { useTranslation } from "react-i18next";
import UserModel from "objects/UserModel";
import { getCurrentUser, isAuthenticated } from "utilities/AuthHelpers";

interface NavigationProps {
  logoutFunction: () => void;
}

const NavBar: FC<NavigationProps> = ({ logoutFunction }) => {
  const navigate = useNavigate();
  const userFromLocalStorage: UserModel = getCurrentUser();
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const onLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);
  const onSigninClick = useCallback(() => {
    navigate("/signin");
  }, [navigate]);
  const onLogoClick = useCallback(() => {
    navigate("/scheduler");
  }, [navigate]);

  return (
    <nav>
      <div className="navContainer container-fluid d-flex justify-content-between align-items-center">
        <div className="nav-logoContainer col" onClick={onLogoClick}>
          <img className="nav-logoContainer-img" src={SSS_Logo} alt="SSSLogo" height={50}/>
        </div>
        <div className="nav-buttonContainer">
          <button className="nav-buttonContainer__button-language btn" onClick={() => setCurrentLanguage(currentLanguage === "en" ? "pl" : "en")}>
            {currentLanguage === "en" ?
              <label>EN</label>
              :
              <label>PL</label>
            }
          </button>
          {isAuthenticated() &&
            <button className="nav-buttonContainer__button-logout btn" onClick={logoutFunction}>{t('navbar.logout')}</button>
          }
          {!isAuthenticated() &&
            <button className="nav-buttonContainer__button-signin btn" onClick={onSigninClick}>{t('navbar.signin')}</button>
          }
          {!isAuthenticated() &&
            <button className="nav-buttonContainer__button-login btn" onClick={onLoginClick}>{t('navbar.login')}</button>
          }
          {/* <button className="nav-buttonContainer__button-signin btn" onClick={onSigninClick}>{t('navbar.signin')}</button>
          <button className="nav-buttonContainer__button-login btn" onClick={onLoginClick}>{t('navbar.login')}</button> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
