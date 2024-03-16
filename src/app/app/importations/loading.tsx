


export default function Loading() {
  return (
    <div className="h-full w-full">
      <div className=" mx-10 lg:mx-auto lg:container h-max my-10">
        <div className="flex flex-col rounded-md p-6 border-2 border-zinc-400 bg-gradient-dark-blue pb-32 lg:w-full">
          <h1 className="text-teal-400 tracking-tight text-4xl font-semibold">
            Importações de extrato bancário
          </h1>
          <div className="flex flex-col md:flex-row pt-8 md:space-x-4">
            <div className="bg-skeleton animate-pulse border-2 flex-col items-center justify-center mb-4 md:mb-0 rounded-2xl border-zinc-300 md:w-1/4 px-6 py-8 h-max space-y-4">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


