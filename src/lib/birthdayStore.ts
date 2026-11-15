"use client";

import { useState, useEffect } from "react";
import { BirthdayExperienceData, BirthdayPhoto } from "@/types/birthday";
import { DEFAULT_BIRTHDAY_DATA } from "@/data/birthdayData";

const STORAGE_KEY = "anavis_world_birthday_data_v1";

export function getStoredBirthdayData(): BirthdayExperienceData {
  if (typeof window === "undefined") {
    return DEFAULT_BIRTHDAY_DATA;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BIRTHDAY_DATA));
      return DEFAULT_BIRTHDAY_DATA;
    }
    const parsed = JSON.parse(raw);
    const isOldPlaceholderLetter =
      !parsed.letterTitle ||
      parsed.letterTitle.includes("A Letter for Your Birthday") ||
      parsed.letterTitle.includes("To the Light");

    return {
      title: parsed.title || DEFAULT_BIRTHDAY_DATA.title,
      date: parsed.date || DEFAULT_BIRTHDAY_DATA.date,
      subtitle: parsed.subtitle || DEFAULT_BIRTHDAY_DATA.subtitle,
      envelopeTagline: parsed.envelopeTagline || DEFAULT_BIRTHDAY_DATA.envelopeTagline,
      envelopeRecipient: parsed.envelopeRecipient || DEFAULT_BIRTHDAY_DATA.envelopeRecipient,
      letterTitle: isOldPlaceholderLetter ? DEFAULT_BIRTHDAY_DATA.letterTitle : parsed.letterTitle,
      letterDate: isOldPlaceholderLetter ? DEFAULT_BIRTHDAY_DATA.letterDate : (parsed.letterDate || DEFAULT_BIRTHDAY_DATA.letterDate),
      letterSalutation: isOldPlaceholderLetter ? DEFAULT_BIRTHDAY_DATA.letterSalutation : (parsed.letterSalutation || DEFAULT_BIRTHDAY_DATA.letterSalutation),
      letterBody: isOldPlaceholderLetter || !Array.isArray(parsed.letterBody) ? DEFAULT_BIRTHDAY_DATA.letterBody : parsed.letterBody,
      letterClosing: isOldPlaceholderLetter ? DEFAULT_BIRTHDAY_DATA.letterClosing : (parsed.letterClosing || DEFAULT_BIRTHDAY_DATA.letterClosing),
      letterSignature: isOldPlaceholderLetter ? DEFAULT_BIRTHDAY_DATA.letterSignature : (parsed.letterSignature || DEFAULT_BIRTHDAY_DATA.letterSignature),
      giftBoxPrompt: parsed.giftBoxPrompt || DEFAULT_BIRTHDAY_DATA.giftBoxPrompt,
      giftBoxMessage: parsed.giftBoxMessage || DEFAULT_BIRTHDAY_DATA.giftBoxMessage,
      giftBoxQuote: parsed.giftBoxQuote || DEFAULT_BIRTHDAY_DATA.giftBoxQuote,
      voiceNoteUrl: parsed.voiceNoteUrl || DEFAULT_BIRTHDAY_DATA.voiceNoteUrl,
      voiceNoteTitle: parsed.voiceNoteTitle || DEFAULT_BIRTHDAY_DATA.voiceNoteTitle,
      voiceNoteSubtitle: parsed.voiceNoteSubtitle || DEFAULT_BIRTHDAY_DATA.voiceNoteSubtitle,
      voiceNote2Url: parsed.voiceNote2Url !== undefined ? parsed.voiceNote2Url : DEFAULT_BIRTHDAY_DATA.voiceNote2Url,
      voiceNote2Title: parsed.voiceNote2Title || DEFAULT_BIRTHDAY_DATA.voiceNote2Title,
      voiceNote2Subtitle: parsed.voiceNote2Subtitle || DEFAULT_BIRTHDAY_DATA.voiceNote2Subtitle,
      photos:
        Array.isArray(parsed.photos) &&
        parsed.photos.length > 0 &&
        !parsed.photos.some((p: any) => p.url?.includes("unsplash.com"))
          ? parsed.photos
          : DEFAULT_BIRTHDAY_DATA.photos,
      surprisePhotos:
        Array.isArray(parsed.surprisePhotos) &&
        parsed.surprisePhotos.length > 0 &&
        !parsed.surprisePhotos.some((p: any) => p.url?.includes("unsplash.com"))
          ? parsed.surprisePhotos
          : DEFAULT_BIRTHDAY_DATA.surprisePhotos || DEFAULT_BIRTHDAY_DATA.photos,
    };
  } catch (err) {
    console.error("Failed to read birthday data from localStorage:", err);
    return DEFAULT_BIRTHDAY_DATA;
  }
}

