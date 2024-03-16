import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FormPropsRegister } from '@/components/Register';

import { FormPropsLogin, signInRequest, signUpRequest } from '@/services/auth';

export const useSignInUp = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [loginText, setLoginText] = useState('Entrar');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [typeForm, setTypeForm] = useState(type);
  function changeForm() {
    setIsLoading(false);
    setErrorMessage('');
    if (typeForm == 'login') {
      router.push('/account?type=register');
    } else {
      router.push('/account?type=login');
    }
  }
  useEffect(() => {
    setTypeForm(type);
  }, [type]);
  function passwordIsValid(password: string, confirm_password: string) {
    if (!(password === confirm_password)) {
      setErrorMessage('different passwords!');
      return false;
    }

    if (password.length < 6) {
      setErrorMessage('password must contain at least 6 digits');
      return false;
    }

    return true;
  }

  async function handleSignIn(data: FormPropsLogin) {
    setIsLoading(true);
    setErrorMessage('');
    setLoginText('Aguarde...');
    const user = await signInRequest(data);
    if (user.status == 0) {
      setErrorMessage(user.message);
      setLoginText('Entrar');
      setIsLoading(false);
    }
    if (user.status === 1) {
      router.push('/app');
    }
  }

  async function handleSignUp(data: FormPropsRegister) {
    setIsLoading(true);
    const { password, confirm_password } = data;
    if (!passwordIsValid(password, confirm_password)) {
      setIsLoading(false);
      return;
    }
    const user = await signUpRequest(data);
    setIsLoading(false);
    if (user.status == 0) {
      setErrorMessage(user.message);
    }

    if (user.status === 1) {
      setErrorMessage('');
      setEmail(user.email);
      setTypeForm('login');
      router.push('/account?type=login');
    }
  }

  return {
    typeForm,
    email,
    isLoading,
    changeForm,
    errorMessage,
    handleSignIn,
    handleSignUp,
    loginText
  };
};
