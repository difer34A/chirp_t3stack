import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import Image from 'next/image';
import React, { useState } from 'react'
import Link from 'next/link';
import ButtonHover from './ButtonHover';

export default function Menu() {
    const [open, setOpen] = useState(false)
    var { user } = useUser();
    if(!user){user = null}
    return (
        <>
            <div className='fixed flex bottom-0 h-12 z-20 w-full border-t border-slate-500 place-items-center justify-around bg-black border p-4
            sm:flex-col sm:w-[10%] sm:h-screen sm:border-none sm:static sm:justify-between'>

                <div className='flex flex-col gap-4'>
                    {/* disapear section */}
                    <div className='hidden sm:flex'>
                        {/* twitter logo */}
                        <ButtonHover>
                            <Link href={"/"}>
                                <Image src={"/twitter_white.png"} width={32} height={32} alt='twitter logo'></Image>
                            </Link>
                        </ButtonHover>

                    </div>
                    {/* home logo | never disapears */}
                    <ButtonHover>
                        <Link href={"/"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </Link>
                    </ButtonHover>
                </div>

                {/* if logged in userimage | if not placeholder */}
                <div>
                    {user !== null && 
                    <div className='relative'>
                        <Image src={user?.profileImageUrl} width={40} height={40} onClick={()=>setOpen(!open)}
                        className='rounded-full object-contain hover:opacity-90 hover:scale-105 duration-200' alt='userProfilePic'></Image>
                        {open && 
                        <div className='absolute w-40 h-20 border border-slate-500 rounded-xl top-0 -translate-y-[84px] -translate-x-1/3 sm:-translate-x-[5px] bg-black'>
                            <Link href={`/@${user?.username}`} className='w-full font-bold h-1/2 flex place-items-center justify-center text-center border-b border-slate-500 gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 aspect-square">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                My profile
                            </Link>
                            <div className='w-full font-bold h-1/2 flex place-items-center justify-center text-center border-slate-500 gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                                <SignOutButton/>
                            </div>
                        </div>}
                    </div>}
                    {user === null && 
                        <SignInButton mode='modal'>
                            <div className='h-10 aspect-square flex place-items-center justify-center bg-slate-800 rounded-full bg-opacity-0 hover:bg-opacity-100 duration-200 hover:scale-110'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 aspect-square">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </SignInButton>
                    }
                </div>

            </div>
        </>
    )
}
