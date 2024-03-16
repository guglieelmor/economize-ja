import Link from 'next/link';
import { GiTakeMyMoney } from 'react-icons/gi';

export default function StartNow() {
  return (
    <div className="mt-10 flex h-max items-center justify-center ">
      <div className="flex rounded-md shadow">
        <Link
          href="/account?type=register"
          className="py-2 px-5 bg-primary-blue flex transform transition-all hover:scale-110 items-center space-x-2 text-teal-500 font-medium rounded-md hover:bg-secondary-blue hover:text-teal-400"
        >
          <span>Começar agora</span>
          <GiTakeMyMoney color="#7DE4D9" size={34} />
        </Link>
      </div>
    </div>
  );
}
