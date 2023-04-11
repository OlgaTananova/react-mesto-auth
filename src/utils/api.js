/*** Api Class to fetch data ***/

class Api {
  constructor({baseURL}) {
    this._URL = baseURL;
  }

  _handleError(res, errorText) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${errorText}. Error status: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._URL + '/users/me', {
      method: 'GET', headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        return this._handleError(res, 'Error, loading of the user\'s data has failed');
      });
  }


  getInitialCards() {
    return fetch(this._URL + '/cards', {
      method: 'GET', headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then(res => {
        return this._handleError(res, 'Error, loading of the cards has failed.')
      });
  }

  editProfile({name, description}) {
    return fetch(this._URL + '/users/me', {
      method: 'PATCH', headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name, about: description
      })
    })
      .then(res => {
        return this._handleError(res, 'Error, updating of the user\'s profile has failed.')
      });
  }

  updateUserAvatar(avatarLink) {
    return fetch(this._URL + '/users/me/avatar', {
      method: "PATCH", headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(res => {
        return this._handleError(res, 'Error, updating of the user\'s avatar has failed.')
      });
  }

  addNewCard({name, link}) {
    return fetch(this._URL + '/cards', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name, link: link
      })
    })
      .then(res => {
        return this._handleError(res, 'Error, adding of the card has failed.')
      });
  }

  deleteCard(cardId) {
    return fetch(this._URL + '/cards/' + cardId, {
      method: 'DELETE', headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => {
        return this._handleError(res, 'Error, deleting of the card has failed.')
      });
  }

  likeCard(cardId) {
    return fetch(this._URL + '/cards/' + cardId + '/likes/', {
      method: 'PUT', headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => {
        return this._handleError(res, 'Error, putting a like of the card has failed.')
      });
  }

  dislikeCard(cardId) {
    return fetch(this._URL + '/cards/' + cardId + '/likes/', {
      method: 'DELETE', headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => {
        return this._handleError(res, 'Error, disliking of the card has failed.')
      });
  }

  logout() {
    return fetch(`${this._URL}/signout`, {
      method: "POST", headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then((res) => {
        return this._handleError(res, 'Error, logging-out has failed.')
      })
  }
}
//API class instance
export const api = new Api({
  baseURL: 'https://mesto-backend-hec1.onrender.com'
})
