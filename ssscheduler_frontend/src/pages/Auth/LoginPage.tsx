import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../../styles/loginPage.css"

const LoginPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return(
        <>
        <body>
            <head>
                <title>{t('loginPage.headTitle')}</title>
            </head>
            <div className="loginContainer">
                <h4 className="loginContainer__loginPrompt">{t('loginPage.prompt')}</h4>
                <form className="loginContainer__form form" /*onSubmit={}*/ method="post">
                    <div className="loginContainer__formInput form-floating mb-3">
                        <input type="email" className="form-control" id="emailInput" placeholder="" required></input>
                        <label htmlFor="emailInput">{t('loginPage.emailPrompt')}</label>
                    </div>
                    <div className="loginContainer__formInput form-floating mb-3">
                        <input type="password" className="form-control" id="passwordInput" placeholder="" required></input>
                        <label htmlFor="passwordInput">{t('loginPage.passwordPrompt')}</label>
                    </div>
                    <button type="submit" className="loginContainer__loginButton btn">{t('loginPage.loginButton')}</button>
                </form>
            </div>
        </body>
        </>
    )
}

export default LoginPage;