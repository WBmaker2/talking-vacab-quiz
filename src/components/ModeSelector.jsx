export function ModeSelector({
  hasVocabulary,
  onOpenTeacher,
  onOpenListening,
  onOpenSpeaking,
}) {
  return (
    <section className="panel-grid">
      <article className="mode-card mode-card-teacher">
        <p className="mode-label">Teacher Mode</p>
        <h2>오늘의 단어 세트 만들기</h2>
        <p>
          수업할 단어와 뜻을 입력하고 저장하면 학생 활동으로 바로 이어집니다.
        </p>
        <button className="primary-button" onClick={onOpenTeacher}>
          단어 세트 관리
        </button>
      </article>

      <article className="mode-card mode-card-student">
        <p className="mode-label">Student Mode</p>
        <h2>학생 활동 시작</h2>
        <p>
          저장된 단어가 있으면 듣기 퀴즈와 말하기 연습 화면으로 이동할 수
          있습니다.
        </p>
        <div className="stack-actions">
          <button
            className="secondary-button"
            onClick={onOpenListening}
            disabled={!hasVocabulary}
          >
            듣기 퀴즈 열기
          </button>
          <button
            className="secondary-button"
            onClick={onOpenSpeaking}
            disabled={!hasVocabulary}
          >
            말하기 연습 열기
          </button>
        </div>
        {!hasVocabulary ? (
          <p className="inline-hint">
            먼저 Teacher Mode에서 단어를 한 개 이상 저장하세요.
          </p>
        ) : null}
      </article>
    </section>
  );
}
