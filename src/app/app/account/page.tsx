'use client';
import React from 'react'

import FormUser from '@/components/FormUser';

import { useStoreSelector } from '@/hooks/useStoreSelector'

const supabaseURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/poupa-mais`;
export default function Account() {

  const user = useStoreSelector((store) => store.User);
  return (
    <div className="h-full w-full">
      <div className=" md:mx-10 lg:mx-auto lg:container h-max my-10">
        <div className="flex flex-col rounded-md p-6 border-2 border-zinc-400 bg-gradient-dark-blue pb-32 lg:w-full  transition-width">
          <h1 className="text-teal-400 tracking-tight text-4xl font-semibold">
          Configurações da conta
          </h1>
          <div className="grid grid-cols-2 text-white">
            <div className="flex flex-col p-5 items-center space-y-2">
              <img
                    className="rounded-full w-[350px] h-[350px] border-2 border-teal-500 mb-8"
                    src={`${supabaseURL}/${user.avatar}`}
                    alt=""
                    width={475}
                    height={475}
              />
              <div className="text-4xl w-full">
                {user.fullname}
              </div>
              <div className='flex flex-col space-y-2 w-full'>
                <span>Email: {user.email}</span>
              </div>
            </div>
            <div className="flex flex-col">
            {user.id !== '' &&
              <FormUser
                _id={user.id}
                avatar={user.avatar}
                email={user.email}
                fullname={user.fullname}
                expenseCategories={user.expenseCategories}
                incomeCategories={user.incomeCategories}
              />
            }
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
