import React from 'react';

import OFXReader from '@/components/OFXReader';

export default function Importations() {
  return (
    <div className="h-full w-full">
      <div className=" mx-10 lg:mx-auto lg:container h-max my-10">
        <div className="flex flex-col rounded-md p-6 border-2 border-zinc-400 bg-gradient-dark-blue pb-32 lg:w-full">
          <h1 className="text-teal-400 tracking-tight text-4xl font-semibold">
            Importações de extrato bancário
          </h1>
          <OFXReader />
        </div>
      </div>
    </div>
  );
}
