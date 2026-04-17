import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import QuestioinListContainer from "./QuestioinListContainer";
import { useUser } from "../../../../../../context/userDetailContext";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../../../../../services/supabaseClient";

const QuestionList = ({ formData, onCreateLink }) => {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  // Function to call AI API
  const GenerateQuestionList = async () => {
    if (!formData) return;

    setLoading(true);

    try {
      const result = await axios.post("/api/ai-model", { ...formData });
      console.log("Raw API response:", result.data);

      let questions = [];
      const content = result.data?.content;

      if (content) {
        if (typeof content === "string") {
          // Remove backticks if present
          const clean = content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

          // Only try to parse if it looks like JSON
          if (clean.startsWith("{") || clean.startsWith("[")) {
            try {
              const parsed = JSON.parse(clean);
              questions = parsed.interviewQuestions ?? [];
            } catch (e) {
              console.error("Failed to parse AI response string:", e);
              toast.error(
                "AI service returned an unexpected response. Please try again."
              );
              questions = [];
            }
          } else {
            // Not JSON, just show a toast with the message
            toast.error(clean);
            questions = [];
          }
        } else if (Array.isArray(content.interviewQuestions)) {
          questions = content.interviewQuestions;
        }
      }

      setQuestionList(Array.isArray(questions) ? questions : []);

      if (!questions.length) {
        toast(
          "No questions returned from the AI. Check console for raw response."
        );
      }
    } catch (error) {
      console.error("Error generating questions:", error);

      if (error.response?.status === 429) {
        toast("AI service is busy or rate-limited. Please wait a few minutes.");
      } else {
        toast("Server Error. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to save questions to Supabase
  const onFinish = async () => {
    if (!questionList.length) {
      toast("Generate questions first!");
      return;
    }

    // Validate required fields
    const requiredFields = [
      'jobPosition',
      'jobDescription',
      'interviewDuration',
      'interviewType'
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Missing required field: ${field}`);
        return;
      }
    }
    if (!user?.email) {
      toast.error('User email is missing.');
      return;
    }

    setSaveLoading(true);
    const interview_id = uuidv4();
    console.log(interview_id);

    const insertObj = {
      jobPosition: formData.jobPosition,
      jobDescription: formData.jobDescription,
      interviewDuration: formData.interviewDuration,
      type: formData.interviewType, // use 'type' for the column
      questionList, // insert array directly for json column
      userEmail: user.email,
      interview_id,
    };

    const { data, error } = await supabase
      .from("Interview")
      .insert([insertObj])
      .select();

    setSaveLoading(false);

    onCreateLink(interview_id);
    if (error) {
      toast.error("Failed to save interview. Try again!");
    } else {
      toast.success("Interview saved successfully!");
    }
  };

  return (
    <div>
      {/* Generate Questions Button */}
      <div className="mb-5">
        <Button onClick={GenerateQuestionList} disabled={loading}>
          {loading ? "Generating..." : "Generate Questions"}
        </Button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="p-5 bg-blue-50 rounded-2xl border border-primary flex gap-5 items-center mb-5">
          <Loader2 className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-primary">
              Our AI is crafting personalized questions based on your job
              position
            </p>
          </div>
        </div>
      )}

      {/* Questions List */}
      {Array.isArray(questionList) && questionList.length > 0 ? (
        <div className="mt-5 flex flex-col gap-4">
          <QuestioinListContainer questionList={questionList} />
        </div>
      ) : (
        !loading && <p>No questions yet. Click "Generate Questions".</p>
      )}

      {/* Finish Button */}
      <div className="flex justify-end mt-10">
        <Button onClick={onFinish} disabled={saveLoading}>
          Create Interview Link & Finish
        </Button>
        {saveLoading && <Loader2 className="animate-spin ml-2" />}
      </div>
    </div>
  );
};

export default QuestionList;
