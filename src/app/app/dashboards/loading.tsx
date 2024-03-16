
export default function Loading() {

  return (
      <div className=" md:mx-10 lg:mx-auto lg:container h-max my-10">
        <div className="flex flex-col rounded-md pl-6 p-6 border-2 border-zinc-400 bg-gradient-dark-blue lg:w-full">
          <h1 className="text-teal-400 tracking-tight text-4xl font-semibold">
            Painel Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-700 h-[8rem] rounded-lg w-42 p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <span className='text-base text-gray-50 semi-bold  bg-skeleton animate-pulse'>Saldo total</span>
                  </div>
                  <span className='text-xl font-semibold text-white  bg-skeleton animate-pulse'>
                  </span>
              </div>

              <div className="bg-dash h-[8rem] rounded-lg w-42 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className='text-base text-gray-100  bg-skeleton animate-pulse'></span>
                </div>
                <span className='text-xl font-semibold text-red-500  bg-skeleton animate-pulse'>
                </span>
              </div>

              <div className="bg-zinc-600 h-[8rem] rounded-lg w-42 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className='text-base text-gray-100  bg-skeleton animate-pulse'></span>
                </div>
                    <span className='text-lg font-semibold text-white  bg-skeleton animate-pulse'>
                    </span>
              </div>

              <div className="bg-dash h-[8rem] rounded-lg w-42 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className='text-base text-gray-100  bg-skeleton animate-pulse'></span>
                </div>
                <span className='text-xl font-semibold text-money  bg-skeleton animate-pulse'>
                </span>
              </div>
            </div>
            <SkeletonChart />
            <SkeletonChart />
            <SkeletonChart />
          </div>

        </div>
      </div>
  )
}

const SkeletonChart = () => {

  return (
      <div className="bg-skeleton animate-pulse rounded-lg p-4 text-white flex gap-2 items-center flex-col">
              <h1 className="text-left text-xl font-bold"></h1>
              <div className="w-full h-full bg-transparent p-1 rounded-lg">
        </div>
      </div>
  )
}

