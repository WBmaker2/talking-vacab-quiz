# Talking Vocab Quiz Project Plan

## 1. Project Overview

- Project name: AI Native Speaker Vocab Quiz Show (Talking Vocab Quiz)
- Subject and grade: Elementary English, grades 3-6
- Primary users: Teachers preparing daily vocabulary lessons and students practicing listening and speaking
- Core value: A teacher enters the day's vocabulary list once, and the app turns it into an interactive quiz with browser-based TTS and STT

## 2. Curriculum Alignment

- `[4영02-02]` Students read words by understanding the relationship between sounds and letters.
- `[6영03-01]` Students understand the meaning of easy and simple words or sentences.

## 3. Problem Statement

Teachers need a lightweight classroom tool that can:

- accept a daily vocabulary list without complicated setup
- read the words aloud like a native speaker
- let students answer listening questions
- let students speak the target word and receive immediate feedback

The solution should avoid paid APIs and run in a regular browser using built-in speech capabilities.

## 4. Product Goals

- Reduce lesson setup time for teachers
- Increase student engagement through game-like repetition
- Support listening, reading, and speaking in one flow
- Provide immediate scoring and feedback during class
- Work on common school devices without external paid services

## 5. Core User Flows

### Teacher flow

1. Open the app
2. Enter today's vocabulary list
3. Add meaning, image hint, or simple example if needed
4. Save the set locally
5. Start quiz mode for students

### Student flow

1. Choose listening quiz or speaking practice
2. Listen to the target word through TTS
3. Select the correct meaning or picture
4. Speak the shown word into the microphone
5. Receive instant correctness feedback and score updates

## 6. Functional Scope

### Teacher mode

- Add, edit, and delete vocabulary items
- Store word sets with `localStorage`
- Preview pronunciation with TTS
- Start quiz mode with the saved set

### Student mode

- Listening quiz using speech playback
- Multiple-choice answer selection
- Speaking practice using speech recognition
- Scoreboard, progress bar, retry, next question, and result summary

### Shared features

- Clear mode switching
- Browser support notice
- Accessible visual and audio feedback
- Mobile and desktop responsive layout

## 7. Recommended MVP

The first deliverable should focus on the smallest usable classroom version:

1. Teacher enters words and meanings
2. App saves the set to `localStorage`
3. Listening quiz reads a word aloud and presents four answer choices
4. Speaking practice compares recognized speech with the target word
5. Score and progress are shown throughout the session

Out of scope for MVP:

- user accounts
- cloud sync
- teacher analytics dashboard
- multiplayer mode
- paid third-party voice APIs

## 8. UX Principles

- Large tap targets for elementary students
- One main task per screen
- Friendly and bright visual tone
- Persistent replay audio button
- Immediate feedback after every answer
- Minimal reading load for younger learners

## 9. Technical Direction

- App type: Single-page web app
- Storage: `localStorage`
- TTS: `window.speechSynthesis`
- STT: `SpeechRecognition` or `webkitSpeechRecognition`
- Deployment target: Static hosting compatible

## 10. Risks and Constraints

### Browser support risk

- TTS is broadly available, but STT support varies by browser.
- Recommendation: optimize and document use for Chrome and Edge on desktop and Android-classroom devices.

### Speech recognition quality

- Recognition can be affected by noise, microphone quality, and accents.
- The app should allow retry and show the recognized result before final feedback when appropriate.

### Classroom usability

- Teachers need fast setup.
- Vocabulary entry should be simple enough to finish in less than a few minutes for a normal lesson.

## 11. Success Criteria

- Teachers can create and save a vocabulary set in one session without external accounts.
- Students can complete both listening and speaking rounds in the same app.
- The app provides immediate score updates and clear correctness feedback.
- The app remains usable on mobile-width layouts.
- The app includes a clear browser compatibility notice for STT.

## 12. Delivery Sequence

1. Define PRD and detailed acceptance criteria
2. Design screen structure and component breakdown
3. Implement teacher mode and local data handling
4. Implement listening quiz with TTS
5. Implement speaking practice with STT
6. Add score flow, accessibility, and responsive polish
7. Run smoke tests on supported browsers
