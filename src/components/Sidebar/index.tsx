'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { HiHome } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { TbFileImport } from 'react-icons/tb';
import { useDispatch } from 'react-redux';

import { setAuthenticated } from '@/features/Auth';
import { useStoreSelector } from '@/hooks/useStoreSelector';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { destroyCookie } from 'nookies';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
type Navigation = {
  name: string;
  href: string;
  icon: JSX.Element;
  current: boolean;
}
const supabaseURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/poupa-mais`;
export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useStoreSelector((store) => store.User);
  const dispatch = useDispatch();
  const [navigation, setNavigation] = useState<Navigation []>([
    {
      name: 'Página Inicial',
      href: '/app',
      icon: <HiHome size={25} />,
      current: false
    }
  ]);

  useEffect(() => {
    const href = pathname;
    const currentNav = navigation.map((item: Navigation) =>
      item.href == href
        ? { ...item, current: true }
        : { ...item, current: false }
    );
    setNavigation(currentNav);
  }, [pathname]);

  function currentPage(key: string) {
    const currentNav = navigation.map((item: Navigation) =>
      item.name == key
        ? { ...item, current: true }
        : { ...item, current: false }
    );
    setNavigation(currentNav);
  }

  async function signOut() {
    await destroyCookie({}, 'token');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(setAuthenticated(0));
    router.push('/');
  }
  return (
    <>
      <div className="min-h-screen sm:block hidden bg-primary-blue">
        <div className="sidebar min-h-screen w-[3.35rem] overflow-hidden border-r border-dark-blue hover:w-56 hover:bg-primary-blue hover:shadow-lg">
          <div className="flex h-screen flex-col justify-between pt-2 pb-6">
            <div>
              <div className="w-max p-2.5 flex items-center space-x-3">
                <img
                  className=" h-8 w-auto lg:block"
                  src="/PriceHouse.ico"
                  alt="Your Company"
                />
                <h1 className="font-roboto text-2xl font-bold text-teal-400">
                  {' '}
                  Economize já
                </h1>
              </div>
              <ul className="mt-6 space-y-2 tracking-wide">
                {navigation?.map((item) => (
                  <li
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 relative bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white'
                        : 'bg group rounded-full px-4 py-3 text-gray-300 hover:text-teal-500 ',
                      'rounded-md px-3 py-2 text-sm font-medium min-w-max'
                    )}
                    key={item.name}
                  >
                    <Link
                      href={item.href}
                      onClick={() => currentPage(item.name)}
                      className="flex items-center space-x-4 "
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-max -mb-3 items-center">
              <Link
                href="/app/account"
                className="flex px-3 space-x-3 cursor-pointer  w-56 items-center"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.avatar.length > 0 ? `${supabaseURL}/${user.avatar}` : `${supabaseURL}/avatars/6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws`}
                  alt=""
                />{' '}
                <div className="flex flex-col justify-center">
                  <span className=" text-white text-semibold text-lg hover:text-teal-500 break-all">
                    {user.fullname}
                  </span>
                </div>
              </Link>
              <a
                onClick={signOut}
                className="gbg group flex items-center space-x-4 rounded-full px-4 py-3 cursor-pointer text-gray-300 hover:text-white
              "
              >
                <FiLogOut
                  size={25}
                  className="group group-hover:text-red-400"
                ></FiLogOut>
                <span className="group-hover:text-red-400">Sair</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Disclosure as="nav" className="bg-primary-blue sm:hidden shadow-lg z-500">
        {({ open }) => (
        <>
          <div className="ml max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-teal-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex items-center justify-center ml-2 space-x-1 sm:mr-auto transform transition-all hover:scale-105">
                  <div className="flex flex-shrink-0 items-center">
                    <Image
                      width={32}
                      height={32}
                      className="block h-8 w-auto lg:hidden"
                      src="/PriceHouse.ico"
                      alt="Your Company"
                    />
                    <Image
                      width={32}
                      height={32}
                      className="hidden h-8 w-auto lg:block text-white"
                      src="/PriceHouse.ico"
                      alt="Your Company"
                    />
                  </div>
                  <h1 className="font-roboto font-bold text-teal-400">
                    {' '}
                    Economize já
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            {({ close }) => (
              <div className="space-y-1 px-2 pt-2 pb-3 flex flex-col">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-teal-500 text-white'
                        : 'text-gray-300 hover:bg-teal-500 hover:text-white',
                      'rounded-md flex items-center gap-1 px-3 py-2 text-sm font-medium ui-close:rotate-90 ui-close:transform'
                    )}
                    onClick={() => {
                      currentPage(item.name);
                      close();
                    }}
                    aria-current={item.current ? 'page' : undefined}
                  >
                     {item.icon}
                    {item.name}
                  </Link>
                ))}
                <a
                  onClick={signOut}
                  className="gbg group flex items-end space-x-4 rounded-full px-4 py-3 cursor-pointer text-gray-300 hover:text-white
                "
                >
                  <FiLogOut
                    size={20}
                    color="rgb(254 202 202)"
                    className="group group-hover:text-red-400"
                  />
                  <span className="group-hover:text-red-400 text-sm text-red-200">Sair</span>

                </a>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
      </Disclosure>
    </>
  );
}
