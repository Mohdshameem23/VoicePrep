import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { toast } from "sonner";

function InterviewCard({ interview ,viewDetail=false}) {
    const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id
        const copyLink=()=>{
      navigator.clipboard.writeText(url);
      toast('Copied')
    }
const onSend = () => {
  const subject = "AI Interview Link";
  const body = `Here is your interview link:\n${url}`;

  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=''&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    "_blank"
  );
};


  return (
    <div className="p-5 bg-white rounded-xl border shadow-sm flex flex-col min-h-[200px]">
      {/* Date Section */}
      <div className="flex items-center gap-3">
        <div className="h-[40px] w-[40px] bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
          {moment(interview?.created_at).format("DD")}
        </div>

        <h2 className="text-sm font-medium text-gray-600">
          {moment(interview?.created_at).format("DD MMM YYYY")}
        </h2>
      </div>

      {/* Job Role */}
      <h2 className="mt-4 font-bold text-lg capitalize">
        {interview?.jobPosition}
      </h2>

      {/* Duration */}
      <h2 className="mt-1 text-sm text-gray-500 flex justify-between">
        Duration: {interview?.interviewDuration || "Not specified"}
        <span>{interview['interview-feedback']?.length} Candidates</span>
      </h2>

      {/* Buttons → Always Bottom */}
      {!viewDetail?
      <div className="flex gap-3 w-full mt-auto pt-4">
        <Button
          variant="outline"
          className="flex w-fit gap-2 items-center justify-center"
          onClick={copyLink}
        >
          <Copy size={16} />
          Copy Link
        </Button>

        <Button className=" flex gap-2 items-center justify-center" onClick={onSend}>
          <Send size={16} />
          Send
        </Button>
      </div>
      
      :<Link href={'/scheduled-interview/'+interview?.interview_id+'/details'}>
      <Button className='mt-5 w-full' variant="outline">View Detail <ArrowRight/></Button>
      </Link>
      }
    </div>
  );
}

export default InterviewCard;
