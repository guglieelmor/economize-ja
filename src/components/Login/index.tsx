import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import ErrorMessage from '../ErrorMessage';
import FormInput from '../FormInput';

import { LockClosedIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type Login = {
  handleSignIn: (data: FormPropsLogin) => Promise<void>;
  errorMessage: string;
  loginText: string;
  changeForm: () => void;
  isLoading: boolean;
  email: string;
};
const schema = z.object({
  email: z
    .string({ required_error: 'Email é obrigatório.' })
    .email('email invalido'),
  password: z
    .string({ required_error: 'Senha é obrigatório.' })
    .min(6, 'A senha precisa ter no minímo 6 caracteres.')
});

type FormPropsLogin = z.infer<typeof schema>;
export default function Login(props: Login) {
  const {
    handleSignIn,
    errorMessage,
    loginText,
    changeForm,
    isLoading,
    email
  } = props;
  const formProps = useForm<FormPropsLogin>({
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema)
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = formProps;

  useEffect(() => {
    const input = document.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;
    if (input && email.length > 0) {
      setValue('email', email);
      input.focus();
    }
  }, [email]);
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-gradient-dark-blue p-8 sm:p-16 rounded-md space-y-7">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/PriceHouse.ico"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Entrar na sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-white">
            Ou{' '}
            <a
              onClick={changeForm}
              className="font-medium cursor-pointer text-teal-500 hover:text-teal-400"
            >
              registre uma nova conta
            </a>
          </p>
        </div>
        <FormProvider {...formProps}>
          <form
            className="mt-8 space-y-5"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <div className="space-y-2 rounded-md shadow-sm">
              <FormInput
                {...register('email')}
                type="email"
                autoComplete="email"
                className={`border ring-gray-300 ring-1 border-grey-300 py-1.5 text-gray-900
                  p-1.5 placeholder:text-gray-400 focus:z-10
                  sm:text-sm sm:leading-6 relative block w-full rounded-md`}
                placeholder="Seu email"
                error={errors.email}
              />
              <FormInput
                {...register('password')}
                type="password"
                autoComplete="current-password"
                className={` border ring-gray-300 ring-1 border-grey-300 py-1.5 text-gray-900
                  p-1.5 placeholder:text-gray-400 focus:z-10
                  sm:text-sm sm:leading-6 relative block w-full rounded-md`}
                placeholder="Sua senha"
                error={errors.password}
              />
              {errorMessage && (
                <ErrorMessage
                  errorMessage={{ message: errorMessage }}
                ></ErrorMessage>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center items-center text-gray-900 rounded-md bg-teal-400 disabled:bg-teal-600 py-2 px-3 text-sm font-semibold
                          enabled:hover:bg-teal-500 enabled:hover:text-black focus-visible:outline focus-visible:outline-2
                          focus-visible:outline-offset-2 disabled:cursor-not-allowed focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
               {
                  isLoading ?
                    <div className="flex items-center justify-center transform translate-x-1/2 ">
                      <div className="border-t-transparent border-solid animate-spin rounded-full border-white border-2 h-4 w-4"></div>
                    </div>
                    :
                    <>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <LockClosedIcon
                          className="h-5 w-5 text-black "
                          aria-hidden="true"
                        />
                      </span>
                      {loginText}
                    </>
                }
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
