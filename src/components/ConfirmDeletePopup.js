import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup(props) {
  const isLoading = props.onLoading;

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(props.card)
  }

  return (
    <PopupWithForm name={'confirm-delete-form'} title={'Вы уверены?'} isOpen={props.isOpen}
    onClose={props.onClose} onSubmit={handleSubmit} onLoading={props.onLoading} card={props.card}>
      <div className={'popup__form-fieldset'}>
        <button type="submit"
                className={`popup__form-submit-button 
                ${isLoading&& 'popup__form-submit-button_inactive'}
                popup__form-submit-button_type_confirm-delete-form`}>
                {isLoading? 'Удаление...' : 'Да'}
        </button>
      </div></PopupWithForm>
  )
}

export default ConfirmDeletePopup