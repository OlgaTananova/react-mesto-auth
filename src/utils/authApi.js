
    const baseUrl = 'https://mesto-backend-hec1.onrender.com';
    const headers = { "Content-Type": "application/json"}

    const checkResponse = ((response)=>{
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Error, error\'s status is ${response.status}`)
    })

  export const signUp = ((password, email)=>{
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "password" : password,
        "email": email
      })
    })
      .then(res=>checkResponse(res))
      })

  export const signIn = ((password, email)=> {
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "password": password,
        "email": email
      }),
      credentials: 'include',
    })
      .then(res=>checkResponse(res))})


 export const verifyUser = (()=>{
      return fetch(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      })
        .then(res=>checkResponse(res))})


