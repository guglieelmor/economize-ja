'use client';

export default function AppLoading() {
  return (
    <div className="flex text-white text-center text-xl h-screen bg-zinc-900 justify-center w-full items-center">
      <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <div className="border-t-transparent border-solid animate-spin  rounded-full border-teal-400 border-8 h-64 w-64"></div>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight"> Loading</h1>
    </div>
  );
}
