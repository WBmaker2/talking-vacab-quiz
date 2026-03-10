export function BrowserSupportNotice({ support }) {
  return (
    <section className="notice-card" aria-label="브라우저 지원 안내">
      <div>
        <strong>브라우저 안내</strong>
        <p>
          듣기(TTS)는 대부분의 최신 브라우저에서 동작합니다. 말하기(STT)는
          Chrome 또는 Edge 계열 브라우저에서 가장 안정적입니다.
        </p>
      </div>
      <div className="support-grid">
        <span className={support.tts ? "support-pill on" : "support-pill off"}>
          TTS {support.tts ? "사용 가능" : "확인 필요"}
        </span>
        <span className={support.stt ? "support-pill on" : "support-pill off"}>
          STT {support.stt ? "사용 가능" : "지원 제한"}
        </span>
      </div>
    </section>
  );
}
