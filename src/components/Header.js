import Image from 'next/image';
import React from 'react';

import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'

// for next auth
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';

function Header() {

    // to get the session of the one who logged in
    const [session] = useSession()

    // for routing
    const router = useRouter()

    // to pull the data from REDUX

    const items = useSelector(selectItems) //selectItems >> we declare in basketSlice.js

    return (
        <header>
            {/* top nav */}
            {/* we have created our own custom theme in tailwind.config.js */}
            <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
                <div className='mt-2 flex items-center flex-grow  sm:flex-grow-0'>
                    {/* sm:flex-grow-0 >> when it hit bigger that mobile view it should not grow */}

                    <Image onClick={() => router.push('/')} src={"https://links.papareact.com/f90"} width={150} height={40} objectFit='contain' className='cursor-pointer' />
                </div>

                {/* Search */}
                <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
                    <input className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md outline-none px-4' type={'text'} />
                    <SearchIcon className='h-12 p-4' />
                </div>

                {/* right section */}

                {/* whitespace-nowrap >>> on small device it will not move text to new line */}
                <div className='text-white flex items-center space-x-6 text-xs mx-6 whitespace-nowrap'>
                    <div onClick={!session ? signIn : signOut} className='link'> {/* link >> custom tw class */}
                        {session ? (`Hello, ${session?.user?.name}`) : (
                            'Sign In'
                        )}
                        <p className='font-extrabold md:text-sm'>Account & Lists</p>
                    </div>

                    <div onClick={()=> session && router.push('/orders')} className='link'>
                        <p>Return</p>
                        <p className='font-extrabold md:text-sm'>& Orders</p>
                    </div>

                    <div onClick={() => router.push('/checkout')} className='relative link flex items-center'>
                        <span className='absolute top-0 right-0 md:right-10 rounded-full h-4 w-4 text-center text-black font-bold bg-yellow-400  items-center justify-center'>{items.length}</span>
                        <ShoppingCartIcon className='h-10' />
                        <p className='hidden md:flex font-extrabold md:text-sm mt-2'>Basket</p>
                    </div>
                </div>
            </div>

            {/* bottom nav */}
            <div className='flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6'>
                {/* link >> custom tailwind class */}
                <p className='link flex items-center'>
                    <MenuIcon className='h-6 mr-1' />
                    All
                </p>
                <p className='link'>Prime Video</p>
                <p className='link'>Amazon Business</p>
                <p className='link'>Today's Deals</p>
                <p className='link hidden lg:flex'>Electronics</p>
                <p className='link hidden lg:flex'>Food & Grocery</p>
                <p className='link hidden lg:flex'>Prime</p>
                <p className='link hidden lg:flex'>Buy Again</p>
                <p className='link hidden lg:flex'>Shopper Toolkit</p>
                <p className='link hidden lg:flex'>Health & Personal Care</p>

            </div>

        </header>
    );
}

export default Header;
