import React from 'react';
import { MONTHS } from '../utils/dateUtils';
import '../styles/Calendar.css';

export default function MonthNav({ year, month, onPrev, onNext, onClear, hasSelection }) {
  return (
    <div className="month-nav">
      <button className="month-nav__btn" onClick={onPrev} aria-label="Previous month">&#8249;</button>
      <span className="month-nav__label">{MONTHS[month]} {year}</span>
      <button className="month-nav__btn" onClick={onNext} aria-label="Next month">&#8250;</button>
      {hasSelection && (
        <button className="month-nav__clear" onClick={onClear} aria-label="Clear selection">
          Clear
        </button>
      )}
    </div>
  );
}
