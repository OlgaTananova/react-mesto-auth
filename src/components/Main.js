import Card from './Card.js';
import {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({onCardDelete, onCardClick, onCardLike, cards, onEditProfile, onEditAvatar, onAddPlace}) {
  const currentUser = useContext(CurrentUserContext);

  return (<main className="content page__content">
      <section className="profile content__profile">
        <div className="profile__avatar-container"
             onClick={onEditAvatar}>
          <img className="profile__avatar"
               src={currentUser.avatar}
               alt="Avatar"/></div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button type="button"
                  className="profile__edit-button"
                  aria-label="Edit profile button"
                  onClick={onEditProfile}>{}</button>
        </div>
        <button type="button"
                className="profile__add-button"
                aria-label="Add card button"
                onClick={onAddPlace}>{}</button>
      </section>
      <section className="elements-section content__elements-section"
               aria-label="Photo grid">
        <ul className="elements">
          {cards.map(item => <Card key={item._id}
                                         card={item}
                                         onCardClick={onCardClick}
                                         onCardLike={() => onCardLike(item)}
                                         onCardDelete={() => onCardDelete(item)}/>)}
        </ul>
      </section>
    </main>)
}

export default Main
