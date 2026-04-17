import React, { createContext, useContext, useState } from "react";

export const InterviewDataContext = createContext();

export const InterviewDataProvider = ({ children }) => {
	const [interviewInfo, setInterviewInfo] = useState();
	return (
		<InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
			{children}
		</InterviewDataContext.Provider>
	);
};

export const useInterviewData = () => {
	const context = useContext(InterviewDataContext);
	if (context === undefined) {
		throw new Error("useInterviewData must be used within an InterviewDataProvider");
	}
	return context;
};
