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
                <div className="categoryContainer">
                    <h3>Category 1</h3>
                    <div className="taskContainer">
                        <h4>task title</h4>
                        <h5>description description description description description description description</h5>
                        <h4>Deadline: 01.01.2100</h4>
                    </div>
                </div>
                <div className="categoryContainer"><h3>Category 2</h3></div>
                <div className="categoryContainer"><h3>Category 3</h3></div>
                <div className="categoryContainer"><h3>Category 4</h3></div>
                <div className="categoryContainer"><h3>Category 5</h3></div>
                <div className="categoryContainer"><h3>Category 5</h3></div>
                <div className="categoryContainer"><h3>Category 5</h3></div>
            </div>
        </body>
        </>
    )
}
export default SchedulerPage