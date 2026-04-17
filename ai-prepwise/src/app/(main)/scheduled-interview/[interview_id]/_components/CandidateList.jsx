import React from 'react'
import CandidateFeedbackDialog from './CandidateFeedbackDialog'
import moment from 'moment'


const CandidateList = ({ candidateList }) => {
 
  // console.log(candidateList?.feedback?.feedback.rating,"candidatelist")
  //  const feedback=candidateList?.feedback?.feedback||"No feedback provided"
  //   console.log(feedback)
  //  const rating=(feedback.rating.communication+feedback.rating.experience+feedback.rating.problemSolving+feedback.rating.techicalSkills)/4;
  //   console.log(Math.round(rating)+"candidatelisnisn")
  return (
    <div>
      <h2 className='font-bold my-5'>
        Candidates {candidateList?.length}
      </h2>

      {candidateList?.map((candidate, index) => (
        <div key={index} className='p-5 flex gap-3 items-center bg-white rounded-lg'>
          
          {/* Avatar */}
          <h2 className='bg-primary p-3 px-5 rounded-full font-bold text-white'>
            {candidate?.userName?.[0]}
          </h2>

          {/* Name */}
          <div>
            <h2>{candidate?.userName}</h2>
            <h2 className=' text-sm text-gray-500'>Completed On :{moment(candidate?.created_at).format('MMM DD, yyyy')}</h2>
          </div>
          <div className=' flex gap-3 item-center'>
 <h2 className="text-green-600">
  {Object.values(
    candidate?.feedback?.feedback?.rating || {}
  ).reduce((sum, value) => sum + value, 0)/4}/10
</h2>


<CandidateFeedbackDialog candidate={candidate}/>
            </div>
        </div>
      ))}
    </div>
  )
}

export default CandidateList
