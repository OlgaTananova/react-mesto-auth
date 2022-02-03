import PopupWithForm from './PopupWithForm.js';
import useForm from '../utils/useForm';
import {useCallback} from 'react';

function AddPlacePopup(props) {
  const isLoading = props.onLoading;
  const isOpen = props.isOpen;
  const validation = useForm({name: '', link: ''});

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(validation.values.name, validation.values.link);
  }

  useCallback(()=> {
    !isOpen&& validation.resetForm();
  }, [isOpen, validation])


  return (
    <PopupWithForm name={'add-card-form'} title={'Новое место'} isOpen={props.isOpen}
                   onClose={props.onClose} onSubmit={handleSubmit}
                  onLoading={props.onLoading}>
      <div className={'popup__form-fieldset'}>
        <input type="text"
               className="popup__form-item popup__form-item_type_card-description"
               name="name"
               value={validation.values.name}
               onChange={validation.handleChange}
               placeholder="Название"
               id="card"
               minLength="2"
               maxLength="20"
               required/>
        <span className={`popup__input-error card-error
        popup__input-error_active`}>{validation.errors.name}</span>
        <input type="url"
               className="popup__form-item popup__form-item_type_image-link"
               name="link"
               value={validation.values.link}
               onChange={validation.handleChange}
               placeholder="Ссылка на картинку"
               id="link"
               required/>
        <span className={`popup__input-error link-error 
                       popup__input-error_active`}>{validation.errors.link}</span>
        <button type="submit"
                className={`popup__form-submit-button 
                ${(!validation.isValid || isLoading)&& 'popup__form-submit-button_inactive'} 
                popup__form-submit-button_type_add-card-form`}>
          {isLoading? 'Сохранение...' : 'Создать'}
        </button>
      </div></PopupWithForm>
  )
}

export default AddPlacePopup