"use client"
import { toast } from "sonner"
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Progress } from "@/components/ui/progress"
import FormContainer from './_components/FormContainer'
import { useState } from 'react';
import QuestionList from './_components/QuestionList'
import InterviewLink from "./_components/InterviewLink"

function CreateInterview() {
    const router=useRouter();
    const [step,setStep]=useState(1);
    const [formData,setFormData]=useState({});
    const [interviewId,setInterviewId]=useState();
    const onHandleInputChange=(field ,value)=>{
setFormData(prev=>({
    ...prev,
    [field]:value

}))
console.log(formData);
    }
    const onGoToNext = () => {
      if (!formData?.jobPosition || !formData?.jobDescription || !formData?.interviewDuration || !formData?.interviewType) {
        toast('Please fill all the fields')
        return;
      }

      setStep(step + 1);
    }
    const onCreateLink = (id) => {
      setInterviewId(id);
      setStep(step + 1);
    }
  return (
    <div className=' mt-10 px-10 md:px-24 lg:px-44 xl:56 '>
     <div className=' flex gap-5 items-center mb-5 cursor-pointer'>
        <ArrowLeft onClick={()=>router.back()} className=' cursor-pointer'/>
        <h2 className=' font-bold text-2xl'>Create New Interview</h2>
      
     </div>
       <Progress value={step*33.33} className='my-5' />
       {step==1?<FormContainer onHandleInputChange={onHandleInputChange}
        GoToNext={()=>onGoToNext()}
       />
       :step==2?<QuestionList formData={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/>:
       step==3?<InterviewLink interview_id={interviewId} formData={formData}/>:null
       }
    </div>
  )
}

export default CreateInterview;
