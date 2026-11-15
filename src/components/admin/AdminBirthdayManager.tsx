"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Sparkles,
  Camera,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  Edit2,
  Volume2,
  Mic,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import { useBirthdayData } from "@/lib/birthdayStore";
import { BirthdayPhoto } from "@/types/birthday";
import { StorybookAudioPlayer } from "@/components/media/StorybookAudioPlayer";

export const AdminBirthdayManager: React.FC = () => {
  const {
    data,
    updatePhoto,
    addPhoto,
    deletePhoto,
    updateLetter,
    updateSurprise,
    saveData,
    resetToDefault,
  } = useBirthdayData();

  const [notification, setNotification] = useState<string | null>(null);

  // Envelope and Greeting State
  const [tagline, setTagline] = useState(data.envelopeTagline);
  const [title, setTitle] = useState(data.title);
  const [subtitle, setSubtitle] = useState(data.subtitle);

  // Letter State
  const [letterTitle, setLetterTitle] = useState(data.letterTitle);
  const [letterSalutation, setLetterSalutation] = useState(data.letterSalutation);
  const [letterBodyText, setLetterBodyText] = useState(data.letterBody.join("\n\n"));
  const [letterClosing, setLetterClosing] = useState(data.letterClosing);
  const [letterSignature, setLetterSignature] = useState(data.letterSignature);

  // Surprise State
  const [surpriseMessage, setSurpriseMessage] = useState(data.giftBoxMessage);
  const [surpriseQuote, setSurpriseQuote] = useState(data.giftBoxQuote);
  const [voiceNoteUrl, setVoiceNoteUrl] = useState(data.voiceNoteUrl || "");
  const [voiceNote2Url, setVoiceNote2Url] = useState(data.voiceNote2Url || "");

  // Photo & Audio Upload Refs
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const audioInput1Ref = useRef<HTMLInputElement | null>(null);
  const audioInput2Ref = useRef<HTMLInputElement | null>(null);
  const [uploadTargetPhotoId, setUploadTargetPhotoId] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveAll = () => {
    const paragraphs = letterBodyText
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    saveData({
      ...data,
      envelopeTagline: tagline,
      title: title,
      subtitle: subtitle,
      letterTitle: letterTitle,
      letterSalutation: letterSalutation,
      letterBody: paragraphs.length > 0 ? paragraphs : data.letterBody,
      letterClosing: letterClosing,
      letterSignature: letterSignature,
      giftBoxMessage: surpriseMessage,
      giftBoxQuote: surpriseQuote,
      voiceNoteUrl: voiceNoteUrl,
      voiceNote2Url: voiceNote2Url,
    });

    showNotify("Birthday experience updated successfully!");
  };

  const handleTriggerPhotoUpload = (photoId?: string) => {
    setUploadTargetPhotoId(photoId || null);
    if (photoInputRef.current) {
      photoInputRef.current.value = "";
      photoInputRef.current.click();
    }
  };

  const handlePhotoFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (!base64) return;

      if (uploadTargetPhotoId) {
        updatePhoto(uploadTargetPhotoId, { url: base64, isPlaceholder: false });
        showNotify("Photograph replaced successfully!");
      } else {
        const newPhoto: BirthdayPhoto = {
          id: `bday-photo-${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, "") || "Cherished Photograph",
          caption: "Special memory of Anavi.",
          url: base64,
          date: "16 November",
          isPolaroid: true,
          rotation: "rotate-1",
          isPlaceholder: false,
        };
        addPhoto(newPhoto);
        showNotify("New photograph added successfully!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAudio1FileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setVoiceNoteUrl(base64);
        updateSurprise({ voiceNoteUrl: base64 });
        showNotify("Voice note Part 1 attached!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAudio2FileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setVoiceNote2Url(base64);
        updateSurprise({
          voiceNote2Url: base64,
          voiceNote2Title: file.name.replace(/\.[^/.]+$/, "") || "Part II: Personal Voice Keepsake",
          voiceNote2Subtitle: "Recorded with love • Ready to listen",
        });
        showNotify("Voice note Part 2 attached!");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-10">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={photoInputRef}
        onChange={handlePhotoFileSelected}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={audioInput1Ref}
        onChange={handleAudio1FileSelected}
        accept="audio/*"
        className="hidden"
      />
      <input
        type="file"
        ref={audioInput2Ref}
        onChange={handleAudio2FileSelected}
        accept="audio/*"
        className="hidden"
      />

      {/* Top Banner with Preview Link */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#FAF5ED] to-[#F5ECE0] border border-[#B88B4A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B88B4A] mb-1">
            <Heart className="w-3.5 h-3.5 fill-[#D6A0A0] text-[#D6A0A0]" />
            <span>16 November Special Experience</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#172D29]">
            Anavi&apos;s Birthday Experience Manager
          </h3>
          <p className="font-serif italic text-sm text-[#60463E] mt-0.5">
            Customize the 5-stage birthday surprise: envelope, reveal text, photos, personal letter, and secret voice note.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/birthday"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#172D29] hover:bg-[#1E3B36] text-[#FDE08B] font-medium text-xs sm:text-sm shadow-md transition-all hover:scale-105"
          >
            <span>Preview Birthday Route</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {notification && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Section 1: Envelope & Title Settings */}
      <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#B88B4A]/30 space-y-4">
        <h4 className="font-serif text-lg font-bold text-[#172D29] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B88B4A]" />
          <span>Stage 1 & 2: Greetings & Envelope Tagline</span>
        </h4>

        <div>
          <label className="block text-xs font-semibold text-[#60463E] mb-1">
            Envelope Tagline (Stage 1)
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full text-sm font-serif italic bg-white border border-[#B88B4A]/30 rounded-xl px-3.5 py-2 text-[#172D29] focus:outline-none focus:ring-1 focus:ring-[#B88B4A]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#60463E] mb-1">
              Main Greeting Title (Stage 2)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm font-serif font-bold bg-white border border-[#B88B4A]/30 rounded-xl px-3.5 py-2 text-[#172D29] focus:outline-none focus:ring-1 focus:ring-[#B88B4A]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#60463E] mb-1">
              Reveal Subtitle (Stage 2)
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full text-sm font-serif italic bg-white border border-[#B88B4A]/30 rounded-xl px-3.5 py-2 text-[#172D29] focus:outline-none focus:ring-1 focus:ring-[#B88B4A]"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Personal Birthday Letter */}
      <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#B88B4A]/30 space-y-4">
        <h4 className="font-serif text-lg font-bold text-[#172D29] flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#D6A0A0]" />
          <span>Stage 4: Personal Birthday Letter</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#60463E] mb-1">
              Letter Title
            </label>
            <input
              type="text"
              value={letterTitle}
              onChange={(e) => setLetterTitle(e.target.value)}
              className="w-full text-sm font-serif bg-white border border-[#B88B4A]/30 rounded-xl px-3.5 py-2 text-[#172D29]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#60463E] mb-1">
              Salutation
            </label>
            <input
              type="text"
              value={letterSalutation}
              onChange={(e) => setLetterSalutation(e.target.value)}
              className="w-full text-sm font-serif bg-white border border-[#B88B4A]/30 rounded-xl px-3.5 py-2 text-[#172D29]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#60463E] mb-1">
            Letter Body (paragraphs separated by blank line)
          </label>
          <textarea
            value={letterBodyText}
            onChange={(e) => setLetterBodyText(e.target.value)}
            rows={8}
            className="w-full text-sm font-serif leading-relaxed bg-white border border-[#B88B4A]/30 rounded-xl p-3.5 text-[#3D2A24]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#60463E] mb-1">
              Closing
            </label>
            <input
              type="text"
              value={letterClosing}
              onChange={(e) => setLetterClosing(e.target.value)}
              className="w-full text-sm font-serif bg-white border border-[#B88B4A]/30 rounded-xl px-3.5 py-2 text-[#172D29]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#60463E] mb-1">
              Signature
            </label>
            <input
              type="text"
              value={letterSignature}
              onChange={(e) => setLetterSignature(e.target.value)}
              className="w-full text-sm font-serif bg-white border border-[#B88B4A]/30 rounded-xl px-3.5 py-2 text-[#172D29]"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Photo Gallery Manager */}
      <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#B88B4A]/30 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-serif text-lg font-bold text-[#172D29] flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#B88B4A]" />
            <span>Stage 3: Photograph Gallery ({data.photos.length} Photos)</span>
          </h4>
          <button
            onClick={() => handleTriggerPhotoUpload()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#172D29] text-[#FDE08B] text-xs font-medium hover:bg-[#1E3B36]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload New Photo</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.photos.map((photo) => (
            <div
              key={photo.id}
              className="p-3 rounded-2xl bg-white border border-[#B88B4A]/25 space-y-2 shadow-xs"
            >
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  className="object-cover"
                />
                {photo.isPlaceholder && (
                  <span className="absolute top-1.5 left-1.5 bg-black/70 text-[#FDE08B] text-[9px] font-semibold px-2 py-0.5 rounded">
                    Placeholder
                  </span>
                )}
              </div>

              <div>
                <input
                  type="text"
                  value={photo.title}
                  onChange={(e) => updatePhoto(photo.id, { title: e.target.value })}
                  className="w-full text-xs font-serif font-bold text-[#172D29] bg-transparent border-b border-transparent hover:border-[#B88B4A]/30 focus:border-[#B88B4A] focus:outline-none"
                  placeholder="Photo Title"
                />
                <textarea
                  value={photo.caption}
                  onChange={(e) => updatePhoto(photo.id, { caption: e.target.value })}
                  rows={2}
                  className="w-full text-[11px] font-serif italic text-[#60463E] bg-transparent border-b border-transparent hover:border-[#B88B4A]/30 focus:border-[#B88B4A] focus:outline-none resize-none mt-1"
                  placeholder="Photo Caption"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-black/5 text-xs">
                <button
                  onClick={() => handleTriggerPhotoUpload(photo.id)}
                  className="text-xs text-[#B88B4A] hover:underline flex items-center gap-1"
                >
                  <Camera className="w-3 h-3" />
                  <span>Replace Photo</span>
                </button>
                {data.photos.length > 1 && (
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Hidden Surprise & Voice Note */}
      <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#B88B4A]/30 space-y-4">
        <h4 className="font-serif text-lg font-bold text-[#172D29] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B88B4A]" />
          <span>Stage 5: Hidden Surprise & Voice Note</span>
        </h4>

        <div>
          <label className="block text-xs font-semibold text-[#60463E] mb-1">
            Personal Secret Message (Revealed upon opening gift box)
          </label>
          <textarea
            value={surpriseMessage}
            onChange={(e) => setSurpriseMessage(e.target.value)}
            rows={3}
            className="w-full text-sm font-serif italic bg-white border border-[#B88B4A]/30 rounded-xl p-3 text-[#172D29]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#60463E] mb-1">
            Special Quote / Verse
          </label>
          <input
            type="text"
            value={surpriseQuote}
            onChange={(e) => setSurpriseQuote(e.target.value)}
            className="w-full text-sm font-serif bg-white border border-[#B88B4A]/30 rounded-xl px-3.5 py-2 text-[#172D29]"
          />
        </div>

        {/* Voice Note Part 1 */}
        <div className="pt-2 border-t border-[#B88B4A]/20">
          <label className="block text-xs font-semibold text-[#60463E] mb-1">
            Voice Keepsake Part 1 (Recorded)
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={() => audioInput1Ref.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#172D29] text-[#FDE08B] text-xs font-medium hover:bg-[#1E3B36]"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Replace Part 1 Audio</span>
            </button>
            <span className="text-xs text-[#60463E]">or URL:</span>
            <input
              type="text"
              value={voiceNoteUrl}
              onChange={(e) => setVoiceNoteUrl(e.target.value)}
              placeholder="https://... or /audio/birthday/voice_note_1.m4a"
              className="flex-1 text-xs bg-white border border-[#B88B4A]/30 rounded-xl px-3 py-2 text-[#172D29]"
            />
          </div>
          {voiceNoteUrl && (
            <div className="mt-3">
              <StorybookAudioPlayer
                src={voiceNoteUrl}
                title="Part I Audio Preview (12:42)"
                className="bg-white/80"
              />
            </div>
          )}
        </div>

        {/* Voice Note Part 2 */}
        <div className="pt-4 border-t border-[#B88B4A]/20">
          <label className="block text-xs font-semibold text-[#60463E] mb-1">
            Voice Keepsake Part 2
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={() => audioInput2Ref.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#172D29] text-[#FDE08B] text-xs font-medium hover:bg-[#1E3B36]"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Part 2 Audio File</span>
            </button>
            <span className="text-xs text-[#60463E]">or URL:</span>
            <input
              type="text"
              value={voiceNote2Url}
              onChange={(e) => setVoiceNote2Url(e.target.value)}
              placeholder="https://..."
              className="flex-1 text-xs bg-white border border-[#B88B4A]/30 rounded-xl px-3 py-2 text-[#172D29]"
            />
          </div>
          {voiceNote2Url && (
            <div className="mt-3">
              <StorybookAudioPlayer
                src={voiceNote2Url}
                title="Part II Audio Preview"
                className="bg-white/80"
              />
            </div>
          )}
        </div>
      </div>

      {/* Save All Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#B88B4A]/25">
        <button
          onClick={() => {
            if (confirm("Reset birthday experience to original presets?")) {
              resetToDefault();
              showNotify("Reset to default demonstration content.");
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs text-[#60463E] hover:underline"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#B88B4A]" />
          <span>Reset to Default Birthday Presets</span>
        </button>

        <button
          onClick={handleSaveAll}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#172D29] hover:bg-[#1E3B36] text-[#FDE08B] font-semibold text-sm shadow-lg hover:shadow-celestial-glow transition-all hover:scale-105"
        >
          <CheckCircle2 className="w-4 h-4 text-[#FDE08B]" />
          <span>Save All Birthday Changes</span>
        </button>
      </div>
    </div>
  );
};
