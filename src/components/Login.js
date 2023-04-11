
import useForm from '../utils/useForm';
import {useMemo} from 'react';

function Login({isLoading, onLogin}) {
  const initialValues = useMemo(()=>{return {email: "", password: ""}},[]);
  const {values, errors, isValid, handleChange} = useForm(initialValues);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.password, values.email)
  }

  return (<div className={'auth page__auth'}>
    <form className={'auth-form'}
          name={'authorization-form'}
          noValidate={true}
          onSubmit={handleSubmit}>
      <h2 className={'auth-form__heading'}>Log in</h2>
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
             placeholder={'Password'}
             required={true}
             onChange={handleChange}
             value={values.password}
             minLength={8}/>
      <span className={'auth-form__input-error'}>{errors.password}</span>
      <button type={'submit'}
              className={`auth-form__submit-button
              ${(!isValid || isLoading) && 'auth-form__submit-button_inactive'}`}>
        {(!isLoading) ? 'Log in' : 'Logging...'}
      </button>
    </form>
  </div>)
}

export default Login


