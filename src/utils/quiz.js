function shuffle(items) {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[swapIndex]] = [
      nextItems[swapIndex],
      nextItems[index],
    ];
  }

  return nextItems;
}

function getUniqueMeaningItems(items) {
  return Array.from(
    new Map(items.map((item) => [item.meaning, item])).values(),
  );
}

export function createListeningQuestions(items) {
  const uniqueMeaningItems = getUniqueMeaningItems(items);
  const choiceCount = Math.min(4, uniqueMeaningItems.length);

  return shuffle(items).map((item) => {
    const distractors = shuffle(
      uniqueMeaningItems.filter(
        (candidate) => candidate.meaning !== item.meaning,
      ),
    )
      .slice(0, Math.max(0, choiceCount - 1))
      .map((candidate) => candidate.meaning);

    return {
      id: item.id,
      word: item.word,
      meaning: item.meaning,
      imageHint: item.imageHint,
      exampleSentence: item.exampleSentence,
      choices: shuffle([item.meaning, ...distractors]),
    };
  });
}

export function createSpeakingSequence(items) {
  return shuffle(items).map((item) => ({
    id: item.id,
    word: item.word,
    meaning: item.meaning,
    imageHint: item.imageHint,
    exampleSentence: item.exampleSentence,
  }));
}
