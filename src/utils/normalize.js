export function normalizeSpeechText(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function isSpeechMatch(transcript, expectedWord) {
  const normalizedTranscript = normalizeSpeechText(transcript);
  const normalizedWord = normalizeSpeechText(expectedWord);

  if (!normalizedTranscript || !normalizedWord) {
    return false;
  }

  if (normalizedTranscript === normalizedWord) {
    return true;
  }

  return normalizedTranscript.split(" ").includes(normalizedWord);
}
