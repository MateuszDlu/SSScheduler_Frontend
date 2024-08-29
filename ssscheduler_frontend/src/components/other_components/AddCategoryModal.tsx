import React, { useCallback, useRef, useState } from 'react'
import '../../styles/modalsStyling.css'
import { X } from 'lucide-react'
import CategoryModel from 'objects/CategoryModel';

interface AddCategoryModalProps {
  onClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onClose }) =>{

  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

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
              <button type="submit" className="addTaskModal__submitButton btn" disabled={isLoading}>{submitText()}</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default AddCategoryModal