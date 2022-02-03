import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import {useEffect, useState} from 'react';
import ImagePopup from './ImagePopup.js';
import {api} from '../utils/api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import {
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';
import * as authApi from '../utils/authApi'
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoToolTip';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false)
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupState] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditAvatarLoading, setEditAvatarLoading] = useState(false)
  const [isEditProfileLoading, setEditProfileLoading] = useState(false);
  const [isAddPlaceLoading, setAddPlaceLoading] = useState(false);
  const [isConfirmDeleteLoading, setConfirmDeleteLoading] = useState(false);
  const [isRegisterLoading, setRegisterLoading] = useState(false);
  const [isLoginLoading, setLoginLoading] = useState(false);
  const [deletedCard, setDeletedCard] = useState(null);
  const [editProfilePopupEstablished, setEditProfilePopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isRegisterSuccessful, setRegisterSuccessful] = useState(false);
  const [isInfoToolTipOpened, setInfoToolTipOpened] = useState(false);
  const navigate = useNavigate();


  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupState(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupState(true);
  }

  function closeAllPopups() {
    setAddPlacePopupState(false);
    setEditProfilePopupState(false);
    setEditAvatarPopupState(false);
    setConfirmDeletePopupState(false);
    setInfoToolTipOpened(false);
    setSelectedCard(null);
    setDeletedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(name, description) {
    setEditProfileLoading(true)
    api.editProfile({name, description})
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setEditProfileLoading(false);
      })
  }

  function handleUpdateAvatar(avatar) {
    setEditAvatarLoading(true);
    api.updateUserAvatar(avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setEditAvatarLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.likeCard(card._id)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => {
          console.log(err)
        });
    } else {
      api.dislikeCard(card._id)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  function handleCardDeleteSubmit(card) {
    setConfirmDeleteLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => {
          return cards.filter(c => {
            return c._id !== card._id
          });
        });
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setConfirmDeleteLoading(false);
      })
  }

  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data)
        setEditProfilePopup(true); // Отрисовываем попап, когда загружены данные с сервера
        // о пользователе
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data)
      })
      .catch(err => {
        console.log(err);
      })
  }, []);


  function handleAddPlaceSubmit(name, link) {
    setAddPlaceLoading(true);
    api.addNewCard({name, link})
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setAddPlaceLoading(false);
      })
  }

  function handleConfirmCardDelete(card) {
    setConfirmDeletePopupState(true);
    setDeletedCard(card);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return
    }
    authApi.verifyUser(jwt)
      .then((data) => {
        setEmail(data.data.email);
        setIsLoggedIn(true)
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    isLoggedIn ? navigate('/') : navigate('/sign-in')
  }, [isLoggedIn])


  useEffect(() => {
    tokenCheck();
  }, [])

  function onLogin(password, email, resetForm) {
    setLoginLoading(true);
    authApi.signIn(password, email)
      .then((data) => {
        const jwt = data.token;
        localStorage.setItem('jwt', jwt);
        setIsLoggedIn(true);
        setEmail(email);
        resetForm();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoginLoading(false);
      })
  }

  function onRegister(password, email, resetForm) {
    setRegisterLoading(true);
    authApi.signUp(password, email)
      .then((data) => {
        setEmail(data.data.email);
        resetForm();
        setInfoToolTipOpened(true);
        setRegisterSuccessful(true);
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipOpened(true);
        setRegisterSuccessful(false);
      })
      .finally(() => {
        setRegisterLoading(false);
      })
  }

  function onLogOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path={'/'} element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <><Header isLoggedIn={isLoggedIn}
                                      email={email || ''}
                                      needToRegister={false}
                                      onLogOut={onLogOut}/>
                              <Main onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    cards={cards}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleConfirmCardDelete}/>
                              <Footer/>
                              {editProfilePopupEstablished &&
                              <EditProfilePopup isOpen={isEditProfilePopupOpen}
                                                onClose={closeAllPopups}
                                                onUpdateUser={handleUpdateUser}
                                                onLoading={isEditProfileLoading}/>}
                              <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                                               onClose={closeAllPopups}
                                               onUpdateAvatar={handleUpdateAvatar}
                                               onLoading={isEditAvatarLoading}/>
                              <AddPlacePopup isOpen={isAddPlacePopupOpen}
                                             onClose={closeAllPopups}
                                             onAddPlace={handleAddPlaceSubmit}
                                             onLoading={isAddPlaceLoading}/>
                              <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen}
                                                  onClose={closeAllPopups}
                                                  onLoading={isConfirmDeleteLoading}
                                                  card={deletedCard}
                                                  onSubmit={handleCardDeleteSubmit}/>
                              <ImagePopup card={selectedCard}
                                          onClose={closeAllPopups}/>
                            </></ProtectedRoute>}/>
          <Route path={'/sign-up'} element={<Register
            isLoading={isRegisterLoading}
            onRegister={onRegister}/>}
            isLoggedIn={isLoggedIn}/>
          <Route path={'/sign-in'} element={<Login
            onLogin={onLogin}
            isLoggedIn={isLoggedIn}
            isLoading={isLoginLoading}/>}/>
        </Routes>
        <InfoToolTip
        isSuccess={isRegisterSuccessful}
        openToolTip={isInfoToolTipOpened}
        closeToolTip={closeAllPopups}/>
      </CurrentUserContext.Provider>
    )
}

export default App;
