"use client";
import React, { useState, useEffect } from "react";

function Fetch({ idea }) {
  const [finishedData, setFinishedData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!idea) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setFinishedData([]);

      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `
                      Act as an experienced entrepreneur and industry analyst. Based on the ${idea}, generate 5 innovative, realistic, and low-to-medium budget business ideas. 

                      Return the results strictly in this JSON format:

                      [
                        {
                          "name": "",
                          "targetAudience": "",
                          "problemSolved": "",
                          "howItWorks": "",
                          "marketPotential": "",
                          "monetization": "",
                          "marketingStrategy": ""
                        }
                      ]

                      Assume the founder is starting solo with limited capital. Do not include anything outside the JSON.
                    `,
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await res.json();
        const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        let clean = output.trim();

        if (clean.startsWith("```")) {
          clean = clean.replace(/```json|```/g, "").trim();
        }

        const ideas = JSON.parse(clean);

        setFinishedData(ideas);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idea]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[160px] text-[#00296B]">
        <svg
          className="animate-spin h-10 w-10 text-[#F9AC19] mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="#F9AC19"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <p className="text-lg font-semibold">Generating ideas...</p>
      </div>
    );

  if (error)
    return <div className="text-red-600 font-semibold">Error: {error}</div>;

  if (!finishedData.length)
    return (
      <p className="text-[#00296B] font-medium min-h-[160px] flex items-center justify-center text-center px-4">
        Enter a topic and generate business ideas.
      </p>
    );

  return (
    <div className="space-y-8">
      {finishedData.map((idea, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-extrabold text-[#00296B] mb-3 break-words">
            {idea.name}
          </h3>

          <p className="mb-2 text-[#0047AB] break-words">
            <strong className="font-semibold text-[#F9AC19]">Audience:</strong>{" "}
            {idea.targetAudience}
          </p>
          <p className="mb-2 text-[#0047AB] break-words">
            <strong className="font-semibold text-[#F9AC19]">Problem:</strong>{" "}
            {idea.problemSolved}
          </p>
          <p className="mb-2 text-[#0047AB] break-words">
            <strong className="font-semibold text-[#F9AC19]">
              How it Works:
            </strong>{" "}
            {idea.howItWorks}
          </p>
          <p className="mb-2 text-[#0047AB] break-words">
            <strong className="font-semibold text-[#F9AC19]">
              Market Potential:
            </strong>{" "}
            {idea.marketPotential}
          </p>
          <p className="mb-2 text-[#0047AB] break-words">
            <strong className="font-semibold text-[#F9AC19]">
              Monetization:
            </strong>{" "}
            {idea.monetization}
          </p>
          <p className="text-[#0047AB] break-words">
            <strong className="font-semibold text-[#F9AC19]">
              Marketing Strategy:
            </strong>{" "}
            {idea.marketingStrategy}
          </p>

          {idx !== finishedData.length - 1 && (
            <hr className="mt-6 border-t border-[#F9AC19] opacity-50" />
          )}
        </div>
      ))}
    </div>
  );
}

export default Fetch;
