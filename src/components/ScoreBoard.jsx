export function ScoreBoard({ questionIndex, totalQuestions, score }) {
  return (
    <section className="scoreboard-card" aria-label="점수판">
      <div>
        <span>현재 문제</span>
        <strong>
          {Math.min(questionIndex + 1, totalQuestions)} / {totalQuestions}
        </strong>
      </div>
      <div>
        <span>점수</span>
        <strong>{score}</strong>
      </div>
    </section>
  );
}
