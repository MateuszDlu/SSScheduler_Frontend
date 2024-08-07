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


    if (categories.length === 0){
        return(<>
            <body>
                <head>
                    <title>{t('scheduler.headTitle')}</title>
                </head>
                <h2>{t('scheduler.noCategories')}</h2>
            </body>
            </>
        )
    }

    return(
        <>
        <body>
            <head>
                <title>{t('scheduler.headTitle')}</title>
            </head>
            <div className="schedulerContainer">
                {categories.map(category => (
                    <div className="categoryContainer" key={category.id}>
                        <h3 className="categoryContainer_name">{category.name}</h3>
                        {category.taskList.length > 0 ? (
                            category.taskList.map(task => (
                                <div className="taskContainer" key={task.id}>
                                    <h4 className="taskContainer_taskTitle">{task.title}</h4>
                                    <h5 className="taskContainer_taskDescription">{task.description}</h5>
                                    {task.deadline ? <h5 className="taskContainer_taskDeadline">
                                        {t('scheduler.deadline')}: {task.deadline.toLocaleDateString()}
                                    </h5> : null}
                                </div>
                            ))
                        ) : null}
                            <div className="taskContainer-addTask">
                                <h4 className="taskContainer_taskTitle-addTask">{t('scheduler.addTask')}</h4>
                            </div>
                    </div>
                ))}
                <div className="categoryContainer-addCategory">
                    <h3 className="categoryContainer_name-addCategory">{t('scheduler.addCategory')}</h3>
                </div>
            </div>
        </body>
        </>
    )
}
export default SchedulerPage


