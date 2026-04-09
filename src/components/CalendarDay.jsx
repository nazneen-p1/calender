import React from 'react';
import { isToday, isWeekend, isSameDay, isInRange } from '../utils/dateUtils';
import '../styles/CalendarGrid.css';

export default function CalendarDay({ dayObj, selStart, selEnd, effectiveEnd, hasNote, onClick, onMouseEnter }) {
  const { date, day, currentMonth } = dayObj;

  const today = isToday(date);
  const weekend = isWeekend(date);
  const isStart = isSameDay(date, selStart);
  const isEnd = selEnd ? isSameDay(date, selEnd) : false;
  const inRange = isInRange(date, selStart, effectiveEnd);
  const isPreview = !selEnd && isInRange(date, selStart, effectiveEnd);

  const classNames = [
    'cal-day',
    !currentMonth && 'cal-day--other',
    today && 'cal-day--today',
    weekend && currentMonth && 'cal-day--weekend',
    isStart && 'cal-day--start',
    isEnd && 'cal-day--end',
    inRange && !isPreview && 'cal-day--range',
    isPreview && 'cal-day--preview',
    hasNote && currentMonth && 'cal-day--noted',
    isStart && isEnd && 'cal-day--single',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      onClick={() => currentMonth && onClick(date)}
      onMouseEnter={() => currentMonth && onMouseEnter(date)}
      role={currentMonth ? 'button' : undefined}
      tabIndex={currentMonth ? 0 : undefined}
      aria-label={currentMonth ? `${date.toDateString()}${isStart ? ', range start' : ''}${isEnd ? ', range end' : ''}` : undefined}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); currentMonth && onClick(date); } }}
    >
      <span className="cal-day__num">{day}</span>
      {today && <span className="cal-day__today-dot" aria-hidden="true" />}
      {hasNote && currentMonth && <span className="cal-day__note-dot" aria-hidden="true" />}
    </div>
  );
}
