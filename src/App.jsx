import { useState } from "react";
import { BrowserSupportNotice } from "./components/BrowserSupportNotice.jsx";
import { ListeningQuiz } from "./components/ListeningQuiz.jsx";
import { ModeSelector } from "./components/ModeSelector.jsx";
import { SpeakingQuiz } from "./components/SpeakingQuiz.jsx";
import { TeacherWorkspace } from "./components/TeacherWorkspace.jsx";
import { useLocalVocabulary } from "./hooks/useLocalVocabulary.js";
import { isSpeechRecognitionSupported } from "./hooks/useSpeechRecognition.js";
import { useSpeechSynthesis } from "./hooks/useSpeechSynthesis.js";

const APP_VIEWS = {
  HOME: "home",
  TEACHER: "teacher",
  LISTENING: "listening",
  SPEAKING: "speaking",
};

function App() {
  const [view, setView] = useState(APP_VIEWS.HOME);
  const speechSynthesis = useSpeechSynthesis();
  const {
    vocabularyItems,
    addVocabularyItem,
    updateVocabularyItem,
    removeVocabularyItem,
    clearVocabularyItems,
    replaceVocabularyItems,
  } = useLocalVocabulary();

  const support = {
    tts: speechSynthesis.supported,
    stt: isSpeechRecognitionSupported(),
  };

  const hasVocabulary = vocabularyItems.length > 0;

  function navigateTo(nextView) {
    speechSynthesis.cancel();
    setView(nextView);
  }

  return (
    <div className="app-shell">
      <div className="app-backdrop app-backdrop-left" />
      <div className="app-backdrop app-backdrop-right" />

      <main className="app-frame">
        <header className="hero-card">
          <p className="eyebrow">Elementary English Classroom App</p>
          <h1>AI 원어민 단어 퀴즈 쇼</h1>
          <p className="hero-subtitle">
            선생님이 오늘의 단어만 입력하면, 듣기와 말하기 활동으로
            이어지는 수업용 단어 게임입니다.
          </p>
          <div className="hero-badges" aria-label="핵심 기능">
            <span>TTS 듣기 퀴즈</span>
            <span>STT 말하기 연습</span>
            <span>localStorage 저장</span>
          </div>
        </header>

        <BrowserSupportNotice support={support} />

        {view === APP_VIEWS.HOME ? (
          <ModeSelector
            hasVocabulary={hasVocabulary}
            onOpenTeacher={() => navigateTo(APP_VIEWS.TEACHER)}
            onOpenListening={() => navigateTo(APP_VIEWS.LISTENING)}
            onOpenSpeaking={() => navigateTo(APP_VIEWS.SPEAKING)}
          />
        ) : null}

        {view === APP_VIEWS.TEACHER ? (
          <TeacherWorkspace
            items={vocabularyItems}
            speech={speechSynthesis}
            onAddItem={addVocabularyItem}
            onUpdateItem={updateVocabularyItem}
            onRemoveItem={removeVocabularyItem}
            onClearItems={clearVocabularyItems}
            onReplaceItems={replaceVocabularyItems}
            onBack={() => navigateTo(APP_VIEWS.HOME)}
            onStartListening={() => navigateTo(APP_VIEWS.LISTENING)}
            onStartSpeaking={() => navigateTo(APP_VIEWS.SPEAKING)}
          />
        ) : null}

        {view === APP_VIEWS.LISTENING ? (
          <ListeningQuiz
            items={vocabularyItems}
            speech={speechSynthesis}
            onBack={() => navigateTo(APP_VIEWS.HOME)}
            onOpenTeacher={() => navigateTo(APP_VIEWS.TEACHER)}
          />
        ) : null}

        {view === APP_VIEWS.SPEAKING ? (
          <SpeakingQuiz
            items={vocabularyItems}
            speech={speechSynthesis}
            onBack={() => navigateTo(APP_VIEWS.HOME)}
            onOpenTeacher={() => navigateTo(APP_VIEWS.TEACHER)}
          />
        ) : null}
      </main>
    </div>
  );
}

export default App;
