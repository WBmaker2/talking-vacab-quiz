import { useEffect, useRef, useState } from "react";

function getRecognitionConstructor() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export function isSpeechRecognitionSupported() {
  return Boolean(getRecognitionConstructor());
}

export function useSpeechRecognition(config = {}) {
  const recognitionRef = useRef(null);
  const [supported, setSupported] = useState(isSpeechRecognitionSupported());
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const Recognition = getRecognitionConstructor();
    setSupported(Boolean(Recognition));

    if (!Recognition) {
      recognitionRef.current = null;
      return;
    }

    const recognition = new Recognition();
    recognition.lang = config.lang ?? "en-US";
    recognition.interimResults = config.interimResults ?? false;
    recognition.maxAlternatives = config.maxAlternatives ?? 1;
    recognition.continuous = config.continuous ?? false;

    recognition.onstart = () => {
      setListening(true);
      setError("");
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (event) => {
      setListening(false);
      setError(event.error ?? "speech-recognition-error");
    };

    recognition.onresult = (event) => {
      const value = Array.from(event.results)
        .flatMap((result) => Array.from(result))
        .map((result) => result.transcript)
        .join(" ")
        .trim();

      setTranscript(value);
      config.onResult?.(value, event);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onstart = null;
      recognition.onend = null;
      recognition.onerror = null;
      recognition.onresult = null;
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [
    config.continuous,
    config.interimResults,
    config.lang,
    config.maxAlternatives,
    config.onResult,
  ]);

  function start() {
    if (!recognitionRef.current) {
      setError("speech-recognition-unsupported");
      return false;
    }

    try {
      setTranscript("");
      setError("");
      recognitionRef.current.start();
      return true;
    } catch {
      setError("speech-recognition-start-failed");
      return false;
    }
  }

  function stop() {
    try {
      recognitionRef.current?.stop();
    } catch {
      setError("speech-recognition-stop-failed");
    }
  }

  function reset() {
    setTranscript("");
    setError("");
  }

  return {
    supported,
    listening,
    transcript,
    error,
    start,
    stop,
    reset,
  };
}
