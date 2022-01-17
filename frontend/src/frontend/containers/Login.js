
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../actions';
import Header from '../components/Header';
import googleIcon from '../assets/static/google-icon.png';
import twitterIcon from '../assets/static/twitter-icon.png';

import '../assets/styles/components/Login.scss';

const Login = (props) => {
  const [form, setValues] = useState({
    email: '',
    id: '',
    name: '',
  });

  const handleInput = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.loginUser(form,'/');
  };

  return (
    <>
      <Header isLogin  />
      <section className='login'>
        <section className='login__container'>
          <h2>Inicia sesión</h2>
          <form className='login__container--form' onSubmit={handleSubmit}>
            <input
              name='email'
              className='input'
              type='text'
              placeholder='Correo'
              autoComplete='username'
              onChange={handleInput}
            />
            <input
              name='password'
              className='input'
              type='password'
              placeholder='Contraseña'
              autoComplete='current-password'
              onChange={handleInput}
            />
            <button type='submit' className='button'>Iniciar sesión</button>
   
          </form>
          <section className='login__container--social-media'>
            <div>
              <a href="/auth/google-oauth">
                <img className="" src={googleIcon} alt="Google" />
                Inicia sesión con google
              </a>
            </div>
            <div>
            <a href="/auth/twitter">
              <img className="" src={twitterIcon} alt="Twitter" />
              Inicia sesión con twitter
            </a>
            </div>
          </section>
          <p className='login__container--register'>
            No tienes ninguna cuenta
            {' '}
            {'  '}
            <Link to='/register'>Regístrate</Link>
          </p>
        </section>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  loginUser,
};

Login.propTypes = {
  loginUser: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(Login);
