'use client';


import HeaderHome from '@/components/HeaderHome';
import Login from '@/components/Login';
import Register from '@/components/Register';

import { useSignInUp } from '@/hooks/useSignSignUp';

export default function Account() {

  const {
    typeForm,
    email,
    isLoading,
    changeForm,
    errorMessage,
    handleSignIn,
    handleSignUp,
    loginText
  } = useSignInUp();

  return (
    <>
      <HeaderHome></HeaderHome>
      <div className="flex items-center bg-gradient-blue justify-center px-6 md:px-0">
        {typeForm == 'login' && (
          <Login
            email={email}
            isLoading={isLoading}
            changeForm={changeForm}
            errorMessage={errorMessage}
            handleSignIn={handleSignIn}
            loginText={loginText}
          />
        )}
        {typeForm == 'register' && (
          <Register
            errorMessage={errorMessage}
            isLoading={isLoading}
            changeForm={changeForm}
            handleSignUp={handleSignUp}
          />
        )}
      </div>
    </>
  );
}
