"use client";
import { useState } from "react";
import Fetch from "./components/Fetch";
import Image from "next/image";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [submittedIdea, setSubmittedIdea] = useState("");

  const handleSubmit = () => {
    if (idea.trim() === "") return;
    setSubmittedIdea(idea.trim());
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-8 md:px-16 pt-12 font-sans text-[#00296B] bg-[#F5F9FF]">
      {/* Header */}
      <header className="w-full max-w-5xl mb-10 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <div className="flex items-center gap-2.5 font-extrabold text-2xl text-[#00296B]">
          <div className="bg-gradient-to-br from-[#F9AC19] to-[#FF6600] rounded-full w-10 h-10 flex items-center justify-center text-white font-black text-xl">
            💡
          </div>
          IdeaForge
        </div>
        <Image
          src="/logo.png"
          alt="IdeaForge Logo"
          width={100}
          height={100}
          className="rounded-full"
        />
      </header>

      {/* Main Section */}
      <main className="w-full max-w-5xl bg-white bg-opacity-90 rounded-2xl px-6 py-8 md:p-10 shadow-lg text-center">
        <div className="inline-block bg-[#FFF7D6] rounded-3xl px-4 py-1 mb-4 text-[#00296B] font-semibold text-sm shadow-[0_2px_8px_rgba(249,172,25,0.4)]">
          ✨ AI-Powered Business Ideas
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold leading-tight mb-4 text-[#00296B]">
          Transform Your <span className="text-[#F9AC19]">Vision Into</span>{" "}
          <span className="bg-gradient-to-r from-[#FF6600] to-[#7E3F1E] bg-clip-text text-transparent">
            Reality
          </span>
        </h1>

        <p className="text-[#0047AB] max-w-xl mx-auto mb-8 text-base leading-relaxed">
          Discover innovative business opportunities tailored to your interests.
          Our AI generates unique, market-ready ideas that could be your next
          big breakthrough.
        </p>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="text"
            placeholder="e.g., sustainable tech, fitness, education"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="
              w-full sm:w-[400px]
              px-5 py-3 rounded-xl border-2 border-[#A3D3FF]
              text-[#00296B] font-medium text-base
              shadow-[0_2px_10px_rgba(163,211,255,0.5)]
              outline-none
              focus:border-[#FF6600]
              transition
            "
          />

          <button
            onClick={handleSubmit}
            className="
              bg-gradient-to-r from-[#F9AC19] to-[#FF6600]
              rounded-xl px-7 py-3
              text-[#00296B] font-extrabold text-base
              cursor-pointer
              shadow-[0_6px_12px_rgba(249,172,25,0.7)]
              flex items-center justify-center gap-2
              transition
              hover:from-[#FF6600] hover:to-[#F9AC19]
              select-none
            "
          >
            <span className="text-xl">🚀</span> Generate Ideas
          </button>
        </div>
      </main>

      {/* Results Section */}
      <section
        className="
          w-full max-w-5xl mt-10 p-5
          bg-white rounded-2xl
          shadow-[0_6px_24px_rgba(0,0,0,0.12)]
          min-h-[160px]
        "
      >
        <Fetch idea={submittedIdea} />
      </section>
    </div>
  );
}
