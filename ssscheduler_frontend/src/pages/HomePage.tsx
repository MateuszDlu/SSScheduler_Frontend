import React from "react";
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom";


const HomePage = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    return(
        <>
        <head>
            <title>{t('homePage.headTitle')}</title>
        </head>
        <h1>{t('homePage.headTitle')}</h1>
        </>
    )
}
export default HomePage