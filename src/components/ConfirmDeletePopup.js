import PopupWithForm from './PopupWithForm';
import {useEffect} from 'react';

function ConfirmDeletePopup({isOpen, onSubmit, onLoading, onClose, card}) {

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(card)
  }

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

  return (<PopupWithForm name={'confirm-delete-form'}
                         title={'Are you sure?'}
                         isOpen={isOpen}
                         onClose={onClose}
                         onSubmit={handleSubmit}
                         isLoading={onLoading}
                         defaultTitle={'Yes'}
                         loadingTitle={'Deleting...'}
                         card={card}>
      <div className={'popup__form-fieldset'}>{}</div>
    </PopupWithForm>)
}

export default ConfirmDeletePopup
