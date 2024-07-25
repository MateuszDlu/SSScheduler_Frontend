import { useTranslation } from "react-i18next";
import { json, useNavigate } from "react-router-dom";
import { FunctionComponent, useCallback, useState } from "react";
import axios from "axios";
import { LOCAL_HOST_API_URL } from "utilities/AppConstants";
import "../styles/schedulerPage.css"


const SchedulerPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [notificationMessage, setNotificationMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    return(
        <>
        <body>
            <head>
                <title>{t('scheduler.headTitle')}</title>
            </head>
            <div className="schedulerContainer">
                <div className="categoryContainer"><h1>Category 1</h1></div>
                <div className="categoryContainer"><h1>Category 2</h1></div>
                <div className="categoryContainer"><h1>Category 3</h1></div>
                <div className="categoryContainer"><h1>Category 4</h1></div>
                <div className="categoryContainer"><h1>Category 5</h1></div>
            </div>
        </body>
        </>
    )
}
export default SchedulerPage