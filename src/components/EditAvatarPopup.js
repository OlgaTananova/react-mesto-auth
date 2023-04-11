import PopupWithForm from './PopupWithForm';
import useForm from '../utils/useForm';
import {useEffect, useMemo} from 'react';

function EditAvatarPopup({onLoading, isOpen, onUpdateAvatar, onClose}) {
  const isLoading = onLoading;
  const initialValues = useMemo(() => {
    return {link: ''}
  }, [])
  const avatar = useForm(initialValues);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatar.values.link);
  }

  useEffect(() => {
    !isOpen && avatar.resetForm();
  }, [isOpen])

  useEffect(()=>{
    if (!isOpen) return;
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return ()=>{
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen, onClose])

  return (<PopupWithForm name={'update-avatar-form'}
                         title={'Update avatar'}
                         isOpen={isOpen}
                         onClose={onClose}
                         onSubmit={handleSubmit}
                         isLoading={isLoading}
                         isValid={avatar.isValid}
                         defaultTitle={'Save'}
                         loadingTitle={'Saving...'}>
    <div className={'popup__form-fieldset'}>
      <input type="url"
             className="popup__form-item popup__form-item_type_avatar-link"
             name="link"
             onChange={avatar.handleChange}
             value={avatar.values.link}
             placeholder="Image link"
             id="avatar-link"
             required/>
      <span className={`popup__input-error popup__input-error_active
         avatar-link-error`}>{avatar.errors.link}</span>
    </div>
  </PopupWithForm>)
}

export default EditAvatarPopup
