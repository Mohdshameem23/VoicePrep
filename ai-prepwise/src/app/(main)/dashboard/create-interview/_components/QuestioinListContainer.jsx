import React from "react";

const QuestioinListContainer = ({ questionList }) => {
  // Optional: map types to colors
  console.log(questionList)
  const typeColors = {
    Technical: "bg-blue-100 text-blue-800",
    Behavioral: "bg-green-100 text-green-800",
    Experience: "bg-yellow-100 text-yellow-800",
    "Problem Solving": "bg-purple-100 text-purple-800",
  };

  return (
    <div>
      <h2 className="font-bold text-lg mb-5">
        Generated Interview Questions:
      </h2>

      {questionList.map((item, index) => (
        <div
          key={index}
          className="p-4 mb-3 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">
              Q{index + 1}: {item.question}
            </h3>
            <span
              className={`px-2 py-1 rounded-full text-sm font-semibold ${
                typeColors[item.type] || "bg-gray-100 text-gray-800"
              }`}
            >
              {item.type}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestioinListContainer;
