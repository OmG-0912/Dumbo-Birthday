"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Edit3, Check, X, Heart } from "lucide-react";
import { WaxSealBadge } from "@/components/ui/WaxSealBadge";

interface BirthdayLetterStageProps {
  title: string;
  date: string;
  salutation: string;
  body: string[];
  closing: string;
  signature: string;
  onUpdateLetter: (updates: {
    title?: string;
    date?: string;
    salutation?: string;
    body?: string[];
    closing?: string;
    signature?: string;
  }) => void;
  onContinue: () => void;
}

export const BirthdayLetterStage: React.FC<BirthdayLetterStageProps> = ({
  title,
  date,
  salutation,
  body,
  closing,
  signature,
  onUpdateLetter,
  onContinue,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editSalutation, setEditSalutation] = useState(salutation);
  const [editText, setEditText] = useState(body.join("\n\n"));
  const [editClosing, setEditClosing] = useState(closing);
  const [editSignature, setEditSignature] = useState(signature);

  const handleSave = () => {
    const paragraphs = editText
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    onUpdateLetter({
      title: editTitle,
      salutation: editSalutation,
      body: paragraphs.length > 0 ? paragraphs : body,
      closing: editClosing,
      signature: editSignature,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditSalutation(salutation);
    setEditText(body.join("\n\n"));
    setEditClosing(closing);
    setEditSignature(signature);
    setIsEditing(false);
  };

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold text-[#172D29]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={i} className="italic text-[#172D29]">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  return (
    <section className="py-12 sm:py-16">
      {/* Stage Badge */}
      <div className="text-center max-w-xl mx-auto mb-8 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5ED] border border-[#B88B4A]/30 text-[#B88B4A] text-xs font-semibold uppercase tracking-[0.25em] mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#B88B4A]" />
          <span>Stage IV • The Birthday Letter</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#172D29] tracking-tight">
          Words Held in the Heart
        </h2>
      </div>

      {/* =========================================================================
          THE LETTER PARCHMENT CONTAINER
         ========================================================================= */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative rounded-3xl bg-[#FAF6EE] border border-[#B88B4A]/40 shadow-storybook-lg p-6 sm:p-10 md:p-14 overflow-hidden">
          {/* Deckle Edge Paper Gradient */}
          <div className="absolute inset-0 bg-deckle-edge opacity-30 pointer-events-none" />

          {/* Delicate Inset Floral Border */}
          <div className="absolute inset-3 sm:inset-5 rounded-2xl border border-dashed border-[#B88B4A]/30 pointer-events-none" />

          {/* Letter Header */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#B88B4A]/25 pb-6 mb-8 gap-4">
            <div>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#B88B4A] block mb-1">
                {date}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#172D29]">
                {title}
              </h3>
            </div>

            {/* Edit Letter Action Button */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#60463E] hover:text-[#172D29] text-xs font-medium border border-[#B88B4A]/30 shadow-xs transition-colors"
                title="Edit the letter text"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#B88B4A]" />
                <span>Edit Letter</span>
              </button>
            )}
          </div>

          {/* =====================================================================
              LETTER BODY (Reading Mode or Editing Mode)
             ===================================================================== */}
          {isEditing ? (
            <div className="relative z-10 space-y-4">
              <div className="bg-amber-50/70 border border-amber-200 text-amber-900 text-xs p-3 rounded-xl mb-4">
                <strong>Edit Mode:</strong> Paste your final letter text below. Separate paragraphs with a blank line. Changes are saved instantly.
              </div>

              <div>
                <label className="block text-xs font-serif font-semibold text-[#172D29] mb-1">
                  Letter Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full font-serif text-lg text-[#172D29] bg-white border border-[#B88B4A]/40 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#B88B4A]"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-semibold text-[#172D29] mb-1">
                  Salutation
                </label>
                <input
                  type="text"
                  value={editSalutation}
                  onChange={(e) => setEditSalutation(e.target.value)}
                  className="w-full font-serif text-base text-[#172D29] bg-white border border-[#B88B4A]/40 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#B88B4A]"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-semibold text-[#172D29] mb-1">
                  Letter Paragraphs (separate with double line breaks)
                </label>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={10}
                  className="w-full font-serif text-base leading-relaxed text-[#3D2A24] bg-white border border-[#B88B4A]/40 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#B88B4A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif font-semibold text-[#172D29] mb-1">
                    Closing
                  </label>
                  <input
                    type="text"
                    value={editClosing}
                    onChange={(e) => setEditClosing(e.target.value)}
                    className="w-full font-serif text-sm text-[#172D29] bg-white border border-[#B88B4A]/40 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#B88B4A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif font-semibold text-[#172D29] mb-1">
                    Signature
                  </label>
                  <input
                    type="text"
                    value={editSignature}
                    onChange={(e) => setEditSignature(e.target.value)}
                    className="w-full font-serif text-sm text-[#172D29] bg-white border border-[#B88B4A]/40 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#B88B4A]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#B88B4A]/20">
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-[#60463E] hover:underline"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#172D29] text-[#FDE08B] text-xs font-medium hover:bg-[#1E3B36] shadow-md"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Letter</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative z-10 space-y-6">
              {/* Salutation */}
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#172D29] italic">
                {renderFormattedText(salutation)}
              </div>

              {/* Paragraphs with elegant drop cap on the first paragraph */}
              {body.map((para, idx) => {
                const isAllBold = para.startsWith("**") && para.endsWith("**");
                const cleanPara = isAllBold ? para.slice(2, -2) : para;

                if (idx === 0) {
                  const firstLetter = cleanPara.charAt(0);
                  const remainder = cleanPara.slice(1);
                  return (
                    <p
                      key={idx}
                      className="font-serif text-base sm:text-lg md:text-xl text-[#3D2A24] leading-relaxed sm:leading-loose"
                    >
                      <span className="float-left font-serif text-4xl sm:text-5xl font-bold text-[#B88B4A] pr-3 pt-1 leading-none">
                        {firstLetter}
                      </span>
                      {renderFormattedText(remainder)}
                    </p>
                  );
                }

                if (isAllBold) {
                  return (
                    <p
                      key={idx}
                      className="font-serif text-base sm:text-lg md:text-xl text-[#172D29] font-bold leading-relaxed sm:leading-loose bg-[#FDE08B]/20 border-l-3 border-[#B88B4A] pl-4 pr-2 py-2 my-3 rounded-r-xl"
                    >
                      {renderFormattedText(cleanPara)}
                    </p>
                  );
                }

                return (
                  <p
                    key={idx}
                    className="font-serif text-base sm:text-lg md:text-xl text-[#3D2A24] leading-relaxed sm:leading-loose"
                  >
                    {renderFormattedText(para)}
                  </p>
                );
              })}

              {/* Closing & Signature */}
              <div className="pt-8 border-t border-[#B88B4A]/20 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <p className="font-serif italic text-base sm:text-lg text-[#60463E]">
                    {closing}
                  </p>
                  <p className="font-serif font-bold text-xl sm:text-2xl text-[#172D29] mt-1">
                    {renderFormattedText(signature)}
                  </p>
                </div>

                {/* Wax Seal Stamp of Authenticity */}
                <div className="self-end sm:self-auto flex items-center gap-2">
                  <WaxSealBadge label="A" size="md" variant="gold" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation to Next Stage */}
      <div className="mt-12 text-center">
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#172D29] hover:bg-[#1E3B36] text-[#FDE08B] font-semibold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-celestial-glow transition-all duration-300 hover:scale-105 active:scale-95 group"
        >
          <span>Unwrap the Hidden Surprise</span>
          <ArrowRight className="w-4 h-4 text-[#FDE08B] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
