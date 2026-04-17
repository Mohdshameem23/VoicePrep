// // "use client";

// // import React, { useContext, useEffect, useRef, useState } from "react";
// // import { Mic, Phone, Timer } from "lucide-react";
// // import Vapi from "@vapi-ai/web";
// // import AlertConfimation from "./_components/AlertConfimation";
// // import { InterviewDataContext } from "../../../../../context/InterviewDataContext";
// // import { toast } from "sonner";
// // import axios from "axios";
// // import { supabase } from "../../../../../services/supabaseClient";
// // import { useParams, useRouter } from "next/navigation";

// // export default function StartInterview() {
// //   const { interviewInfo } = useContext(InterviewDataContext);
// // console.log(interviewInfo)
// // const[activeUser,setActiveUser]=useState(false);
// // const [conversation, setConversation] = useState();
// // const conversationRef = useRef();
// // useEffect(() => {
// //   conversationRef.current = conversation;
// // }, [conversation]);
// // const{interview_id}=useParams();
// // const router=useRouter();
// //   // ✅ Persist Vapi instance
// //   const vapiRef = useRef(null);
// //   const vapi=new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY)

// //   // ✅ Initialize Vapi ONCE
// //   useEffect(() => {
// //     if (!vapiRef.current) {
// //       const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

// //       if (!publicKey) {
// //         console.error("❌ VAPI Public Key Missing");
// //         return;
// //       }
// //       console.log(publicKey)

// //       vapiRef.current = new Vapi(publicKey);
// //     }
// //   }, []);

// //   // ✅ Start interview when data is ready
// //   useEffect(() => {
// //     if (interviewInfo?.interviewData && vapiRef.current) {
// //       startInterviewCall();
// //     }
// //   }, [interviewInfo]);

// //   // ✅ Start Call
// //   const startInterviewCall = () => {
// //     if (!vapiRef.current) return;
// // console.log("vapi thik jai")
// //     // ✅ Build question list safely
// //     const questionList =
// //       interviewInfo?.interviewData?.questionList
// //         ?.map((q) => q.question)
// //         .join("\n") || "";

// //     const assistantOptions = {
// //       name: "AI Recruiter",

// //       firstMessage: `Hi ${interviewInfo.userName}, how are you? Ready for your interview on ${interviewInfo.interviewData.jobPosition}?`,

// //       transcriber: {
// //         provider: "deepgram",
// //         model: "nova-2",
// //         language: "hi",
// //       },

// // voice: {
// //   provider: "vapi",
// //   voiceId: "Neha",
// // },



// //       model: {
// //         provider: "openai",
// //         model: "gpt-4o-mini",
// //         messages: [
// //           {
// //             role: "system",
// //             content: `

// // You are an AI voice assistant conducting a job interview.

// // Job Role: ${interviewInfo.interviewData.jobPosition}

// // Ask these questions one by one:

// // ${questionList}

// // Rules:

// // • Ask one question at a time
// // • Wait for the answer
// // • Give hints if the user struggles
// // • Provide short encouraging feedback
// // • Stay friendly and professional

// // After 5–7 questions, summarize performance and end positively.
// // `.trim(),
// //           },
// //         ],
// //       },
// //     };

// //     // ✅ Start Vapi call
// //     vapiRef.current.start(assistantOptions);
// //   };

// //   // ✅ Stop Interview
// //   const stopInterview = () => {
// //     if (vapiRef.current) {
// //       vapiRef.current.stop();
// //     }
// //   };
// //   vapi.on("call-start",()=>{
// //     console.log("Call has started");
// //     toast('call connected...');
// //   })
// // vapi.on("speech-start",()=>{
// //   console.log("Assistant speech has startrd")
// //   setActiveUser(false);
// // })
// // vapi.on("speech-end",()=>{
// //   console.log("Assistant speech has ended")
// //   setActiveUser(true);
// // })
// // vapi.on("call-end",()=>{
// //   console.log("Call has ended");
// //   toast("Inteview Ended");
// //   GenerateFeedback();
// // })
// // vapi.on("message",(message)=>{
// //   console.log(message?.conversation)
// //   setConversation(message?.conversation)
// // })
// // const GenerateFeedback = async () => {
// //   console.log("Sending conversation:", conversationRef.current);
// //   if (!conversationRef.current) {
// //     toast("No conversation data available for feedback.");
// //     return;
// //   }
// //   try {
// //     const result = await axios.post('/api/ai-feedback', {
// //       conversation: conversationRef.current
// //     });
// //     if (result.data.error) {
// //       console.error("Feedback API error:", result.data.error);
// //       toast("Feedback generation failed: " + result.data.error);
// //       return;
// //     }
// //     console.log("Feedback API response:", result.data);
// //     const Content = result.data.content;
// //     const FINAL_CONTENT = Content.replace('```json', '').replace('```', '');
// //     console.log("Final feedback content:", FINAL_CONTENT);
// //     const { data, error } = await supabase.from('interview-feedback').insert([
// //       {
// //         userName: interviewInfo?.userName,
// //         userEmail: interviewInfo?.userEmail,
// //         interview_id: interview_id,
// //         feedback: JSON.parse(FINAL_CONTENT),
// //         recommended: false
// //       },
// //     ]).select();
// //     if (error) {
// //       console.error("Supabase insert error:", error);
// //       toast("Failed to save feedback to database.");
// //       return;
// //     }
// //     console.log("Feedback saved:", data);
// //     router.replace('/interview/' + interview_id + "/completed");
// //   } catch (err) {
// //     console.error("GenerateFeedback error:", err);
// //     toast("Feedback generation failed.");
// //   }
// // }

