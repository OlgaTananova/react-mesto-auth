function PopupWithForm({
                         name,
                         title,
                         isOpen,
                         onClose,
                         onSubmit,
                         isValid,
                         isLoading,
                         children,
                       }) {
  function SubmitButton() {
    if (name === 'confirm-delete-form') {
      return (<button type="submit"
                      className={`popup__form-submit-button 
                ${isLoading && 'popup__form-submit-button_inactive'}
                popup__form-submit-button_type_${name}`}
                      disabled={isLoading}>
          {isLoading ? 'Удаление...' : 'Да'}
        </button>)
    } else if (name === 'add-card-form') {
      return (<button type={'submit'}
                      className={`popup__form-submit-button 
                ${(!isValid || isLoading) && 'popup__form-submit-button_inactive'} 
                popup__form-submit-button_type_${name}`}
                      disabled={isLoading || !isValid}>
          {isLoading ? 'Сохранение...' : 'Создать'}</button>)
    }
    return (<button type={'submit'}
                    className={`popup__form-submit-button 
                ${(!isValid || isLoading) && 'popup__form-submit-button_inactive'} 
                popup__form-submit-button_type_${name}`}
                    disabled={isLoading || !isValid}>
        {isLoading ? 'Сохранение...' : 'Сохранить'}</button>)
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button"
                onClick={onClose}
                className={`popup__close-button popup__close-button_type_${name}`}
                aria-label={`Кнопка закрытия модального окна ${title}`}>{}</button>
        <form className={`popup__form popup__form_type_${name}`}
              onSubmit={onSubmit}
              name={name}
              id={name}
              noValidate>
          <h2 className={`popup__form-heading ${name === 'update-avatar-form' ? 'popup__form-heading_type_update-avatar-form' : ''}`}>{title}</h2>
          {children}
          <SubmitButton/>
        </form>
      </div>
    </div>)
}

export default PopupWithForm;