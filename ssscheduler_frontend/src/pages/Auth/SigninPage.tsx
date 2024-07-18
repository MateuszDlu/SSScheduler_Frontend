import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import '../../styles/signinPage.css'
import { FunctionComponent, useCallback, useState } from "react";
import axios, {AxiosError} from "axios";
import { LOCAL_HOST_API_URL } from "utilities/AppConstants";

interface RegisterPageProps {
    setUserFunction: (user: any) => void;
}

const SigninPage: FunctionComponent<RegisterPageProps> = ({setUserFunction}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
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
            let formRegisterData: FormData = new FormData();
            formRegisterData.append('email', formData.email);
            formRegisterData.append('password', formData.password);
            formRegisterData.append("confirmPassword", formData.confirmPassword);
            const response = await axios({
                method: 'post',
                url: `${LOCAL_HOST_API_URL}/user`,
                data: formRegisterData,
                withCredentials: true,
            });
            if (response.status === 200) {
                console.log('success')
                setUserFunction(JSON.stringify(response.data));
                setIsLoading(false);
                navigate("/scheduler");
            }
        } catch (exception: unknown) {
            console.log('failure')
            setIsLoading(false);
            const ex = exception as AxiosError;
            const errorResponse = ex.response?.data;
            if (errorResponse !== undefined)
                setNotificationMessage(JSON.stringify(errorResponse));
            else
                // @ts-ignore
                setNotificationMessage(ex.response?.data[0].errorMessage);
        }
    }, [formData]);

//TODO VALIDATION

    return(
        <>
        <body>
            <head>
                <title>{t('signinPage.headTitle')}</title>
            </head>
            <div className="signinContainer">
                <h4 className="signinContainer__signinPrompt">{t('signinPage.prompt')}</h4>
                {/*notification?*/}
                <form className="signinContainer__form form" onSubmit={onFormSubmit}>
                    <div className="signinContainer__formInput form-floating mb-3">
                        <input type="email" className="form-control" id="email" name="email" onChange={onInputChange} placeholder="" required></input>
                        <label htmlFor="email">{t('signinPage.emailPrompt')}</label>
                    </div>
                    <div className="signinContainer__formInput form-floating mb-3">
                        <input type="password" className="form-control" id="password" name="password" onChange={onInputChange} placeholder="" required></input>
                        <label htmlFor="password">{t('signinPage.passwordPrompt')}</label>
                    </div>
                    <div className="signinContainer__formInput form-floating mb-3">
                        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={onInputChange} placeholder="" required></input>
                        <label htmlFor="confirmPassword">{t('signinPage.confirmPasswordPrompt')}</label>
                    </div>
                    <button type="submit" className="signinContainer__signinButton btn">{t('signinPage.signinButton')}</button>
                </form>
            </div>
        </body>
        </>
    )
}

export default SigninPage;