// //   return (
// //    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 lg:px-32 xl:px-48 text-white">

// //   {/* Header */}
// //   <div className="flex justify-between items-center mb-8">
// //     <h2 className="font-bold text-2xl tracking-wide">
// //       AI Interview Session
// //     </h2>

// //     <div className="flex items-center gap-3 bg-slate-700 px-4 py-2 rounded-xl shadow">
// //       <Timer />
// //       <span className="font-mono text-lg">00:00:00</span>
// //     </div>
// //   </div>

// //   {/* Panels */}
// //   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

// //     {/* AI Recruiter */}
// //     <div className="relative bg-slate-800 h-[420px] rounded-2xl border border-slate-700 flex flex-col items-center justify-center shadow-xl">

// //       {/* Ping animation */}
// //       {!activeUser && (
// //         <span className="absolute h-40 w-40 rounded-full bg-blue-500 opacity-30 animate-ping"></span>
// //       )}

// //       <img
// //         className="h-32 w-32 rounded-full border-4 border-blue-500 shadow-lg"
// //         src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
// //         alt="AI Recruiter"
// //       />

// //       <h3 className="mt-4 font-semibold text-lg text-blue-400">
// //         AI Recruiter
// //       </h3>

// //       <p className="text-sm text-gray-400 mt-1">
// //         Speaking...
// //       </p>
// //     </div>

// //     {/* Candidate */}
// //     <div className="bg-slate-800 h-[420px] rounded-2xl border border-slate-700 flex flex-col items-center justify-center shadow-xl">

// //       <div className="h-32 w-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold shadow-lg">
// //         {interviewInfo?.userName?.charAt(0) || "C"}
// //       </div>

// //       <h3 className="mt-4 text-xl font-semibold">
// //         {interviewInfo?.userName || "Candidate"}
// //       </h3>

// //       <p className="text-sm text-gray-400 mt-1">
// //         Listening...
// //       </p>
// //     </div>
// //   </div>

// //   {/* Controls */}
// //   <div className="flex items-center gap-8 justify-center mt-10">

// //     {/* Mic */}
// //     <button className="h-14 w-14 flex items-center justify-center bg-slate-700 hover:bg-slate-600 transition rounded-full shadow-lg">
// //       <Mic className="h-6 w-6" />
// //     </button>

// //     {/* End Call */}
// //     <AlertConfimation stopInterview={stopInterview}>
// //       <button className="h-16 w-16 flex items-center justify-center bg-red-500 hover:bg-red-600 transition rounded-full shadow-xl animate-pulse">
// //         <Phone className="h-7 w-7 text-white" />
// //       </button>
// //     </AlertConfimation>

// //   </div>

// //   {/* Footer */}
// //   <p className="text-center text-gray-400 mt-8 text-sm tracking-wide">
// //     Interview in Progress...
// //   </p>

// // </div>

// //   );
// // }
// "use client";

// import React, { useContext, useEffect, useRef, useState } from "react";
// import { Mic, Phone, Timer } from "lucide-react";
// import Vapi from "@vapi-ai/web";
// import AlertConfimation from "./_components/AlertConfimation";
// import { InterviewDataContext } from "../../../../../context/InterviewDataContext";
// import { toast } from "sonner";
// import axios from "axios";
// import { supabase } from "../../../../../services/supabaseClient";
// import { useParams, useRouter } from "next/navigation";

