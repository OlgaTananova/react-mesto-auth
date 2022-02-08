import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({isOpen, onSubmit, onLoading, onClose, card}) {

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(card)
  }

  return (<PopupWithForm name={'confirm-delete-form'}
                         title={'Вы уверены?'}
                         isOpen={isOpen}
                         onClose={onClose}
                         onSubmit={handleSubmit}
                         isLoading={onLoading}
                         defaultTitle={'Да'}
                         loadingTitle={'Удаление...'}
                         card={card}>
      <div className={'popup__form-fieldset'}>{}</div>
    </PopupWithForm>)
}

export default ConfirmDeletePopup