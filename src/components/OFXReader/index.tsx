'use client';
import { CiImport } from 'react-icons/ci';

import TransactionItems from '../TransactionItems';

import { useOFXReader } from '@/hooks/useOFXReader';

export default function OFXReader() {
  const { handleFileChange, transactions, hiddenFileInput, handleClick } =
    useOFXReader();

  return (
    <div className="flex flex-col md:flex-row pt-8 md:space-x-4">
      <div className="bg-white border-2 flex-col items-center justify-center mb-4 md:mb-0 rounded-2xl border-zinc-300 md:w-1/4 px-6 py-8 h-max space-y-4">
        <h1 className="text-3xl font-bold md:whitespace-nowrap">
          OFX - Transações
        </h1>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".ofx"
          ref={hiddenFileInput}
        ></input>
        <button
          className=" bg-teal-400 hover:bg-teal-500 h-12 rounded-xl py-2 sm:py-0 sm:rounded-3xl text-white px-4 md:px-8 md:whitespace-nowrap flex items-center gap-2"
          onClick={handleClick}
        >
          Importar arquivo OFX <CiImport size={25} />
        </button>
      </div>
      <TransactionItems transactions={transactions} />
    </div>
  );
}

// const SkeletonOFX = () => {

//   return(
//     <div className="bg-skeleton animate-pulse border-2 flex-col items-center justify-center mb-4 md:mb-0 rounded-2xl border-zinc-300 md:w-1/4 px-6 py-8 h-max space-y-4"></div>
//   )
// }