// export default function StartInterview() {
//   const { interviewInfo } = useContext(InterviewDataContext);

//   const [activeUser, setActiveUser] = useState(true);
//   const [conversation, setConversation] = useState(null);

//   const conversationRef = useRef();
//   const vapiRef = useRef(null);

//   const { interview_id } = useParams();
//   const router = useRouter();

//   // ✅ Keep latest conversation
//   useEffect(() => {
//     conversationRef.current = conversation;
//   }, [conversation]);

//   // ✅ Initialize Vapi ONCE
//   useEffect(() => {
//     const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

//     if (!publicKey) {
//       console.error("❌ Missing VAPI Public Key");
//       return;
//     }

//     vapiRef.current = new Vapi(publicKey);

//     const vapi = vapiRef.current;

//     // ---------------- EVENTS ---------------- //

//     vapi.on("call-start", () => {
//       console.log("Call started");
//       toast("Call connected...");
//     });

//     vapi.on("speech-start", () => {
//       console.log("Assistant speaking");
//       setActiveUser(false);
//     });

//     vapi.on("speech-end", () => {
//       console.log("Assistant stopped");
//       setActiveUser(true);
//     });

//     vapi.on("call-end", () => {
//       console.log("Call ended");
//       toast("Interview Ended");
//       GenerateFeedback();
//     });

// vapi.on("message", (message) => {
//   if (message?.conversation) {
//     console.log("Conversation:", message.conversation);

//     // Save to state
//     setConversation(message.conversation);

//     // Save to ref instantly (IMPORTANT)
//     conversationRef.current = message.conversation;
//   }
// });


//     return () => {
//       vapi.stop();
//     };
//   }, []);

//   // ✅ Start interview when data ready
//   useEffect(() => {
//     if (interviewInfo?.interviewData && vapiRef.current) {
//       startInterviewCall();
//     }
//   }, [interviewInfo]);

//   // ---------------- START CALL ---------------- //

//   const startInterviewCall = () => {
//     const questionList =
//       interviewInfo?.interviewData?.questionList
//         ?.map((q) => q.question)
//         .join("\n") || "";

//     const assistantOptions = {
//       name: "AI Recruiter",

//       firstMessage: `Hi ${interviewInfo.userName}, ready for your interview on ${interviewInfo.interviewData.jobPosition}?`,

//       transcriber: {
//         provider: "deepgram",
//         model: "nova-2",
//         language: "hi", // ✅ Hindi
//       },

//       voice: {
//         provider: "vapi",
//         voiceId: "Neha",
//       },

//       model: {
//         provider: "openai",
//         model: "gpt-4o-mini",
//         messages: [
//           {
//             role: "system",
//             content: `
// You are an AI voice assistant conducting a job interview.

// Job Role: ${interviewInfo.interviewData.jobPosition}

// Ask these questions one by one:

// ${questionList}

// Rules:
// • Ask one question at a time
// • Wait for the answer
// • Give hints if needed
// • Encourage the candidate
// • Stay professional

// After 5–7 questions, summarize performance and end positively.
//             `,
//           },
//         ],
//       },
//     };

//     vapiRef.current.start(assistantOptions);
//   };

//   // ---------------- STOP CALL ---------------- //

//   const stopInterview = () => {
//     vapiRef.current?.stop();
//   };

//   // ---------------- GENERATE FEEDBACK ---------------- //

//   const GenerateFeedback = async () => {
//     console.log("Sending conversation:", conversationRef.current);

//     if (!conversationRef.current) {
//       toast("No conversation data available.");
//       return;
//     }

//     try {
//       const result = await axios.post("/api/ai-feedback", {
//         conversation: conversationRef.current,
//       });

//       if (result.data.error) {
//         toast("Feedback generation failed.");
//         return;
//       }

//       let content = result.data.content;

//       // Remove markdown
//       content = content
//         ?.replace(/```json/g, "")
//         ?.replace(/```/g, "");

//       const FINAL_JSON = JSON.parse(content);

//       // Auto recommendation flag
//       const recommended =
//         FINAL_JSON?.feedback?.rating?.technicalSkills >= 6;

//       const { error } = await supabase
//         .from("interview-feedback")
//         .insert([
//           {
//             userName: interviewInfo?.userName,
//             userEmail: interviewInfo?.userEmail,
//             interview_id: interview_id,
//             feedback: FINAL_JSON,
//             recommended: recommended,
//           },
//         ]);

//       if (error) {
//         console.error(error);
//         toast("Failed to save feedback.");
//         return;
//       }

