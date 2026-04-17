import React, { use } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { useState,useEffect } from 'react';
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InterviewType } from "../../../../../../services/Constants"
export default function FormContainer({onHandleInputChange,GoToNext}) {
    const[interviewType,setInterviewType]=useState([]);
    // useEffect(() => {
    //     if(interviewType)
    //     {
    //         onHandleInputChange('interviewType',interviewType);
    //     }
    // }, [interviewType, onHandleInputChange]);
    useEffect(() => {
    onHandleInputChange('interviewType', interviewType);
}, [interviewType]);  // ← ONLY this

    const AddInterviewType=(type)=>{
      const data=interviewType.includes(type);
      if(!data){
        setInterviewType(prev=>[...prev,type])
      }
      else{
        const result=interviewType.filter(item=>item!==type);
        setInterviewType(result);
      }
    }
  return (
    <div className=' p-5 bg-white rounded-xl'>
    <div>
    <h2 className=' text-sm font-medium'> Job Position</h2>
      <Input placeholder="eg. Full Stack Developer" className='mt-2'
        onChange={(e)=>onHandleInputChange('jobPosition',e.target.value)}
      />
      </div>
      <div className=' mt-5'>
    <h2 className=' text-sm font-medium'> Job Description</h2>
<Textarea placeholder='Enter details Job description'  className='h-[200px] mt-2'
     onChange={(e)=>onHandleInputChange('jobDescription',e.target.value)}
/>
      </div>
          <div className=' mt-5'>
    <h2 className=' text-sm font-medium'>Interview Duration</h2>
    <Select onValueChange={(value)=>onHandleInputChange('interviewDuration',value)}>        
            
  <SelectTrigger className=' mt-2 w-full'>
    <SelectValue placeholder="Select Duration" />
  </SelectTrigger>
  <SelectContent>
      <SelectItem value="5 Min">5 Min</SelectItem>
    <SelectItem value="15 Min">15 Min</SelectItem>
    <SelectItem value="30 Min">30 Min</SelectItem>
    <SelectItem value="45 Min">45 Min</SelectItem>
        <SelectItem value="60 Min">60 Min</SelectItem>
  </SelectContent>
</Select>
      </div>
      <div className=' mt-5'>
        <h2 className=' text-sm font-medium'>Interview Type</h2>
        <div className=' flex gap-3 flex-wrap mt-2'>
          {InterviewType.map((type, index) => (
            <div key={index} className={`flex items-center cursor-pointer gap-2 p-1 px-2 bg-white rounded-2xl border border-gray-300 hover:bg-secondary ${interviewType.includes(type.title)&& 'bg-blue-100 text-primary'}`} onClick={()=>AddInterviewType(type.title)}>
              <type.icon className='h-4 w-4' />
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className=' mt-7 flex justify-end' onClick={()=>GoToNext()}>
      <Button>Generate Question <ArrowRight/></Button>
    </div>
    </div>
  )
}
