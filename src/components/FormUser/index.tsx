'use client';
import React, { useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import FormInput from '@/components/FormInput';

import ExpenseCategories from '../ExpenseCategories';
import IncomeCategories from '../IncomeCategories';
import MediaPicker from '../MediaPicker';

import { expenseCategories, incomeCategories, setUser } from '@/features/User';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { z } from 'zod';
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schema = z
  .object({
    _id: z.string(),
    fullname: z
      .string({ required_error: 'Nome é obrigatório.' })
      .min(3, 'O nome deve conter no mínimo 3 letras.')
      .transform((fullname) =>
        fullname
          .trim()
          .split(' ')
          .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
          .join(' ')
      ),
    email: z
      .string({ required_error: 'Email é obrigatório.' })
      .email('email invalido')
      .toLowerCase(),
    incomeCategories: z.array(z.object({ incomeCategory: z.string().min(3, 'A categoria deve conter no mínimo 3 caracteres.').max(24, 'A categoria não pode conter mais de 24 caracteres')})),
    expenseCategories: z.array(z.object({ expenseCategory: z.string().min(3, 'A categoria deve conter no mínimo 3 caracteres.').max(24, 'A categoria não pode conter mais de 24 caracteres')})),
    avatar: z.instanceof(FileList)
      .refine(
        (files) => {
          if(files.length > 0){
            return ACCEPTED_IMAGE_TYPES.includes(files.item(0)?.type || '')
          }else{
            return true
          }

        },
        "Formato de imagem inválido"
      ).transform(files => {
        return files.item(0)!
      }),
  });

type FormPropsUpdate = z.infer<typeof schema>;

interface User {
  _id: string;
  fullname: string;
  email: string;
  avatar: string;
  expenseCategories: expenseCategories[];
  incomeCategories: incomeCategories[];
}
export default function FormUser(props: User) {
  const { _id, email, fullname, expenseCategories, incomeCategories, avatar} = props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const formProps = useForm<FormPropsUpdate>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      _id: _id,
      email: email,
      fullname: fullname,
      incomeCategories,
      expenseCategories
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = formProps;

  const {fields: fieldsExpense, append: appendExpense, remove: removeExpense } = useFieldArray({
    control,
    name: 'expenseCategories',
  })
  const {fields: fieldsIncome , append: appendIncome, remove: removeIncome } = useFieldArray({
    control,
    name: 'incomeCategories',
  })
  const handleUpdateAccount = async (data: FormPropsUpdate) => {
    try{
      setIsLoading(true);
      const formData = new FormData();
      formData.set("avatar", data.avatar);
      formData.set("fullname", data.fullname);
      formData.set("email", data.email);
      formData.set("_id", data._id);
      formData.set("expenseCategories", JSON.stringify(data.expenseCategories))
      formData.set("incomeCategories", JSON.stringify(data.incomeCategories))
      const { token } = await parseCookies();
      if(token){
        const upload = await fetch('/api/user', {
          method: 'PUT',
          mode: 'cors',
          headers: {Authorization: `Bearer ${token}`},
          body: formData
        })
        const data = await upload.json();
        if(data.status == 1){
          dispatch(setUser(data.user));
        }
      }
      setIsLoading(false)
    }catch(e){
      setIsLoading(false)
      console.error(e);
    }

  }
  return (
    <FormProvider {...formProps} >
              <form
                className="mt-5 space-y-4 text-black"
                onSubmit={handleSubmit(handleUpdateAccount)}
              >
                <FormInput
                  className="block border border-grey w-full p-3 rounded"
                  label="Nome completo:"
                  placeholder="Full Name"
                  autoComplete="nickname"
                  type="text"
                  {...register('fullname')}
                  error={errors.fullname}
                />
                <FormInput
                  className="block border border-grey w-full p-3 rounded"
                  label="Email:"
                  placeholder="Email"
                  autoComplete="email"
                  type="text"
                  {...register('email')}
                  error={errors.email}
                />
                <MediaPicker label='Foto:' register={register} name='avatar' avatar={avatar} error={errors.avatar}/>
                <IncomeCategories error={errors.incomeCategories} newCategories={fieldsIncome} append={appendIncome} remove={removeIncome} register={register}/>
                <ExpenseCategories error={errors.expenseCategories} newCategories={fieldsExpense} append={appendExpense} remove={removeExpense} register={register} />
                <button type='submit' disabled={isLoading} className=" flex w-full justify-center rounded-md bg-teal-500 py-2 px-3 text-sm font-semibold hover:text-slate-700 hover:bg-teal-4

                00 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >{isLoading ? 'Atualizando..' : 'Atualizar dados'}</button>
              </form>
            </FormProvider>
  )
}