//       router.replace(`/interview/${interview_id}/completed`);
//     } catch (err) {
//       console.error(err);
//       toast("Feedback generation failed.");
//     }
//   };

//   // ---------------- UI ---------------- //

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 lg:px-32 xl:px-48 text-white">

//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="font-bold text-2xl tracking-wide">
//           AI Interview Session
//         </h2>

//         <div className="flex items-center gap-3 bg-slate-700 px-4 py-2 rounded-xl shadow">
//           <Timer />
//           <span className="font-mono text-lg">00:00:00</span>
//         </div>
//       </div>

//       {/* Panels */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//         {/* AI Recruiter */}
//         <div className="relative bg-slate-800 h-[420px] rounded-2xl border border-slate-700 flex flex-col items-center justify-center shadow-xl">

//           {!activeUser && (
//             <span className="absolute h-40 w-40 rounded-full bg-blue-500 opacity-30 animate-ping"></span>
//           )}

//           <img
//             className="h-32 w-32 rounded-full border-4 border-blue-500 shadow-lg"
//             src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
//             alt="AI Recruiter"
//           />

//           <h3 className="mt-4 font-semibold text-lg text-blue-400">
//             AI Recruiter
//           </h3>

//           <p className="text-sm text-gray-400 mt-1">
//             {activeUser ? "Listening..." : "Speaking..."}
//           </p>
//         </div>

//         {/* Candidate */}
//         <div className="bg-slate-800 h-[420px] rounded-2xl border border-slate-700 flex flex-col items-center justify-center shadow-xl">

//           <div className="h-32 w-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold shadow-lg">
//             {interviewInfo?.userName?.charAt(0) || "C"}
//           </div>

//           <h3 className="mt-4 text-xl font-semibold">
//             {interviewInfo?.userName || "Candidate"}
//           </h3>

//           <p className="text-sm text-gray-400 mt-1">
//             Responding...
//           </p>
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="flex items-center gap-8 justify-center mt-10">

//         <button className="h-14 w-14 flex items-center justify-center bg-slate-700 hover:bg-slate-600 transition rounded-full shadow-lg">
//           <Mic className="h-6 w-6" />
//         </button>

//         <AlertConfimation stopInterview={stopInterview}>
//           <button className="h-16 w-16 flex items-center justify-center bg-red-500 hover:bg-red-600 transition rounded-full shadow-xl animate-pulse">
//             <Phone className="h-7 w-7 text-white" />
//           </button>
//         </AlertConfimation>

//       </div>

//       <p className="text-center text-gray-400 mt-8 text-sm tracking-wide">
//         Interview in Progress...
//       </p>
//     </div>
//   );
// }
"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { Mic, Phone, Timer } from "lucide-react";
import Vapi from "@vapi-ai/web";
import AlertConfimation from "./_components/AlertConfimation";
import { InterviewDataContext } from "../../../../../context/InterviewDataContext";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "../../../../../services/supabaseClient";
import { useParams, useRouter } from "next/navigation";

