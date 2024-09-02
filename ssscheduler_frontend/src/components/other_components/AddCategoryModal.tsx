import React, { useCallback, useRef, useState } from 'react'
import '../../styles/modalsStyling.css'
import { X } from 'lucide-react'
import CategoryModel from 'objects/CategoryModel';
import axios from 'axios';
import { LOCAL_HOST_API_URL } from 'utilities/AppConstants';
import { t } from 'i18next';

interface AddCategoryModalProps {
  onClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onClose }) =>{

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
    name: ""
  });

  function submitText(){
    if(isLoading)
      return "please wait"
    return "add category"
  }

  const onFormSubmit = useCallback(async (e: React.FormEvent) => {
    setNotificationMessage("");
        try {
            setIsLoading(true);
            axios.defaults.withCredentials = true;
            e.preventDefault();
            let formCategoryData: FormData = new FormData();
            formCategoryData.append('name', formData.name);
            let userInfo = sessionStorage.getItem("user")
            if(userInfo){
              formCategoryData.append('userId', JSON.parse(userInfo).user.id) 
              const token = JSON.parse(userInfo).token;
              const response = await axios({
                method: 'post',
                url: `${LOCAL_HOST_API_URL}/category`,
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
                if(exception.response?.status === 409)
                    setNotificationMessage("addCategoryModal.categoryNameNotUnique")
                else setNotificationMessage("addCategoryModal.unknownError")
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
          <h3 className='addTaskModal__content-prompt'>Add new category</h3>
          <form className='addTaskModal__content-form form' onSubmit={onFormSubmit} method="post">
            <div className="addTaskModal__formInput form-floating mb-3">
              <input type="text" className="form-control" id="name" name="name" placeholder="" onChange={onInputChange} required></input>
              <label htmlFor="name">name</label>
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

export default AddCategoryModal