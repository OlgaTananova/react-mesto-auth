import {Link} from 'react-router-dom';
import useForm from '../utils/useForm';
import {useMemo} from 'react';

function Register({isLoading, onRegister}) {
  const initialValues = useMemo(()=>{return {email: '', password: ''}},[]);
  const {values, errors, isValid, handleChange} = useForm(initialValues);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values.password, values.email);
  }

  return (<div className={'auth page__auth'}>
    <form className={'auth-form'}
          name={'registration-form'}
          noValidate={true}
          onSubmit={handleSubmit}>
      <h2 className={'auth-form__heading'}>Sign up</h2>
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
             minLength={'8'}/>
      <span className={'auth-form__input-error'}>{errors.password}</span>
      <button type={'submit'}
              className={`auth-form__submit-button 
                ${(!isValid || isLoading) && 'auth-form__submit-button_inactive'}`}>
        {(!isLoading) ? 'Sign up' : 'Signing up...'}
      </button>
      <p className={'auth-form__signin-link'}> Have you already had an account?
        <Link to={'/sign-in'}
              className={'auth-form__signin-link ' + 'auth-form__signin-link_active'}>Log in</Link>
      </p>
    </form>
  </div>)
}

export default Register
