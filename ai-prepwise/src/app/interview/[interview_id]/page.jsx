'use client'
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
// import { supabase } from '@/services/supabaseClient';
// import { supabase } from "../../services/supabaseClient";
import { supabase } from "../../../../services/supabaseClient";
import { InterviewDataContext } from "../../../../context/InterviewDataContext";
import { useRouter } from "next/navigation";



const Interview = () => {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [userName, setUserName] = useState("");
  const[userEmail,setUserEmail]=useState();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  useEffect(() => {
    if (interview_id) GetInterviewDetails();
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    let { data, error } = await supabase
      .from("Interview") // unified table name
      .select("jobPosition, jobDescription, interviewDuration, type, questionList")
      .eq("interview_id", interview_id)
      .single();

    if (!error) setInterviewData(data);
  };

  console.log(interviewData); // this now works

  const onJoinInterview = async () => {
    if (!userName.trim()) {
      alert("Please enter your full name.");
      return;
    }
    setLoading(true);
    let { data: Interview, error } = await supabase
      .from('Interview')
      .select('*')
      .eq('interview_id', interview_id);
    // console.log(Interview[0]);
    setInterviewInfo({
      userName: userName,
      userEmail:userEmail,
      interviewData: Interview[0] // pass the full interview object
    });
    router.push('/interview/' + interview_id + '/start');
    setLoading(false);
  }

  return (
    <div className="px-10 md:px-28 lg:px-48 xl:px-80 mt-7">
      <div className="flex flex-col items-center justify-center border rounded-lg bg-white p-7">
        
        {/* REMOVE THIS IF HEADER ALREADY HAS LOGO */}
        <Image
          src="/Gemini.png"
          alt="logo"
          width={200}
          height={100}
          className="w-[140px]"
        />

        <h2 className="mt-3">Ai-Powered Interview Platform</h2>

        <Image
          src="/Interview.png"
          alt="interview"
          width={500}
          height={500}
          className="w-[280px] my-6"
        />

        <h2 className="font-black text-xl">
          {interviewData?.jobPosition || "Full Stack Developer Interview"}
        </h2>

        <h2 className="flex gap-2 items-center text-gray-500">
          <Clock className="h-4 w-4" /> {interviewData?.interviewDuration || "30"} Minutes
        </h2>

        <div className="w-full">
          <h2>Enter your full name</h2>
          <Input
            placeholder="e.g. Shameem"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </div>
          <div className="w-full">
          <h2>Enter your Email </h2>
          <Input
            placeholder="e.g. shameem@gmail.com"
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
          />
        </div>

        <div className="p-3 bg-blue-100 flex gap-4 rounded-xl mt-6">
          <Info className="text-primary" />
          <div>
            <h2 className="text-sm font-bold">Before you begin</h2>
            <ul>
              <li className="text-sm text-primary">- Ensure you have a stable internet connection</li>
              <li className="text-sm text-primary">- Test your camera and microphone</li>
              <li className="text-sm text-primary">- Find a Quiet place for interview</li>
            </ul>
          </div>
        </div>

        <Button className={"mt-5 w-full font-bold"}
        onClick={()=>onJoinInterview()}
        >
          <Video />{loading&&<Loader2Icon/>} Join Interview
        </Button>
      </div>
    </div>
  );
};

export default Interview;
