'use client';

import { FormProvider } from 'react-hook-form';
import { FaCommentDots } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { MdDateRange } from 'react-icons/md';

import Dialog from '../Dialog';
import { TransactionProps } from '../History';
import InputTransactions from '../InputTransactions';
import SelectTransactions from '../SelectTransactions';
import TextAreaTransactions from '../TextAreaTransactions';

import { formatDateISOToBR } from '@/functions/formatDateISO';
import { toBRL } from '@/functions/toBRL';
import { useTransactionItem } from '@/hooks/useTransactionItem';

export default function TransactionItem(props: TransactionProps) {
  const {
    categoryIcon,
    categoryOptions,
    errors,
    formProps,
    handleCloseDialog,
    handleOpenDialog,
    handleTransaction,
    indicator,
    isDialogOpen,
    isHidden,
    loading,
    register,
    handleSubmit,
    titleDialog
  } = useTransactionItem(props);
  return (
    <div
      key={props._id}
      className={`${
        isHidden && 'hidden'
      } flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-2 md:gap-0 md:justify-between w-full p-3 px-2 md:px-5 border-2 items-center hover:bg-zinc-300 mx-auto border-zinc-500  rounded-2xl bg-zinc-50`}
    >
      <div className="flex items-center gap-2 md:gap-0 md:space-x-8">
        <div>{categoryIcon}</div>
        <div className="flex flex-col ml-2 space-y-2 text-transaction text-lg">
          <div className="flex items-center gap-2 flex-col md:flex-row">
            <div
              className={`${indicator} rounded-full w-3 h-3 self-end md:self-auto mr-2 md:mr-0`}
            ></div>
            <span className="font-semibold md:text-xl ">{props.title}</span>
          </div>
          <div className="flex md:flex-row flex-col md:space-x-4 md:whitespace-nowrap">
            <span>{toBRL(props.amount)}</span>
            <span className="flex items-center">
              <MdDateRange />
              {formatDateISOToBR(props.date)}
            </span>
            <span className="flex items-center gap-1">
              <FaCommentDots />
              {props.description}
            </span>
          </div>
        </div>
      </div>

      <div
        onClick={handleOpenDialog}
        className="sm:flex hidden items-center justify-center sm:mr-5 md:bg-teal-500 md:w-16 md:h-16 md:p-4 rounded-full text-white"
      >
        <FiPlus size={100} className="text-teal-500 md:text-white"></FiPlus>
      </div>
      <div className="sm:hidden flex justify-center md:justify-start">
        <button
          type="button"
          className="group relative flex items-center text-sm justify-center rounded-3xl bg-teal-400 py-2 px-3 font-semibold text-slate-500 hover:bg-teal-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleOpenDialog}
        >
          <div>
            <span className="text-base">+</span> Adicionar transação
          </div>
        </button>
      </div>

      {isDialogOpen && (
        <Dialog
          handleCloseDialog={handleCloseDialog}
          title={titleDialog}
          handleSubmit={handleSubmit(handleTransaction(props.type))}
          indicator={indicator}
          loading={loading}
        >
          <FormProvider {...formProps}>
            <form className="flex flex-col space-y-4">
              <InputTransactions
                {...register('title')}
                label="Titulo:"
                placeholder="Titulo do rendimento"
                autoComplete="title"
                type="text"
                error={errors.title}
              />
              <SelectTransactions
                {...register('category')}
                label="Categoria:"
                options={categoryOptions}
                error={errors.category}
              />
              <TextAreaTransactions
                {...register('description')}
                label="Descrição:"
                placeholder="Uma breve descrição"
                autoComplete=""
                error={errors.description}
              />
            </form>
          </FormProvider>
        </Dialog>
      )}
    </div>
  );
}
