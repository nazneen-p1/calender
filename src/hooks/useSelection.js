import { useState } from 'react';

export default function useSelection() {
  const [selStart, setSelStart] = useState(null);
  const [selEnd, setSelEnd] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  function handleDayClick(date) {
    if (!selStart || selEnd) {
      //start new selection
      setSelStart(date);
      setSelEnd(null);
      setHoverDate(null);
    } else {
      //complete select
      const end = date;
      if (end < selStart) {
        setSelEnd(selStart);
        setSelStart(end);
      } else {
        setSelEnd(end);
      }
      setHoverDate(null);
    }
  }

  function clearSelection() {
    setSelStart(null);
    setSelEnd(null);
    setHoverDate(null);
  }

  //effec for range
  const effectiveEnd = selEnd || (selStart && hoverDate ? hoverDate : null);

  return {
    selStart, selEnd, hoverDate, effectiveEnd,
    handleDayClick,
    handleDayHover: (date) => { if (selStart && !selEnd) setHoverDate(date); },
    handleGridLeave: () => { if (selStart && !selEnd) setHoverDate(null); },
    clearSelection,
  };
}
