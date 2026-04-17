"use client"
import { supabase } from '../../../services/supabaseClient'
import React from 'react'
import Image from 'next/image'

const Login = () => {
  // const signInWithGoogle = async () => {
  //   const {error}=await supabase.auth.signInWithOAuth({
  //     provider:'google',
  //   })
  //   if(error)console.error('Error: ',error.message)
  // }
const signInWithGoogle = async () => {
  console.log("hii")
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })

  if (error) console.error('Error: ', error.message)
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 w-full max-w-lg p-8">
        <div className="flex justify-center mb-6">
          <Image
            src="/Gemini.png"
            alt="AiCruiter Logo"
            width={220}
            height={60}
            className="w-[180px] h-auto"
          />
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <Image
              src="/login.png"
              alt="Illustration"
              width={640}
              height={360}
              className="w-[520px] h-[260px] rounded-lg object-cover"
            />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-2">Welcome to VoicePrep</h1>
        <p className="text-center text-gray-500 mb-6">Sign In With Google Authentication</p>

        <div>
          <button
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md cursor-pointer"
            onClick={signInWithGoogle}
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
