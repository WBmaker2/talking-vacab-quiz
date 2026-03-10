# Listening Quiz Implementation Plan

## Scope

This document defines the next implementation slice for Talking Vocab Quiz:

- replace the listening-mode placeholder with a working 4-choice quiz
- extract browser speech logic into reusable hooks
- keep speaking mode as a placeholder, but prepare the hook boundary for future STT work

## Why This Slice

The current app already supports teacher-side vocabulary entry and local persistence. The next smallest classroom-usable step is the listening quiz because it:

- uses the existing saved vocabulary set directly
- validates the TTS pathway needed by the product
- introduces score and progress state without requiring microphone handling yet

## Requirements

### Listening Quiz

- Start from saved vocabulary items
- Present one word per question
- Read the target word aloud with browser TTS
- Show four answer choices when possible
- Accept fewer choices only when the saved set has fewer than four items
- Mark answers immediately as correct or incorrect
- Update score and progress
- Allow replaying the word audio
- Move to a result state after the final question

### Speech Hook Separation

- Move TTS behavior out of UI components into `useSpeechSynthesis`
- Standardize support detection, speaking state, speak action, and cancel action
- Create `useSpeechRecognition` as a future-facing boundary for speaking mode
- Keep browser API details away from page-level components

## Proposed Architecture

### New files

- `src/components/ListeningQuiz.jsx`
- `src/components/ScoreBoard.jsx`
- `src/components/ProgressBar.jsx`
- `src/components/ResultSummary.jsx`
- `src/hooks/useSpeechSynthesis.js`
- `src/hooks/useSpeechRecognition.js`
- `src/utils/quiz.js`

### Files to update

- `src/App.jsx`
- `src/components/TeacherWorkspace.jsx`
- `src/styles/global.css`

## State Design

### Listening quiz state

- `questionIndex`
- `score`
- `selectedAnswer`
- `status` with values such as `idle`, `correct`, `incorrect`, `complete`

### Speech synthesis hook contract

- `supported`
- `speaking`
- `speak(text, options)`
- `cancel()`

### Speech recognition hook contract

- `supported`
- `listening`
- `transcript`
- `error`
- `start()`
- `stop()`
- `reset()`

## Question Generation Rules

- Use each saved vocabulary item once per run
- Build answer choices from the `meaning` field
- Include the correct meaning exactly once
- Shuffle the choice order per question
- Avoid duplicate displayed meanings when possible

## UI Notes

- Keep the existing classroom-friendly visual style
- Make the replay action obvious and fast
- Show the English word only after answering or in a feedback area if needed, so the listening task still has meaning
- Show progress in a compact but readable format

## Risks

- TTS voice availability differs by device and browser
- A very small vocabulary set may reduce distractor quality
- Some browsers may report support but still require user interaction before speech playback

## Acceptance Criteria

- Teacher Mode still previews pronunciation through the shared TTS hook
- Listening mode no longer uses the placeholder screen
- A saved set of 4 or more items produces a 4-choice quiz
- Selecting an answer updates feedback and score correctly
- Completing the last question shows a result summary
- `npm run build` succeeds after the change

## Verification Plan

1. Build the app successfully
2. Confirm Teacher Mode preview still works through the new hook
3. Confirm Listening Quiz renders from saved vocabulary data
4. Confirm score/progress advance across multiple questions
5. Confirm result summary appears on completion
