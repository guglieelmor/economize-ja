'use client';
import { useStoreSelector } from '@/hooks/useStoreSelector';

export default function Welcome() {
  const user = useStoreSelector((store) => store.User);

  return (
    user.fullname.length > 0 ?
      <h1 className="text-2xl text-white font-bold">
        Bem vindo novamente, {user.fullname} 👋
      </h1>
    :
      <Skeleton />
  );
}

const Skeleton = () => {

  return(
    <h1 className="text-2xl text-white font-bold bg-skeleton animate-pulse w-64 h-8 mb-2">
  </h1>
  )
}
