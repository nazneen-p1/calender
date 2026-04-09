import React from 'react';
import CalendarDay from './CalendarDay';
import { buildMonthGrid, DAYS_SHORT, dateKey } from '../utils/dateUtils';
import '../styles/CalendarGrid.css';

export default function CalendarGrid({
  year, month,
  selStart, selEnd, effectiveEnd,
  onDayClick, onDayHover, onGridLeave,
  notedDays,
}) {
  const grid = buildMonthGrid(year, month);

  return (
    <div className="cal-grid" onMouseLeave={onGridLeave}>
      {/* Col headers*/}
      <div className="cal-grid__head" role="row">
        {DAYS_SHORT.map((d, i) => (
          <span
            key={d}
            className={`cal-grid__head-cell${i >= 5 ? ' cal-grid__head-cell--weekend' : ''}`}
            role="columnheader"
          >
            {d}
          </span>
        ))}
      </div>

      {/* Day cells*/}
      <div className="cal-grid__body" role="grid" aria-label="Calendar grid">
        {grid.map(dayObj => (
          <CalendarDay
            key={dayObj.key}
            dayObj={dayObj}
            selStart={selStart}
            selEnd={selEnd}
            effectiveEnd={effectiveEnd}
            hasNote={notedDays.has(dateKey(dayObj.date))}
            onClick={onDayClick}
            onMouseEnter={onDayHover}
          />
        ))}
      </div>

      {/* legend */}
      <div className="cal-legend" aria-label="Legend">
        <span className="cal-legend__item">
          <span className="cal-legend__dot cal-legend__dot--start" />Start
        </span>
        <span className="cal-legend__item">
          <span className="cal-legend__dot cal-legend__dot--range" />Range
        </span>
        <span className="cal-legend__item">
          <span className="cal-legend__dot cal-legend__dot--today" />Today
        </span>
        <span className="cal-legend__item">
          <span className="cal-legend__dot cal-legend__dot--note" />Note
        </span>
      </div>
    </div>
  );
}
