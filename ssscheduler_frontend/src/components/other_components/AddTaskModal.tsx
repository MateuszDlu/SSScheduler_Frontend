import React, { useCallback, useRef, useState } from 'react'
import '../../styles/modalsStyling.css'
import { X } from 'lucide-react'
import CategoryModel from 'objects/CategoryModel';
import { t } from 'i18next';
import { LOCAL_HOST_API_URL } from 'utilities/AppConstants';
import axios from 'axios';

interface AddTaskModalProps {
  categoryIdClicked: number;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ categoryIdClicked, onClose }) =>{

  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const closeModal = (e: React.MouseEvent) => {
    // Check if the click happened outside the modal content
    if (modalRef.current && modalRef.current === e.target) {
      onClose();
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    categoryId: categoryIdClicked,
  });

  function submitText(){
    if(isLoading)
      return "please wait"
    return "add task"
  }

  const onFormSubmit = useCallback(async (e: React.FormEvent) => {
    setNotificationMessage("");
      try {
        setIsLoading(true);
        axios.defaults.withCredentials = true;
        e.preventDefault();

        let formattedDeadline = formData.deadline;

        
        if (!formattedDeadline) {
          formattedDeadline = '';
        } else {
        const selectedDate = new Date(formData.deadline);
        const currentDate = new Date();
        if (selectedDate <= currentDate) {
          setNotificationMessage("Deadline must be in the future");
          setIsLoading(false);
          return;
        }
        formattedDeadline = selectedDate.toISOString(); // Convert to ISO format
      }

        let formCategoryData: FormData = new FormData();
        formCategoryData.append('title', formData.title);
        formCategoryData.append('description', formData.description || '');
        formCategoryData.append('deadline', formattedDeadline);
        formCategoryData.append('categoryId', String(formData.categoryId));

        let userInfo = sessionStorage.getItem("user")
        if(userInfo){
          const token = JSON.parse(userInfo).token;
          const response = await axios({
            method: 'post',
            url: `${LOCAL_HOST_API_URL}/task`,
            data: formCategoryData,
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            console.log('success')
            setIsLoading(false);
            onClose()
          }
        }
      } catch (exception) {
        setIsLoading(false);
        if(axios.isAxiosError(exception)){
          console.log(exception)
          setNotificationMessage("addCategoryModal.unknownError")
        }else{
          setNotificationMessage("somethingWentWrong")
        }
      }
  }, [formData]);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }));
  }, []);

  return (
    <div onClick={closeModal} className='addTaskContainer' ref={modalRef}>
        <div className='addTaskModal'>
          <button className='closeModalIcon btn' onClick={onClose}><X size={30}/></button>
          <div className='addTaskModal__content'>
            <h3 className='addTaskModal__content-prompt'>Add new task</h3>
            <form className='addTaskModal__content-form form' onSubmit={onFormSubmit} method="post">
              <div className="addTaskModal__formInput form-floating mb-3">
                <input type="text" className="form-control" id="title" name="title" placeholder="" onChange={onInputChange} required></input>
                <label htmlFor="title">title</label>
              </div>
              <div className="addTaskModal__formInput form-floating mb-3">
                <input type="text" className="form-control" id="description" name="description" placeholder="" onChange={onInputChange}></input>
                <label htmlFor="description">description</label>
              </div>
              <div className="addTaskModal__formInput form-floating mb-3">
                <input type="date" className="form-control" id="deadline" name="deadline" placeholder="" onChange={onInputChange}></input>
                <label htmlFor="descdeadlineription">deadline</label>
              </div>
              {notificationMessage && (
                <label className="addTaskModal__notification">
                  {t(notificationMessage)}
                </label>
              )}
              <button type="submit" className="addTaskModal__submitButton btn" disabled={isLoading}>{submitText()}</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default AddTaskModal