import {useContext, useState} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card({card, onCardLike, onCardClick, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleConfirmDelete() {
    onCardDelete(card);
  }

  return ((<li className="element">
      <img className="element__image"
           onClick={handleClick}
           src={card.link}
           alt={`Photo: ${card.name}`}/>
      <div className="element__description">
        <h2 className="element__caption">{card.name}</h2>
        <div className="element__like-section">
          <button type="button"
                  onClick={onCardLike}
                  className={`element__like-button ${isLiked && 'element__like-button_active'}`}
                  aria-label="Like card button">{}</button>
          <span className="element__likes-qty">{card.likes.length}</span>
        </div>
      </div>
      <button type="button"
              onClick={handleConfirmDelete}
              className={`element__trash-button${isOwn ? '' : '_inactive'}`}
              aria-label="Delete card button">{}</button>
    </li>))
}

export default Card;
