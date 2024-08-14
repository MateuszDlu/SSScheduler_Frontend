import React, { useCallback, useRef, useState } from 'react'
import '../../styles/modalsStyling.css'
import { X } from 'lucide-react'
import CategoryModel from 'objects/CategoryModel';

interface AddTaskModalProps {
  categorieIdClicked: number;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ categorieIdClicked, onClose }) =>{

  const modalRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = (e: any) => {
    if(modalRef.current === e.target){
      onClose();
    }
  }

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: new Date(),
    categoryId: categorieIdClicked,
  });

  function submitText(){
    if(isLoading)
      return "please wait"
    return "add task"
  }

  const onFormSubmit = useCallback(async (e: React.FormEvent) => {

  }, [formData]);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }));
  }, []);

  return (
    <div onClick={closeModal} className='addTaskContainer'>
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
              <button type="submit" className="addTaskModal__submitButton btn" disabled={isLoading}>{submitText()}</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default AddTaskModal