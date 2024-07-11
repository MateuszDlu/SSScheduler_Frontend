import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import SSS_Logo from "../../images/SSSLogo_full_vector.svg"
import "../../styles/navBar.css"
import i18n from "utilities/i18n";
import { useTranslation } from "react-i18next";

interface NavigationProps {
  logoutFunction: () => void;
}

const NavBar: FC<NavigationProps> = ({ logoutFunction }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  return (
    <nav>
      <div className="navContainer container-fluid d-flex justify-content-between align-items-center">
        <div className="nav-logoContainer col">
          <img src={SSS_Logo} alt="SSSLogo" height={50}/>
        </div>
        <div className="nav-buttonContainer">
          <button className="nav-buttonContainer__button-language btn" onClick={() => setCurrentLanguage(currentLanguage === "en" ? "pl" : "en")}>
            {currentLanguage === "en" ?
              <label>EN</label>
              :
              <label>PL</label>
            }
          </button>
          <button className="nav-buttonContainer__button-signin btn">{t('navbar.signin')}</button>
          <button className="nav-buttonContainer__button-login btn">{t('navbar.login')}</button>
        </div>
      </div>
    </nav>
    // <Navbar expand="lg" className="Navbar-body">
    //   <Container>
    //   <Navbar.Brand href="#home">
    //         <img
    //           src={SSS_Logo}
    //           height="40"
    //           className="d-inline-block align-top"
    //           alt="React Bootstrap logo"
    //         />
    //       </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="#home">Home</Nav.Link>
    //         <Nav.Link href="#link">Link</Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};

export default NavBar;
