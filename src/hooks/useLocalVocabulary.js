import { useEffect, useState } from "react";

const STORAGE_KEY = "talking-vocab-quiz.vocabulary-items";

function createVocabularyItem(item, index) {
  return {
    id: crypto.randomUUID(),
    order: index + 1,
    word: item.word,
    meaning: item.meaning,
    imageHint: item.imageHint ?? "",
    exampleSentence: item.exampleSentence ?? "",
    createdAt: new Date().toISOString(),
  };
}

function readInitialVocabulary() {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useLocalVocabulary() {
  const [vocabularyItems, setVocabularyItems] = useState(readInitialVocabulary);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(vocabularyItems),
    );
  }, [vocabularyItems]);

  function addVocabularyItem(item) {
    setVocabularyItems((current) => [
      ...current,
      createVocabularyItem(item, current.length),
    ]);
  }

  function updateVocabularyItem(id, nextItem) {
    setVocabularyItems((current) =>
      current.map((item, index) =>
        item.id === id
          ? {
              ...item,
              ...nextItem,
              order: index + 1,
            }
          : item,
      ),
    );
  }

  function removeVocabularyItem(id) {
    setVocabularyItems((current) =>
      current
        .filter((item) => item.id !== id)
        .map((item, index) => ({
          ...item,
          order: index + 1,
        })),
    );
  }

  function clearVocabularyItems() {
    setVocabularyItems([]);
  }

  function replaceVocabularyItems(nextItems) {
    setVocabularyItems(
      nextItems.map((item, index) => createVocabularyItem(item, index)),
    );
  }

  return {
    vocabularyItems,
    addVocabularyItem,
    updateVocabularyItem,
    removeVocabularyItem,
    clearVocabularyItems,
    replaceVocabularyItems,
  };
}
