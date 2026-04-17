"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../services/supabaseClient";
import { useUser } from "../../../../context/userDetailContext";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import InterviewCard from "../dashboard/_components/InterviewCard";

function ScheduledInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  useEffect(() => {
    user && GetInterviewList();
  }, [user]);
  const GetInterviewList = async () => {
    const result = await supabase
      .from("Interview")
      .select(
        "jobPosition,interviewDuration,interview_id,interview-feedback(userEmail)",
      )
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });
    console.log(result);
    setInterviewList(result.data);
  };
  return (
    <div className=" mt-5">
      <h2 className="font-bold text-2xl">
        Interview List With Candiadate Feedback{" "}
      </h2>
      {interviewList.length === 0 && (
        <div className=" p-5 flex flex-col items-center gap-5 bg-white mt-5">
          <Video className=" h-10 w-10 text-primary" />
          <h2>You dont have any Interview created</h2>
          <Button>+ Create New Interview</Button>
        </div>
      )}
      {interviewList && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {interviewList.map((interview, index) => (
            <InterviewCard key={index} interview={interview} 
                viewDetail={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduledInterview;
