import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
function CandidateFeedbackDialog({ candidate }) {
    const feedback=candidate?.feedback?.feedback||"No feedback provided"
    console.log(feedback)
   const rating=(feedback.rating.communication+feedback.rating.experience+feedback.rating.problemSolving+feedback.rating.techicalSkills)/4;
    console.log(Math.round(rating))
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-primary">
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-5">
              <div className=" flex justify-between items-center">
                <div className=" flex items-center gap-5">
                  <h2 className="bg-primary p-3 px-5 rounded-full font-bold text-white">
                    {candidate?.userName?.[0]}
                  </h2>

                  {/* Name */}
                  <div>
                    <h2>{candidate?.userName}</h2>
                    <h2 className=" text-sm text-gray-500">
                      {candidate?.userEmail}
                    </h2>
                  </div>
                </div>
                <div className=" flex gap-3 item-center">
                  <h2 className=" text-primary text-2xl font-bold">{rating}/10</h2>
                 
                </div>
              </div>
              <div className=" mt-5">
                <h2 className=" font-bold">Skills Assesment</h2>
                <div className=" mt-3 grid grid-cols-2 gap-10">
                  <div>
                    <h2 className=" flex justify-between">
                      Technical Skills <span>{feedback?.rating?.techicalSkills}/10</span>
                    </h2>
                    <Progress value={feedback?.rating?.techicalSkills * 10} />
                  </div>
                   <div>
                    <h2 className=" flex justify-between">
                      Communication <span>{feedback?.rating?.communication}/10</span>
                    </h2>
                    <Progress value={feedback?.rating?.communication * 10} />
                  </div>
                    <div>
                    <h2 className=" flex justify-between">
                      Problem Solving <span>{feedback?.rating?.problemSolving}/10</span>
                    </h2>
                    <Progress value={feedback?.rating?.problemSolving * 10} />
                  </div>
                    <div>
                    <h2 className=" flex justify-between">
                      Experience <span>{feedback?.rating?.experience}/10</span>
                    </h2>
                    <Progress value={feedback?.rating?.experience * 10} />
                  </div>
                </div>
              </div>
              <div className=" mt-5">
<h2 className=" font-bold">Performance Summery</h2>
<p>{feedback.summery}</p>
              </div>
              <div className={`p-5 ${feedback?.recommendation === "YES" ? "bg-green-100 text-green-800" : feedback?.recommended === "FALSE" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"} rounded-lg mt-5`}>
                <h2 className=" font-bold">Recommendation Msg:</h2>
                <p className=" mt-2">{feedback?.RecommendationMsg}</p>


              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;
