"use client"
import React from 'react'
import { useUser } from '../../../../../context/userDetailContext';
import Image from 'next/image';

export default function WelcomeContainer() {
    const {user} = useUser();
  return (
    <div className=' bg-white p-3 rounded-xl flex justify-between items-center'>
      <div >
        <h2 className=' text-lg font-bold'> Welcome back ,{user?.name}</h2>
        <h2 className=' text-secondary text-gray-500'>AI-Driven Interview, Hassel-Free Hiring</h2>
      </div>
      {user?.picture ? (
        <Image src={user.picture} alt="useAvatar" width={50} height={50} className='rounded-full' />
      ) : null}
    </div>
  )
}
