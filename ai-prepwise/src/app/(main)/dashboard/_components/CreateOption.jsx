import React from 'react'
import { Video } from 'lucide-react';
import { Phone } from 'lucide-react';
import Link from 'next/link';
export default function CreateOption() {
  return (

    <div className=' grid grid-cols-3 gap-5' >
      <button
        className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 transition-colors"
        onClick={() => window.location.href = 'https://resumeiq-analyzer-zr1n.arcada.app'}
      >
        Go to ResumeIQ Analyzer
      </button>
      <Link href={'/dashboard/create-interview'} className=' bg-white border-gray-200 rounded-lg p-5 flex flex-col gap-3 cursor-pointer'
>
<Video className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12'/>
<h2 className=' font-bold '>Create new Interview</h2>
<p className=' text-gray-500'>Create AI Interview and schedule them with Candiates</p>

      </Link>
            <div className=' bg-white border-gray-200 rounded-lg p-5'>
<Phone className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12'/>
<h2 className=' font-bold '>Create phone Screenign call</h2>
<p className=' text-gray-500'>Schedule phone screening call with candidates</p>

      </div>
    </div>
  )
}
