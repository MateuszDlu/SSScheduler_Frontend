import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../../styles/loginPage.css"
import { FunctionComponent, useCallback, useState } from "react";
import axios from "axios";
import { LOCAL_HOST_API_URL } from "utilities/AppConstants";

interface LoginPageProps {
    setUserFunction: (user: any) => void;
}

const LoginPage: FunctionComponent<LoginPageProps> = ({setUserFunction}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [notificationMessage, setNotificationMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }, []);

    const onFormSubmit = useCallback(async (e: React.FormEvent) => {
        setNotificationMessage("");
        try {
            setIsLoading(true);
            axios.defaults.withCredentials = true;
            e.preventDefault();
            let formLoginCredentials: FormData = new FormData();
            formLoginCredentials.append('email', formData.email);
            formLoginCredentials.append('password', formData.password);
            const response = await axios({
                method: 'post',
                url: `${LOCAL_HOST_API_URL}/auth/login`,
                data: formLoginCredentials,
                withCredentials: true,
            });
            if (response.status === 200) {
                setUserFunction(JSON.stringify(response.data));
                setIsLoading(false);
                navigate("/scheduler");
            }
        } catch (exception) {
            setIsLoading(false);
            setNotificationMessage(t('loginPage.wrongCredentials'));
            console.error(exception)
        }
    }, [formData]);

    function loginText(){
        if (isLoading){
            return t('loginPage.loginWait')
        }else {
            return t('loginPage.loginButton')
        }
    }

    return(
        <>
        <body>
            <head>
                <title>{t('loginPage.headTitle')}</title>
            </head>
            <div className="loginContainer">
                <h4 className="loginContainer__loginPrompt">{t('loginPage.prompt')}</h4>
                <form className="loginContainer__form form" onSubmit={onFormSubmit} method="post">
                    <div className="loginContainer__formInput form-floating mb-3">
                        <input type="email" className="form-control" id="email" name="email" placeholder="" onChange={onInputChange} required></input>
                        <label htmlFor="email">{t('loginPage.emailPrompt')}</label>
                    </div>
                    <div className="loginContainer__formInput form-floating mb-3">
                        <input type="password" className="form-control" id="password" name="password" onChange={onInputChange} placeholder="" required></input>
                        <label htmlFor="password">{t('loginPage.passwordPrompt')}</label>
                    </div>
                    <button type="submit" className="loginContainer__loginButton btn" disabled={isLoading}>{loginText()}</button>
                </form>
                <label className="loginContainer__registerPrompt">
                    {t('loginPage.registerPrompt')} <a className="loginContainer__registerPrompt-href" href="/signin">{t('signinPage.signinButton')}</a>
                </label>
            </div>
        </body>
        </>
    )
}

export default LoginPage;