export default function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);

  const [activeUser, setActiveUser] = useState(true);
  const [conversation, setConversation] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [started, setStarted] = useState(false);

  // -------- TIMER STATES -------- //
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  const conversationRef = useRef(null);
  const vapiRef = useRef(null);

  const { interview_id } = useParams();
  const router = useRouter();

  // -------- FORMAT TIMER -------- //
  const formatTime = (secs) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const sec = secs % 60;

    return [
      hrs.toString().padStart(2, "0"),
      mins.toString().padStart(2, "0"),
      sec.toString().padStart(2, "0"),
    ].join(":");
  };

  // -------- KEEP CONVERSATION -------- //
  useEffect(() => {
    conversationRef.current = conversation;
  }, [conversation]);

  // -------- INIT VAPI -------- //
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

    if (!publicKey) {
      console.error("Missing VAPI Key");
      return;
    }

    vapiRef.current = new Vapi(publicKey);
    const vapi = vapiRef.current;

    // CALL START
    vapi.on("call-start", () => {
      toast("Call connected...");
      setCallActive(true);

      // START TIMER
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    });

    // AI SPEAKING
    vapi.on("speech-start", () => {
      setActiveUser(false);
    });

    vapi.on("speech-end", () => {
      setActiveUser(true);
    });

    // CALL END
    vapi.on("call-end", () => {
      toast("Interview Ended");
      setCallActive(false);

      // STOP TIMER
      clearInterval(timerRef.current);

      GenerateFeedback();
    });

    // CONVERSATION
    vapi.on("message", (message) => {
      if (message?.conversation) {
        setConversation(message.conversation);
        conversationRef.current = message.conversation;
      }
    });

    return () => {
      vapi.stop();
      clearInterval(timerRef.current);
    };
  }, []);

  // -------- AUTO START ONCE -------- //
  useEffect(() => {
    if (
      interviewInfo?.interviewData &&
      vapiRef.current &&
      !started
    ) {
      startInterviewCall();
      setStarted(true);
    }
  }, [interviewInfo, started]);

  // -------- START CALL -------- //
  const startInterviewCall = () => {
    if (!vapiRef.current) return;

    const questionList =
      interviewInfo?.interviewData?.questionList
        ?.map((q) => q.question)
        .join("\n") || "";

    const assistantOptions = {
      name: "AI Recruiter",

      firstMessage: `Hi ${interviewInfo.userName}, ready for your interview on ${interviewInfo.interviewData.jobPosition}?`,

      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "hi",
      },

      voice: {
        provider: "vapi",
        voiceId: "Neha",
      },

      model: {
        provider: "openai",
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting a job interview.

Job Role: ${interviewInfo.interviewData.jobPosition}

Ask these questions one by one:

${questionList}

Rules:
• Ask one question at a time
• Wait for the answer
• Encourage the candidate
• Stay professional

After 5–7 questions, summarize performance and end positively.
            `,
          },
        ],
      },
    };

    vapiRef.current.start(assistantOptions);
  };

  // -------- STOP CALL -------- //
  const stopInterview = () => {
    if (!callActive) {
      toast("No active call running");
      return;
    }

    vapiRef.current?.stop();
    clearInterval(timerRef.current);
    setCallActive(false);
  };

  // -------- FEEDBACK -------- //
  const GenerateFeedback = async () => {
    if (!conversationRef.current) {
      toast("No conversation data available.");
      return;
    }

    try {
      const result = await axios.post("/api/ai-feedback", {
        conversation: conversationRef.current,
      });

      let content = result.data.content;

      content = content
        ?.replace(/```json/g, "")
        ?.replace(/```/g, "").trim();

      const FINAL_JSON = JSON.parse(content);

      const recommended =
        FINAL_JSON?.feedback?.rating?.technicalSkills >= 6;

      const { error } = await supabase
        .from("interview-feedback")
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id: interview_id,
            feedback: FINAL_JSON,
            recommended: recommended,
          },
        ]);

      if (error) {
        toast("Failed to save feedback.");
        return;
      }

      router.replace(`/interview/${interview_id}/completed`);
    } catch (err) {
      console.error(err);
      toast("Feedback generation failed.");
    }
  };

  // -------- UI -------- //
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 lg:px-32 xl:px-48 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-bold text-2xl">
          AI Interview Session
        </h2>

        <div className="flex items-center gap-3 bg-slate-700 px-4 py-2 rounded-xl shadow">
          <Timer />
          <span className="font-mono text-lg">
            {formatTime(seconds)}
          </span>
        </div>
      </div>

      {/* PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* AI */}
        <div className="relative bg-slate-800 h-[420px] rounded-2xl border flex flex-col items-center justify-center">

          {!activeUser && (
            <span className="absolute h-40 w-40 rounded-full bg-blue-500 opacity-30 animate-ping"></span>
          )}

          <img
            className="h-32 w-32 rounded-full border-4 border-blue-500"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
            alt="AI"
          />

          <h3 className="mt-4 text-blue-400 font-semibold">
            AI Recruiter
          </h3>

          <p className="text-gray-400">
            {activeUser ? "Listening..." : "Speaking..."}
          </p>
        </div>

        {/* USER */}
        <div className="bg-slate-800 h-[420px] rounded-2xl border flex flex-col items-center justify-center">

          <div className="h-32 w-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold">
            {interviewInfo?.userName?.charAt(0) || "C"}
          </div>

          <h3 className="mt-4 text-xl font-semibold">
            {interviewInfo?.userName || "Candidate"}
          </h3>

          <p className="text-gray-400">Responding...</p>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center gap-8 justify-center mt-10">

        <button className="h-14 w-14 bg-slate-700 rounded-full flex items-center justify-center">
          <Mic />
        </button>

        <AlertConfimation stopInterview={stopInterview}>
          <button className="h-16 w-16 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <Phone className="text-white" />
          </button>
        </AlertConfimation>

      </div>

      <p className="text-center text-gray-400 mt-8">
        Interview in Progress...
      </p>
    </div>
  );
}
