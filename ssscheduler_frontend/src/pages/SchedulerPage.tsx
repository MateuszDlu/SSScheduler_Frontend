import { useTranslation } from "react-i18next";
import { json, useNavigate } from "react-router-dom";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { LOCAL_HOST_API_URL } from "utilities/AppConstants";
import "../styles/schedulerPage.css"
import CategoryModel from "objects/CategoryModel";
import TaskModel from "objects/TaskModel";


const SchedulerPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [notificationMessage, setNotificationMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [categories, setCategories] = useState<Array<CategoryModel>>([]);

    const getUserInfoFromStorage = useCallback(() => {
        const userInfo = sessionStorage.getItem("user");
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            setUserId(parsedUserInfo.user.id);
            setToken(parsedUserInfo.token);
        }
    }, []);

    const fetchCategoriesByUserId = useCallback(async () => {
        setNotificationMessage("");
        if (userId === null || token === null) return;
        try {
            setIsLoading(true);
            const response = await axios({
                method: 'get',
                url: `${LOCAL_HOST_API_URL}/category/all-user/${userId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });
            if (response.status === 200) {
                const categoriesData = response.data.$values.map((category: any) => new CategoryModel(category.id, category.name));
                for (const category of categoriesData) {
                    category.taskList = await fetchTasksForCategory(category.id);
                }
                setCategories(categoriesData);
                console.log(categoriesData);
            }
        } catch (exception) {
            console.log(exception);
            if (axios.isAxiosError(exception) && exception.response?.status === 401) {
                setNotificationMessage('loginPage.wrongCredentials');
            } else {
                setNotificationMessage('somethingWentWrong');
            }
        } finally {
            setIsLoading(false);
        }
    }, [userId, token]);

    const fetchTasksForCategory = async (categoryId: number): Promise<Array<TaskModel>> => {
        try {
            const response = await axios({
                method: 'get',
                url: `${LOCAL_HOST_API_URL}/task/all-category/${categoryId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });
            if (response.status === 200) {
                return response.data.$values.map((task: any) => {
                    const deadline = task.deadline ? new Date(task.deadline) : null;
                    return new TaskModel(task.id, task.title, task.description, deadline);
                });
            }
        } catch (exception) {
            console.log(`Failed to fetch tasks for category ${categoryId}:`, exception);
        }
        return [];
    };

    //retrive data at page load
    useEffect(() => {
        getUserInfoFromStorage();
    }, [getUserInfoFromStorage]);

    useEffect(() => {
        fetchCategoriesByUserId();
    }, [userId, token, fetchCategoriesByUserId]);

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


