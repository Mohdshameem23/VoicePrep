"use client"
import { Video } from 'lucide-react';
import React from 'react'
import { useState ,useEffect} from 'react';
import { Button } from '../../../../components/ui/button';
import { supabase } from '../../../../../services/supabaseClient';
import { useUser } from '../../../../../context/userDetailContext';
import InterviewCard from '../../dashboard/_components/InterviewCard';
export default function LatestInterviewsList() {
    const [interviewList,setInterviewList]=useState([])
    const {user}=useUser();
    useEffect(()=>{
      user&&GetInterviewList();
    },[user])
    const GetInterviewList=async()=>{
      let{data:Interview,error}=await (await supabase.from('Interview').select('*').eq('userEmail',user?.email).order('id',{ascending:false}).limit(6))
      console.log(Interview)
      setInterviewList(Interview)
    }


  return (
    <div className=' my-5'>
     <h2 className=' font-bold text-2xl'>Previously Created Interview</h2>
     {interviewList.length===0 && <div className=' p-5 flex flex-col items-center gap-5 bg-white mt-5'>
     <Video className=' h-10 w-10 text-primary'/>
     <h2>You dont have any Interview created</h2>
     <Button>+ Create New Interview</Button>

     </div> }
     {interviewList&&
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {interviewList.map((interview, index) => (
    <InterviewCard key={index} interview={interview} />
  ))}
</div>

     }
    
    </div>
  )
}
