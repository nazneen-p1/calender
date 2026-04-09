import React, { useState, useEffect } from 'react';
import { formatDate, dateKey, MONTHS } from '../utils/dateUtils';
import '../styles/NotesPanel.css';

export default function NotesPanel({ year, month, selStart, selEnd, notes, onAdd, onDelete }) {
  const [text, setText] = useState('');

  // Reset text input when month changes
  useEffect(() => { setText(''); }, [year, month]);

  function getRangeLabel() {
    if (!selStart) return null;
    if (selEnd) return `${formatDate(selStart)} – ${formatDate(selEnd)}`;
    return formatDate(selStart);
  }

  function buildDateKey() {
    if (!selStart) return 'month';
    const k = dateKey(selStart);
    if (selEnd) return `${k} to ${dateKey(selEnd)}`;
    return k;
  }

  function handleSave() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed, buildDateKey());
    setText('');
  }

  const rangeLabel = getRangeLabel();

  return (
    <aside className="notes-panel" aria-label="Notes">
      <div className="notes-panel__header">
        <span className="notes-panel__label">Notes</span>
        <span className="notes-panel__month">{MONTHS[month].slice(0,3)} {year}</span>
      </div>

      {/*decor ruled line*/}
      <div className="notes-panel__lines" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => <div key={i} className="notes-panel__line" />)}
      </div>

      {/*date context badge*/}
      {rangeLabel && (
        <div className="notes-panel__badge" aria-live="polite">
          {rangeLabel}
        </div>
      )}

      <textarea
        className="notes-panel__textarea"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={rangeLabel ? `Note for ${rangeLabel}…` : `Add a note for ${MONTHS[month]}…`}
        rows={4}
        onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSave(); }}
        aria-label="Note text"
      />
      <button
        className="notes-panel__save"
        onClick={handleSave}
        disabled={!text.trim()}
        aria-label="Save note"
      >
        Save note
      </button>

      {/*saved notes li*/}
      {notes.length > 0 && (
        <div className="notes-panel__saved" aria-label="Saved notes">
          {notes.map((note, i) => (
            <div key={note.ts} className="saved-note" role="article">
              <div className="saved-note__date">
                {note.dateKey === 'month' ? `${MONTHS[month]} (general)` : note.dateKey}
              </div>
              <p className="saved-note__text">{note.text}</p>
              <button
                className="saved-note__delete"
                onClick={() => onDelete(i)}
                aria-label={`Delete note: ${note.text.slice(0, 30)}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
