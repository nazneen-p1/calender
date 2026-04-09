# Wall Calendar App

A polished, interactive wall calendar built with React. Inspired by the aesthetic of physical wall calendars — featuring a hero image, date range selection, month notes, and a smooth dark/light theme toggle.

---

## Features

- **Wall Calendar Layout** — Hero image panel with wave cutout, spiral binding, and a structured monthly grid
- **Date Range Selection** — Click a start date, then an end date; the range highlights with animated fills
- **Notes System** — Add notes per month or tied to a specific date/range; persisted via `localStorage`
- **Theme Switching** — Soft light-blue theme and a premium dark mode (black + light purple)
- **Month Navigation** — Move between any month/year
- **Responsive** — Desktop side-by-side layout; mobile stacked with touch-friendly tap targets

---

## Project Structure

```
wall-calendar/
├── public/
│   └── index.html          # HTML shell
├── src/
│   ├── components/
│   │   ├── Calendar.jsx     # Root calendar layout
│   │   ├── CalendarGrid.jsx # Day grid rendering + range logic
│   │   ├── CalendarDay.jsx  # Individual day cell
│   │   ├── HeroPanel.jsx    # Top image/SVG hero section
│   │   ├── MonthNav.jsx     # Prev/next month navigation
│   │   ├── NotesPanel.jsx   # Notes sidebar (save/delete/display)
│   │   └── ThemeToggle.jsx  # Light/dark toggle button
│   ├── hooks/
│   │   ├── useCalendar.js   # Month/year state + navigation
│   │   ├── useNotes.js      # Notes CRUD with localStorage
│   │   └── useSelection.js  # Date range selection state
│   ├── styles/
│   │   ├── index.css        # CSS variables, reset, global styles
│   │   ├── Calendar.css     # Layout styles
│   │   ├── CalendarGrid.css # Grid + day cell styles
│   │   ├── HeroPanel.css    # Hero section styles
│   │   └── NotesPanel.css   # Notes sidebar styles
│   ├── utils/
│   │   └── dateUtils.js     # Date helpers (formatting, comparison, grid building)
│   ├── App.jsx              # App root with theme context
│   └── index.js             # React entry point
├── .gitignore
├── package.json
└── README.md
```

---

## Getting Started

### 1. Clone or download the project

```bash
git clone https://github.com/your-username/wall-calendar.git
cd wall-calendar
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000) with hot reload.

### 4. Build for production

```bash
npm run build
```

Outputs an optimized static bundle to the `/build` folder. Deploy to any static host (Netlify, Vercel, GitHub Pages, etc.).

---

## How It Works

### Theme
A `ThemeContext` wraps the app and adds/removes a `dark` class on `<body>`. All colors are CSS custom properties, so the theme switches instantly with a single class toggle.

### Date Selection
`useSelection` manages a two-click selection flow: first click sets `selStart`, second sets `selEnd`. While hovering after the first click, a live preview range renders. Clearing resets both.

### Notes
`useNotes` reads/writes an array of note objects to `localStorage` under a key like `cal_notes_2025_0`. Each note stores the text, a `dateKey` string (either `"month"` or a date/range string), and a timestamp.

### Grid Building
`dateUtils.buildMonthGrid()` returns a flat array of 35–42 day objects (including padding from adjacent months) suitable for a 7-column CSS grid with Mon–Sun columns.

---

## Customization

- **Hero image**: Replace the SVG in `HeroPanel.jsx` with an `<img>` tag pointing to your asset in `/public`
- **Colors**: Edit the CSS variables in `src/styles/index.css`
- **Locale**: Update `MONTHS` and `DAYS_SHORT` arrays in `src/utils/dateUtils.js`
