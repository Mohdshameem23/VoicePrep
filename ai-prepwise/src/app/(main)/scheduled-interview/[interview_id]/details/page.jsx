"use client"
import React, { useEffect,useState } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '../../../../../../context/userDetailContext'
import { supabase } from '../../../../../../services/supabaseClient'
import InterviewDetailContainer from '../_components/InterviewDetailContainer'
import CandidateList from '../_components/CandidateList'
function InterviewDetail() {
    const {interview_id} = useParams()
    const[interviewDetail,setInterviewDetail]=useState(null);
    const{user}=useUser();
    useEffect(()=>{
        user&&GetInterviewList();
    },[user])
    const GetInterviewList = async () => {
        const result = await supabase
          .from("Interview")
          .select(
            "jobPosition,interviewDuration,jobDescription,type,questionList,created_at,interview_id,interview-feedback(userEmail,userName,feedback,created_at)",
          )
          .eq("userEmail", user?.email)
            .eq("interview_id", interview_id)
            setInterviewDetail(result.data[0]);
        console.log(result);
      };
  return (
    <div>
      <h2 className=' font-bold text-2xl'>Interview Detail</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail} />
      <CandidateList candidateList={interviewDetail?.['interview-feedback']}/>
    </div>
  )
}



export default InterviewDetail