export function saveStoredBirthdayData(data: BirthdayExperienceData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event("birthday_data_updated"));
  } catch (err) {
    console.error("Failed to save birthday data to localStorage:", err);
  }
}

export function useBirthdayData() {
  const [data, setData] = useState<BirthdayExperienceData>(() => getStoredBirthdayData());

  useEffect(() => {
    const handleUpdate = () => {
      setData(getStoredBirthdayData());
    };
    window.addEventListener("birthday_data_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("birthday_data_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const updatePhoto = (photoId: string, updates: Partial<BirthdayPhoto>) => {
    const current = getStoredBirthdayData();
    const updatedPhotos = current.photos.map((p) =>
      p.id === photoId ? { ...p, ...updates, isPlaceholder: false } : p
    );
    saveStoredBirthdayData({ ...current, photos: updatedPhotos });
  };

  const addPhoto = (photo: BirthdayPhoto) => {
    const current = getStoredBirthdayData();
    saveStoredBirthdayData({ ...current, photos: [...current.photos, photo] });
  };

  const deletePhoto = (photoId: string) => {
    const current = getStoredBirthdayData();
    saveStoredBirthdayData({
      ...current,
      photos: current.photos.filter((p) => p.id !== photoId),
    });
  };

  const updateLetter = (updates: {
    title?: string;
    date?: string;
    salutation?: string;
    body?: string[];
    closing?: string;
    signature?: string;
  }) => {
    const current = getStoredBirthdayData();
    saveStoredBirthdayData({
      ...current,
      letterTitle: updates.title ?? current.letterTitle,
      letterDate: updates.date ?? current.letterDate,
      letterSalutation: updates.salutation ?? current.letterSalutation,
      letterBody: updates.body ?? current.letterBody,
      letterClosing: updates.closing ?? current.letterClosing,
      letterSignature: updates.signature ?? current.letterSignature,
    });
  };

  const updateSurprise = (updates: {
    prompt?: string;
    message?: string;
    quote?: string;
    voiceNoteUrl?: string;
    voiceNoteTitle?: string;
    voiceNoteSubtitle?: string;
    voiceNote2Url?: string;
    voiceNote2Title?: string;
    voiceNote2Subtitle?: string;
  }) => {
    const current = getStoredBirthdayData();
    saveStoredBirthdayData({
      ...current,
      giftBoxPrompt: updates.prompt ?? current.giftBoxPrompt,
      giftBoxMessage: updates.message ?? current.giftBoxMessage,
      giftBoxQuote: updates.quote ?? current.giftBoxQuote,
      voiceNoteUrl: updates.voiceNoteUrl !== undefined ? updates.voiceNoteUrl : current.voiceNoteUrl,
      voiceNoteTitle: updates.voiceNoteTitle ?? current.voiceNoteTitle,
      voiceNoteSubtitle: updates.voiceNoteSubtitle ?? current.voiceNoteSubtitle,
      voiceNote2Url: updates.voiceNote2Url !== undefined ? updates.voiceNote2Url : current.voiceNote2Url,
      voiceNote2Title: updates.voiceNote2Title ?? current.voiceNote2Title,
      voiceNote2Subtitle: updates.voiceNote2Subtitle ?? current.voiceNote2Subtitle,
    });
  };

  const resetToDefault = () => {
    saveStoredBirthdayData(DEFAULT_BIRTHDAY_DATA);
  };

  return {
    data,
    saveData: saveStoredBirthdayData,
    updatePhoto,
    addPhoto,
    deletePhoto,
    updateLetter,
    updateSurprise,
    resetToDefault,
  };
}
