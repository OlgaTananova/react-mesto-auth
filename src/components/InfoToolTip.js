import {useNavigate} from 'react-router-dom'

function InfoToolTip({isSuccess, openToolTip, closeToolTip}) {
  const navigate = useNavigate();

  function handleCloseButtonClick() {
    closeToolTip(false);
    isSuccess ? navigate('/') : navigate('/sign-up');
  }

  return (<div className={`popup ${openToolTip && 'popup_opened'}`}>
      <div className={'popup__container'}>
        <button type={'button'}
                className={`popup__close-button`}
                onClick={handleCloseButtonClick}
                aria-label={'Кнопка закрытия модального окна'}>{}</button>
        <div className={'popup__form popup__form_type_infotooltip'}>
          <div className={`popup__form-icon 
          ${isSuccess ? 'popup__form-icon_type_success' : 'popup__form-icon_type_fail'}`}>{}</div>
          <h2 className={'popup__form-heading popup__form-heading_type_infotooltip'}>
            {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
        </div>
      </div>
    </div>)

}

export default InfoToolTip