import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Copy,
  Clock,
  List,
  Mail,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

const InterviewLink = ({ interview_id, formData }) => {
  console.log(interview_id)
  const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview_id
  const GetInterviewUrl = () => {
    return url;
  };

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast("Link Copied");
  };

  return (
    <div className="flex flex-col items-center w-full justify-center mt-10">
      <Image
        src="/checks.png"
        alt="check"
        width={200}
        height={200}
        className="w-[50px] h-[50px]"
      />

      <h2 className="font-black text-lg mt-4">Your AI Interview is Ready</h2>
      <p className="mt-3">
        Share this link with your candidate to start the interview process
      </p>

      <div className="w-full p-7 mt-6 rounded-xl bg-white">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Interview Link</h2>
          <h2 className="p-1 px-2 text-primary bg-blue-50 rounded">
            Valid for 30 days
          </h2>
        </div>

        <div className="mt-3 flex gap-3 items-center">
          <Input defaultValue={GetInterviewUrl()} disabled />
          <Button onClick={onCopyLink}>
            <Copy /> Copy Link
          </Button>
        </div>

        <hr className="my-7" />

        <div className="flex gap-5">
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <Clock className="h-4 w-4" /> {formData?.interviewDuration}
          </h2>
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <List className="h-4 w-4" /> {formData?.interviewDuration}
          </h2>
        </div>
      </div>
<div className="mt-10 bg-white p-6 rounded-2xl w-full shadow-sm border">
  <h2 className="font-semibold text-gray-800 mb-4">Share Via</h2>

  <div className="grid grid-cols-3 gap-5">
    <Button
      variant="outline"
      className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-base font-medium"
    >
      <Mail className="h-4 w-4" /> Email
    </Button>

    <Button
      variant="outline"
      className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-base font-medium"
    >
      <Mail className="h-4 w-4" /> Slack
    </Button>

    <Button
      variant="outline"
      className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-base font-medium"
    >
      <Mail className="h-4 w-4" /> Whatsapp
    </Button>
  </div>
</div>


      <div className="flex w-full gap-5 justify-between mt-6">
        <Link href="/dashboard">
          <Button variant="outline">
            <ArrowLeft /> Back to Dashboard
          </Button>
        </Link>

        <Link href="/create-interview">
          <Button>
            <Plus /> Create New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewLink;
