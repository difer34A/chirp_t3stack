import { SignInButton } from '@clerk/nextjs'
import React from 'react'

export default function Auth() {
  return (
    <div className='hidden xl:flex flex-col gap-5 border border-slate-500 rounded-md w-80 h-fit mt-4 p-4 pb-8 break-all'>
        <h1 className='font-bold text-2xl'>New to Chirp?</h1>
        <h1 className='text-slate-500 text-xs'>Sign up now to get your own personalized timeline!</h1>
        <SignInButton mode="modal">
            <div className='p-2 px-4 rounded-xl text-slate-900 bg-white font-bold flex gap-2 place-items-center justify-center'>
                <img src="/clerk.jpg" alt="clerk logo" className='h-6 aspect-square' />
                Sign in using Clerk
            </div>
        </SignInButton>
    </div>
  )
}
