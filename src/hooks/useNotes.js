import { useState, useCallback } from 'react';

function storKey(year, month) {
  return `cal_notes_${year}_${month}`;
}

function load(year, month) {
  try { return JSON.parse(localStorage.getItem(storKey(year, month)) || '[]'); }
  catch { return []; }
}

function save(year, month, notes) {
  try { localStorage.setItem(storKey(year, month), JSON.stringify(notes)); }
  catch {}
}

export default function useNotes(year, month) {
  const [notes, setNotes] = useState(() => load(year, month));

  // Reload when month/year changes
  const reloadNotes = useCallback((y, m) => {
    setNotes(load(y, m));
  }, []);

  function addNote(text, dk) {
    const updated = [...notes, { text, dateKey: dk, ts: Date.now() }];
    setNotes(updated);
    save(year, month, updated);
  }

  function deleteNote(index) {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
    save(year, month, updated);
  }

  // Set of dateKeys that have notes (for dot indicators on days)
  const notedDays = new Set(notes.map(n => n.dateKey).filter(k => k !== 'month'));

  return { notes, addNote, deleteNote, notedDays, reloadNotes };
}
