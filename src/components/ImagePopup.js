
function ImagePopup(props) {

  return (
    <div className={`popup popup_type_image-view ${props.card? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_image-view">
        <button type="button" onClick={props.onClose}
                className="popup__close-button popup__close-button_type_image-view"
                aria-label="Кнопка закрытия модального окна просмотра фотографий">{}</button>
        <figure className="popup__image-container">
          <img src={props.card? props.card.link : ''}
               alt={props.card? props.card.name : ''}
               className="popup__image"/>
          <figcaption className="popup__image-caption">{props.card? props.card.name : ''}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;