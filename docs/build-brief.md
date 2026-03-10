# Talking Vocab Quiz Build Brief

## Goal

Build an MVP web app for elementary English classes where teachers enter a daily vocabulary list and students complete listening and speaking quizzes using browser-native TTS and STT.

## Recommended First Build

Use:

- `React + Vite`
- a single-page layout
- `localStorage` for persistence
- `speechSynthesis` for TTS
- `webkitSpeechRecognition` fallback handling for STT support

## Core Screens

### 1. Home

- App title
- Short description
- Buttons for Teacher Mode and Student Mode

### 2. Teacher Mode

- Vocabulary list form
- Word input
- Meaning input
- Optional image hint input
- Add button
- Saved vocabulary table or cards
- Edit and delete controls
- Save set button
- Start quiz button

### 3. Listening Quiz

- Current question number
- Score display
- Replay audio button
- Four answer choice buttons
- Correct or incorrect feedback area
- Next question button

### 4. Speaking Practice

- Large target word card
- Record button
- Recognized speech text area
- Result feedback area
- Retry button
- Next question button

### 5. Results

- Final score
- Number correct
- Restart practice button
- Return to teacher mode button

## Suggested Component Structure

```text
src/
  App.jsx
  main.jsx
  components/
    ModeSelector.jsx
    VocabularyForm.jsx
    VocabularyList.jsx
    ScoreBoard.jsx
    ProgressBar.jsx
    ListeningCard.jsx
    SpeakingCard.jsx
    ResultSummary.jsx
    BrowserSupportNotice.jsx
  hooks/
    useLocalVocabulary.js
    useSpeechSynthesis.js
    useSpeechRecognition.js
  utils/
    quiz.js
    speech.js
    normalize.js
  styles/
    global.css
```

## State Model

The app state should track:

- current mode
- vocabulary set
- current question index
- current score
- quiz type
- recognized speech result
- browser speech support flags

## Implementation Notes

- Normalize answers with lowercase comparison and trimmed whitespace.
- Show a support notice when `SpeechRecognition` is unavailable.
- Keep speech hooks isolated so browser API handling does not spread across UI components.
- Use bright, classroom-friendly styling with large buttons and minimal clutter.

## Developer Prompt

Use this prompt when starting implementation:

> Build a responsive single-page React + Vite web app called "Talking Vocab Quiz" for elementary English classes. The app must have Teacher Mode and Student Mode. In Teacher Mode, users can add, edit, delete, and save vocabulary items with fields for word, meaning, optional image hint, and optional example sentence using localStorage. In Student Mode, provide a listening quiz that uses the browser Web Speech API speechSynthesis to read the target word aloud and asks the student to choose the correct meaning from four options. Also provide a speaking practice mode that uses SpeechRecognition or webkitSpeechRecognition to capture the student's pronunciation and compare it with the target word. Include a score display, progress indicator, result summary, replay audio button, retry flow, and a browser support notice for STT. Design the UI for grades 3-6 with large controls, clear feedback, and mobile-friendly layout. Avoid paid APIs and keep the app deployable as a static frontend.

## Immediate Next Action

Scaffold the Vite React app and implement Teacher Mode plus local storage first. That creates the data foundation for both quiz modes without committing to unnecessary architecture early.
