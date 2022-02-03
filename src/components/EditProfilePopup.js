import PopupWithForm from './PopupWithForm';
import {useCallback, useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import useForm from '../utils/useForm';

function EditProfilePopup (props) {
  const isLoading = props.onLoading;
  const isOpen = props.isOpen;
  const currentUser = useContext(CurrentUserContext);
  const validation = useForm(currentUser);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(validation.values.name, validation.values.about)
  }

  useCallback(()=>{
    if (isOpen) {
      validation.setValues({...validation.values, name: currentUser.name, about: currentUser.about});
    } else {
      validation.resetForm()
    }
  }, [isOpen, currentUser, validation])

  return (
    <PopupWithForm name={'edit-profile-form'} title={'Редактировать профиль'} isOpen={props.isOpen}
                   onClose={props.onClose} onSubmit={handleSubmit} onLoading={props.onLoading}>
      <div className={'popup__form-fieldset'}>
        <input type="text"
               className="popup__form-item popup__form-item_type_profile-name"
               name="name"
               value={validation.values.name}
               onChange={validation.handleChange}
               placeholder="Имя"
               id="nameInput"
               minLength="2"
               maxLength="40"
               required/>
        <span className={`popup__input-error name-input-error 
        popup__input-error_active`}>{validation.errors.name}</span>
        <input type="text"
               className="popup__form-item popup__form-item_type_profile-description"
               name="about"
               value={validation.values.about}
               onChange={validation.handleChange}
               placeholder="Род занятий"
               id="about-input"
               minLength="2"
               maxLength="200"
               required/>
        <span className={`popup__input-error description-input-error
       popup__input-error_active`}>{validation.errors.about}</span>
        <button type="submit"
                className={`popup__form-submit-button 
                popup__form-submit-button_type_edit-profile-form
                ${(!validation.isValid || isLoading)&& 'popup__form-submit-button_inactive'}`}
                >
          {isLoading? "Сохранение...": "Сохранить"}
        </button>
      </div> </PopupWithForm>
  )
}

export default EditProfilePopup