export const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

export const DAYS_SHORT = ['MON','TUE','WED','THU','FRI','SAT','SUN'];

/** Returns a Mon-anchored 0-based day-of-week index (0=Mon, 6=Sun) */
export function monDow(date) {
  return (date.getDay() + 6) % 7;
}

/** Build a flat array of day objects for the calendar grid */
export function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPad = monDow(firstDay);
  const endPad = (6 - monDow(lastDay));

  const days = [];

  // Previous month padding
  const prevLast = new Date(year, month, 0).getDate();
  for (let i = startPad - 1; i >= 0; i--) {
    const d = prevLast - i;
    const date = new Date(year, month - 1, d);
    days.push({ date, day: d, currentMonth: false, key: date.toDateString() });
  }

  // Current month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d);
    days.push({ date, day: d, currentMonth: true, key: date.toDateString() });
  }

  // Next month padding
  for (let d = 1; d <= endPad; d++) {
    const date = new Date(year, month + 1, d);
    days.push({ date, day: d, currentMonth: false, key: date.toDateString() });
  }

  return days;
}

export function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.toDateString() === b.toDateString();
}

export function isInRange(date, start, end) {
  if (!start || !end) return false;
  const [s, e] = start <= end ? [start, end] : [end, start];
  return date > s && date < e;
}

export function isWeekend(date) {
  const dow = date.getDay();
  return dow === 0 || dow === 6;
}

export function isToday(date) {
  return isSameDay(date, new Date());
}

export function formatDate(date) {
  return `${MONTHS[date.getMonth()].slice(0,3)} ${date.getDate()}, ${date.getFullYear()}`;
}

export function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
