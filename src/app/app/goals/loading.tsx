'use client'
export default function Loading() {
  return (
    <div className=" md:mx-10 lg:mx-auto lg:container h-max my-10">
        <div className="flex flex-col rounded-md pl-6 p-6 border-2 border-zinc-400 bg-gradient-dark-blue lg:w-full">
          <div className="flex flex-col">
            <div className="flex text-white justify-between items-center">
              <h1 className="text-4xl text-teal-400 font-semibold">Metas em andamento</h1>
              <div>
                <button
                    type="button"
                    className="flex md:w-full text-sm justify-center
                              rounded-3xl bg-teal-500 py-2 px-3 font-semibold text-slate-700
                              hover:bg-teal-500 hover:text-white"
                    disabled
                  >
                    Adicionar Meta +
                </button>
              </div>
            </div>
            <div className="flex mt-5 space-x-4">
              <div className="bg-dash rounded-lg text-white flex flex-col h-80 w-80">
              </div>

               <SkeletonGoals />

            </div>
          </div>

        </div>

      </div>
  );
}

const SkeletonGoals = () => {

  return(
    <div className="flex flex-1 flex-col text-white space-y-2 wtf">
      {
        Array.from([0, 1, 2]).map(() => {

          return (
            <div key={crypto.randomUUID()} className="flex w-full py-10 space-x-4 p-3 px-5 border-2 hover:bg-zinc-300 mx-auto border-zinc-500 rounded-2xl bg-skeleton animate-pulse">
                <div className="bg-dash flex items-center justify-center rounded-lg px-6"></div>
                <div className="flex flex-col space-y-2 justify-center flex-1 text-transaction">
                  <div className="flex justify-between text-zinc-700 font-semibold text-lg"></div>
                  <div className="h-4 rounded-lg w-full bg-slate-400 flex items-center"></div>
                  <div className="flex justify-between whitespace-nowrap">
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-2">
                  <div className='rounded-md border-2 border-zinc-400 text-transaction'>

                  </div>
                  <div className='rounded-md border-2 border-zinc-400 text-transaction'>
                  </div>
                </div>
            </div>
          )
        })
      }

    </div>
  );
}
