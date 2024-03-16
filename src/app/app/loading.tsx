
export default function Loading() {
  return (
  <div className="h-full w-full">
      <div className=" md:mx-10 lg:mx-auto lg:container h-max my-10">
        <div className="flex flex-col pb-5 px-2">
          <SkeletonWelcome />
          <span className="text-xl text-zinc-400">
            Confira seus rendimentos
          </span>
        </div>
        <div className="flex flex-col rounded-md p-6 border-2 border-zinc-400 bg-gradient-dark-blue pb-32 lg:w-full">
          <h1 className="text-teal-400 tracking-tight text-4xl font-semibold">
            Todas as transações
          </h1>
          <div className="flex text-white flex-col space-y-4 md:space-x-8 md:flex-row justify-between mt-5 ">
            <SkeletonTransactions />
            <div className="flex flex-col w-full">
              <SkeletonHistory />
              <SkeletonSalary />
              <SkeletonExpense />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SkeletonWelcome = () => {
  return(
    <h1 className="text-2xl text-white font-bold bg-skeleton animate-pulse w-64 h-8 mb-2">
  </h1>
  )
}

const SkeletonTransactions = () => {
  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="dash h-80 border-white border-2 rounded">
        <SkeletonDashboard />
      </div>
      <div className="flex space-x-4 ">
        <SkeletonTot></SkeletonTot>
        <SkeletonTot></SkeletonTot>
      </div>
      <SkeletonContentTotValue />
    </div>
  );
}

const SkeletonDashboard = () => {
  return(
    <div className="bg-skeleton h-full w-full animate-pulse"></div>
  )
}

const SkeletonTot = () => {
  return(
      <div
      className={`flex flex-col md:flex-row p-4 py-6 items-center border-2 w-full justify-center animate-pulse bg-skeleton border-zinc-300 text-center  text-transaction rounded-md`}
      >
        <span className={'text-xl md:text-2xl font-bold text-transaction'}>
        </span>
        <span className={'text-2xl px-1 md:text-4xl text-red-600 font-semibold'}>

        </span>
      </div>
  )
}

const SkeletonContentTotValue = () => {

  return(
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col py-6 px-32 border-2 w-32 border-zinc-300 bg-skeleton animate-pulse h-8 text-transaction rounded-md">
        <span
          className={'text-xl md:text-2xl font-bold text-transaction text-center'}
        >
        </span>{' '}
        <span
          className={`text-2xl px-10 md:text-4xl font-semibold`}
        >
        </span>
      </div>
  </div>
  )
}

const SkeletonHistory = () => {
  return(
    <div className="flex justify-between w-full p-3 border-2 mx-auto border-zinc-500 h-12  rounded-2xl bg-skeleton animate-pulse">
      <span className="text-base md:text-2xl font-medium text-red-600">
      </span>
      <span className="text-base md:text-2xl font-bold whitespace-nowrap text-red-700">
      </span>
    </div>
  )
}

const SkeletonSalary = () => {
  return(
    <>
    <div className="text-violet-300 flex justify-between text-xl items-center">
      <span>Minímo</span>
      <span className="text-3xl font-semibold">Ganhos</span>
      <span>Máximo</span>
    </div>
    <div className="flex flex-col py-4 space-y-2">
      <div className="flex justify-between w-full p-3 border-2 mx-auto border-zinc-500  rounded-2xl bg-skeleton animate-pulse">
        <span className="text-base md:text-2xl font-bold whitespace-nowrap text-transaction h-8 w-32">
        </span>
        <span className="text-base md:text-2xl font-bold whitespace-nowrap text-transaction h-8 w-32">
        </span>
      </div>
    </div>
  </>
  )
}

const SkeletonExpense = () => {
  return(
    <>
    <div className="text-violet-300 flex justify-between text-xl items-center">
      <span>Minímo</span>
      <span className="text-3xl font-semibold">Ganhos</span>
      <span>Máximo</span>
    </div>
    <div className="flex flex-col py-4 space-y-2">
      <div className="flex justify-between w-full p-3 border-2 mx-auto border-zinc-500  rounded-2xl bg-skeleton animate-pulse">
        <span className="text-base md:text-2xl font-bold whitespace-nowrap text-transaction h-8 w-32">
        </span>
        <span className="text-base md:text-2xl font-bold whitespace-nowrap text-transaction h-8 w-32">
        </span>
      </div>
    </div>
  </>
  )
}
