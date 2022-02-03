
import useForm from '../utils/useForm';
import Header from './Header';

function Login({isLoading, isLoggedIn, onLogin}) {
  const {values, errors, isValid, handleChange, resetForm} = useForm({
    email: "",
    password: ""
  })

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.password, values.email, resetForm)
  }

  return (<>
    <Header isLoggedIn={isLoggedIn}
            email={''}
            needToRegister={false}/>
    <form className={'auth-form'}
          name={'authorization-form'}
          noValidate={true}
          onSubmit={handleSubmit}>
      <h2 className={'auth-form__heading'}>Вход</h2>
      <input className={'auth-form__input'}
             type={'email'}
             name={'email'}
             placeholder={'Email'}
             required={true}
             onChange={handleChange}
             value={values.email}/>
      <span className={'auth-form__input-error'}>{errors.email}</span>
      <input className={'auth-form__input'}
             type={'password'}
             name={'password'}
             placeholder={'Пароль'}
             required={true}
             onChange={handleChange}
             value={values.password}
             minLength={'8'}/>
      <span className={'auth-form__input-error'}>{errors.password}</span>
      <button type={'submit'}
              className={`auth-form__submit-button
              ${(!isValid || isLoading) && 'auth-form__submit-button_inactive'}`}>
        {(!isLoading) ? 'Войти' : 'Вход...'}
      </button>
    </form>
  </>)
}

export default Login


