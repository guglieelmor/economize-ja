import { FormPropsRegister } from '@/components/Register';

import { apiClient } from './api-client';

import { setCookie } from 'nookies';

export type FormPropsLogin = {
  email: string;
  password: string;
}
export async function signInRequest(data: FormPropsLogin) {
  const jwt = await apiClient('auth', 'POST', data);
  const auth = await jwt.json();
  auth.status == 1 &&
    setCookie(undefined, 'token', auth.token, {
      maxAge: 60 * 80 * 24 //one day
    });
  return auth;
}

export async function signUpRequest(data: FormPropsRegister) {
  const response = await apiClient('user', 'POST', data);
  const userData = await response.json();
  return userData;
}
