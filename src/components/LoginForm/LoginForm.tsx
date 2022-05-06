import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LoginFormDataType } from '../../types';
import Login from './Fields/Login';
import Password from './Fields/Password';

import cl from './LoginForm.module.scss';

interface LoginFormProps {
  submitData: (data: LoginFormDataType) => void;
}

const LoginForm = ({ submitData }: LoginFormProps) => {
  const {
    formState,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormDataType>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<LoginFormDataType> = (data) => {
    const userData = {
      login: data.login,
      password: data.password,
    };

    submitData(userData);
    reset();
  };

  useEffect(() => {
    if (formState.errors.login) {
      toast.error(errors.login?.message);
    }
    if (formState.errors.password) {
      toast.error(errors.password?.message);
    }
  }, [formState.isSubmitting]);

  return (
    <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <Login register={register} />
      <Password register={register} />
      <button className={cl.submit}>Войти</button>
      <hr className={cl.selector} />
      <Link to="/signup">Зарегистрировать аккаунт</Link>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </form>
  );
};

export default LoginForm;
