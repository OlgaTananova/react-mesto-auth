import PopupWithForm from './PopupWithForm';
import useForm from '../utils/useForm';
import {useCallback} from 'react';

function EditAvatarPopup(props) {
  const isLoading = props.onLoading;
  const isOpen = props.isOpen;
  const avatar = useForm({link: ''});

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatar.values.link);
  }

  useCallback(()=>{
    !isOpen&& avatar.resetForm();
  }, [isOpen, avatar])

  return (<PopupWithForm name={'update-avatar-form'}
                         title={'Обновить аватар'}
                         isOpen={props.isOpen}
                         onClose={props.onClose}
                         onSubmit={handleSubmit}
                         onLoading={props.onLoading}>
      <div className={'popup__form-fieldset'}>
        <input type="url"
               className="popup__form-item popup__form-item_type_avatar-link"
               name="link"
               onChange={avatar.handleChange}
               value={avatar.values.link}
               placeholder="Ссылка на картинку"
               id="avatar-link"
               required/>
        <span className={`popup__input-error popup__input-error_active
         avatar-link-error`}>{avatar.errors.link}</span>
        <button type="submit"
                className={`popup__form-submit-button
                ${(!avatar.isValid || isLoading)&& 'popup__form-submit-button_inactive'}
                popup__form-submit-button_type_update-avatar-form`}>
          {isLoading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>
    </PopupWithForm>)
}

export default EditAvatarPopup