import { useTranslation } from "react-i18next";
import { json, useNavigate } from "react-router-dom";
import { FunctionComponent, useCallback, useState } from "react";
import axios from "axios";
import { LOCAL_HOST_API_URL } from "utilities/AppConstants";
import "../styles/schedulerPage.css"
import CategoryModel from "objects/CategoryModel";


const SchedulerPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [notificationMessage, setNotificationMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    let categories = Array<CategoryModel>

    //retrive data at page load

    return(
        <>
        <body>
            <head>
                <title>{t('scheduler.headTitle')}</title>
            </head>
            <div className="schedulerContainer">
                <div className="categoryContainer">
                    <h3 className="categoryContainer_name">Category 1</h3>
                    <div className="taskContainer">
                        <h4 className="taskContainer_taskTitle">task title task title task title</h4>
                        <h5 className="taskContainer_taskDescription">description description description description description description description</h5>
                        <h5 className="taskContainer_taskDeadline">Deadline: 01.01.2100</h5>
                    </div>
                </div>
            </div>
        </body>
        </>
    )
}
export default SchedulerPage