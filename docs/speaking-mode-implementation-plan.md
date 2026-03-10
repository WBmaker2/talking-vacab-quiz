# Speaking Mode Implementation Plan

## Scope

This document defines the next implementation slice for Talking Vocab Quiz:

- replace the speaking placeholder with a working speaking practice screen
- connect `useSpeechRecognition` to real UI and scoring flow
- keep the browser API boundary inside reusable hooks

## Goal

Students should be able to see a target English word, speak it into the microphone, and receive immediate correctness feedback based on browser speech recognition.

## Requirements

### Speaking practice flow

- Start from the saved vocabulary set
- Present one target word at a time
- Let the student start microphone capture with an obvious button
- Show live or final recognized text
- Compare the transcript against the target word using normalized matching
- Mark the attempt as correct or incorrect
- Allow retry after an incorrect attempt
- Allow moving to the next word
- Show score and progress across the full set
- Show a result summary after the final word

### Hook integration

- Use `useSpeechRecognition` inside the speaking screen
- Keep browser constructor handling and recognition lifecycle inside the hook
- Continue using the shared TTS hook for pronunciation replay where helpful

## Proposed Architecture

### New files

- `src/components/SpeakingQuiz.jsx`
- `src/utils/normalize.js`

### Files to update

- `src/App.jsx`
- `src/hooks/useSpeechRecognition.js`
- `src/utils/quiz.js`
- `src/styles/global.css`

## Matching Rules

- Compare lowercased values
- Ignore punctuation and extra spaces
- Accept exact transcript matches
- Accept transcript tokens that include the target word when recognition adds extra words around it

## UX Rules

- Show the target word clearly in large text
- Provide a pronunciation replay button using TTS
- Use one main microphone action at a time
- Show recognition state such as listening, waiting, correct, or retry
- Make retry and next actions obvious

## Risks

- STT support still varies by browser
- Classroom noise can reduce transcript quality
- Recognition may end with empty transcript, which should be treated as retry rather than crash

## Acceptance Criteria

- Speaking mode no longer uses the placeholder
- Microphone start and stop are connected to `useSpeechRecognition`
- Transcript is displayed after recognition
- Correct answers increase score exactly once per word
- Incorrect answers allow retry without breaking the flow
- Unsupported browsers show a clear fallback message
- `npm run build` succeeds after the change

## Verification Plan

1. Build the app successfully
2. Confirm App routes into the new speaking screen
3. Confirm the screen shows microphone state and transcript area
4. Confirm score and progress update correctly across the full set
5. Confirm unsupported browser fallback renders cleanly
