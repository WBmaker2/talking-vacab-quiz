import { useMemo, useState } from "react";
import { VocabularyForm } from "./VocabularyForm.jsx";
import { VocabularyList } from "./VocabularyList.jsx";

const EMPTY_FORM = {
  word: "",
  meaning: "",
  imageHint: "",
  exampleSentence: "",
};

const SAMPLE_ITEMS = [
  {
    word: "apple",
    meaning: "사과",
    imageHint: "red fruit",
    exampleSentence: "I eat an apple.",
  },
  {
    word: "banana",
    meaning: "바나나",
    imageHint: "yellow fruit",
    exampleSentence: "Monkeys like bananas.",
  },
  {
    word: "school",
    meaning: "학교",
    imageHint: "classroom building",
    exampleSentence: "We go to school every day.",
  },
];

export function TeacherWorkspace({
  items,
  speech,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  onClearItems,
  onReplaceItems,
  onBack,
  onStartListening,
  onStartSpeaking,
}) {
  const [formValues, setFormValues] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState("");

  const isEditing = Boolean(editingId);
  const hasItems = items.length > 0;

  const stats = useMemo(
    () => ({
      total: items.length,
      withExamples: items.filter((item) => item.exampleSentence).length,
    }),
    [items],
  );

  function resetForm() {
    setFormValues(EMPTY_FORM);
    setEditingId("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const normalizedItem = {
      word: formValues.word.trim(),
      meaning: formValues.meaning.trim(),
      imageHint: formValues.imageHint.trim(),
      exampleSentence: formValues.exampleSentence.trim(),
    };

    if (!normalizedItem.word || !normalizedItem.meaning) {
      return;
    }

    if (editingId) {
      onUpdateItem(editingId, normalizedItem);
    } else {
      onAddItem(normalizedItem);
    }

    resetForm();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setFormValues({
      word: item.word,
      meaning: item.meaning,
      imageHint: item.imageHint,
      exampleSentence: item.exampleSentence,
    });
  }

  function handleLoadSample() {
    onReplaceItems(SAMPLE_ITEMS);
  }

  function previewWord(word) {
    if (!speech.supported || !word) {
      return;
    }

    speech.speak(word, {
      lang: "en-US",
      rate: 0.9,
    });
  }

  return (
    <section className="workspace-panel">
      <div className="section-heading">
        <div>
          <p className="mode-label">Teacher Mode</p>
          <h2>오늘의 단어 세트 관리</h2>
        </div>
        <button className="ghost-button" onClick={onBack}>
          홈으로
        </button>
      </div>

      <div className="teacher-summary">
        <div className="summary-card">
          <span>등록 단어</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="summary-card">
          <span>예문 포함</span>
          <strong>{stats.withExamples}</strong>
        </div>
      </div>

      <VocabularyForm
        values={formValues}
        isEditing={isEditing}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
        onPreview={() => previewWord(formValues.word)}
        canPreview={speech.supported && Boolean(formValues.word.trim())}
      />

      <div className="toolbar-row">
        <button className="secondary-button" onClick={handleLoadSample}>
          예시 단어 불러오기
        </button>
        <button
          className="ghost-button danger-button"
          onClick={onClearItems}
          disabled={!hasItems}
        >
          전체 삭제
        </button>
      </div>

      <VocabularyList
        items={items}
        onEdit={handleEdit}
        onDelete={onRemoveItem}
        onPreview={previewWord}
        canPreview={speech.supported}
      />

      <div className="launch-card">
        <div>
          <p className="mode-label">Ready For Class</p>
          <h3>학생 활동으로 이동</h3>
          <p>
            현재 저장된 단어 세트를 바탕으로 학생 모드를 시작합니다.
          </p>
        </div>
        <div className="stack-actions">
          <button
            className="primary-button"
            onClick={onStartListening}
            disabled={!hasItems}
          >
            듣기 퀴즈 시작
          </button>
          <button
            className="secondary-button"
            onClick={onStartSpeaking}
            disabled={!hasItems}
          >
            말하기 연습 시작
          </button>
        </div>
      </div>
    </section>
  );
}
