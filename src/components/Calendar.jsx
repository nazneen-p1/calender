import React, { useEffect } from 'react';
import HeroPanel from './HeroPanel';
import MonthNav from './MonthNav';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import useCalendar from '../hooks/useCalendar';
import useSelection from '../hooks/useSelection';
import useNotes from '../hooks/useNotes';
import '../styles/Calendar.css';

export default function Calendar() {
  const { year, month, prevMonth, nextMonth } = useCalendar();
  const sel = useSelection();
  const { notes, addNote, deleteNote, notedDays, reloadNotes } = useNotes(year, month);

  // Reload notes when navigating months
  useEffect(() => {
    reloadNotes(year, month);
    sel.clearSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  return (
    <main className="calendar" role="main" aria-label="Wall Calendar">
      <div className="calendar__card">
        <HeroPanel year={year} month={month} />

        <div className="calendar__body">
          <div className="calendar__main">
            <MonthNav
              year={year}
              month={month}
              onPrev={prevMonth}
              onNext={nextMonth}
              onClear={sel.clearSelection}
              hasSelection={!!(sel.selStart || sel.selEnd)}
            />
            <CalendarGrid
              year={year}
              month={month}
              selStart={sel.selStart}
              selEnd={sel.selEnd}
              effectiveEnd={sel.effectiveEnd}
              onDayClick={sel.handleDayClick}
              onDayHover={sel.handleDayHover}
              onGridLeave={sel.handleGridLeave}
              notedDays={notedDays}
            />
          </div>

          <NotesPanel
            year={year}
            month={month}
            selStart={sel.selStart}
            selEnd={sel.selEnd}
            notes={notes}
            onAdd={addNote}
            onDelete={deleteNote}
          />
        </div>
      </div>
    </main>
  );
}
