import Image from 'next/image';

import StartNow from '../StartNow';

export default function Bundler() {
  return (
    <div className="bg-gradient-dark-teal flex flex-col p-10">
      <div className='flex flex-col items-center justify-center'>
        <div className="flex md:flex-row flex-col justify-center items-center mx-auto">
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 ml-4 self-center">
              <div className="lg:text-center group space-y-2">
                <h2 className="text-zinc-100 text-2xl sm:text-4xl text-center font-bold tracking-tight mb-2 transform transition-all scale-110 sm:hover:scale-125">
                  Domine suas finanças com <span className='text-green-400'>Economize já 🤩</span>
                </h2>
                <br/>
                <p className="text-zinc-100 ml-16 text-left md:text-center w-3/4 text-lg md:text-xl font-light overflow-hidden line-clamp-3 transform transition-all">
                    <strong>Chega de planilhas!</strong> Transforme suas finanças com <span className='text-green-400 text-2xl'>Economize já </span>
                    Controle seus gastos e alcance a estabilidade financeira desejada.
                </p>

              </div>
              <p className="mt-10 text-center text-lg group md:text-xl text-white font-semibold transform transition-all hover:scale-110">
                    Experimente <span className='group-hover:text-green-400'>agora</span> e dê o primeiro passo para uma vida financeira equilibrada!
                </p>
            </div>
        </div>
        <StartNow />
      </div>
    </div>
  );
}
