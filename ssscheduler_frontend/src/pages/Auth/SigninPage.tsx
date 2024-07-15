import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import '../../styles/signinPage.css'


const SigninPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return(
        <>
        <body>
            <head>
                <title>{t('signinPage.headTitle')}</title>
            </head>
            <div className="signinContainer">
                <h4 className="signinContainer__signinPrompt">{t('signinPage.prompt')}</h4>
                <form className="signinContainer__form form" /*onSubmit={}*/ method="post">
                    <div className="signinContainer__formInput form-floating mb-3">
                        <input type="email" className="form-control" id="emailInput" placeholder="" required></input>
                        <label htmlFor="emailInput">{t('signinPage.emailPrompt')}</label>
                    </div>
                    <div className="signinContainer__formInput form-floating mb-3">
                        <input type="password" className="form-control" id="passwordInput" placeholder="" required></input>
                        <label htmlFor="passwordInput">{t('signinPage.passwordPrompt')}</label>
                    </div>
                    <div className="signinContainer__formInput form-floating mb-3">
                        <input type="password" className="form-control" id="confirmInput" placeholder="" required></input>
                        <label htmlFor="confirmInput">{t('signinPage.confirmPasswordPrompt')}</label>
                    </div>
                    <button type="submit" className="signinContainer__signinButton btn">{t('signinPage.signinButton')}</button>
                </form>
            </div>
        </body>
        </>
    )
}

export default SigninPage;