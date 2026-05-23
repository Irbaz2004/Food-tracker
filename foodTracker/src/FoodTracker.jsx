import { useState, useEffect, useMemo } from "react";

// MUI Icons (inline SVG components for reliability in artifacts)
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);
const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
  </svg>
);
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </svg>
);
const AddIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);
const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
);
const WbSunnyIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/>
  </svg>
);
const LunchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2H1z"/>
  </svg>
);
const NightIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
  </svg>
);
const SnackIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2H1z"/>
  </svg>
);
const FilterIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
  </svg>
);
const PictureAsPdfIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/>
  </svg>
);
const TableChartIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 2v3H5V5h15zm-8 14H5v-5h7v5zm0-7H5v-5h7v5zm8 7h-6v-5h6v5zm0-7h-6v-5h6v5z"/>
  </svg>
);
const LocalDiningIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2H1z"/>
  </svg>
);
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
  </svg>
);
const AccessTimeIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
  </svg>
);
const ScaleIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M13 7.83c.85-.3 1.53-.98 1.83-1.83H18l-3 7c0 1.66 1.57 3 3.5 3s3.5-1.34 3.5-3l-3-7h2V4h-6.17c-.41-1.17-1.52-2-2.83-2s-2.42.83-2.83 2H3v2h2l-3 7c0 1.66 1.57 3 3.5 3S9 14.66 9 13L6 6h3.17c.3.85.98 1.53 1.83 1.83V19H2v2h20v-2h-9V7.83zM20.37 13h-3.74l1.87-4.36L20.37 13zm-13 0H3.63L5.5 8.64 7.37 13zM12 6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
  </svg>
);
const WhatshotIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
  </svg>
);
const NoteIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M21 6v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h14l4 4zm-2 0l-2-2H5v16h14V6zm-5 1H7v2h7V7zm2 4H7v2h9v-2zm0 4H7v2h9v-2z"/>
  </svg>
);
const TrendingUpIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
  </svg>
);

// ── CSS ─────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --maroon:   #800020;
    --maroon2:  #9b0026;
    --maroon3:  #5c0016;
    --maroon-lt:#fdf2f4;
    --maroon-md:#f9d6dc;
    --white:    #ffffff;
    --offwhite: #f8f9fa;
    --gray:     #6b7280;
    --gray2:    #9ca3af;
    --gray3:    #e5e7eb;
    --gray4:    #f3f4f6;
    --text:     #1f2937;
    --radius:   14px;
    --shadow:   0 2px 16px rgba(128,0,32,0.10);
    --shadow2:  0 4px 24px rgba(128,0,32,0.14);
  }

  body {
    font-family: 'Poppins', sans-serif;
    background: var(--offwhite);
    color: var(--text);
    min-height: 100vh;
  }

  input, select, textarea, button { font-family: 'Poppins', sans-serif; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--gray4); }
  ::-webkit-scrollbar-thumb { background: var(--maroon-md); border-radius: 4px; }

  .app {
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    background: var(--offwhite);
    position: relative;
    padding-bottom: 88px;
  }

  /* ── Header ── */
  .header {
    background: var(--maroon);
    padding: 18px 20px 16px;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 12px rgba(128,0,32,0.25);
  }
  .header-top { display: flex; align-items: center; justify-content: space-between; }
  .header-logo { display: flex; align-items: center; gap: 10px; }
  .logo-icon {
    width: 38px; height: 38px;
    background: rgba(255,255,255,0.18);
    border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    color: #fff; border: 1.5px solid rgba(255,255,255,0.3);
  }
  .header h1 { font-size: 18px; font-weight: 700; color: #fff; }
  .header p { font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 1px; }
  .date-badge {
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.3);
    padding: 5px 13px;
    border-radius: 20px;
    font-size: 11px; font-weight: 600;
    color: #fff;
    display: flex; align-items: center; gap: 5px;
  }

  /* ── Tab Bar ── */
  .tab-bar {
    display: flex;
    background: var(--white);
    border-bottom: 1px solid var(--gray3);
    padding: 0 8px;
  }
  .tab-btn {
    flex: 1; padding: 13px 0;
    background: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    font-size: 12px; font-weight: 600;
    color: var(--gray);
    cursor: pointer;
    transition: all 0.2s;
    display: flex; flex-direction: column;
    align-items: center; gap: 3px;
  }
  .tab-btn.active {
    color: var(--maroon);
    border-bottom-color: var(--maroon);
  }

  /* ── Section ── */
  .section { padding: 16px; }
  .section-title {
    font-size: 11px; font-weight: 700;
    color: var(--gray2); text-transform: uppercase;
    letter-spacing: 0.1em; margin-bottom: 10px;
  }

  /* ── Stats Strip ── */
  .stats-strip {
    display: grid; grid-template-columns: repeat(4,1fr);
    gap: 8px; margin-bottom: 16px;
  }
  .stat-card {
    background: var(--white);
    border: 1px solid var(--gray3);
    border-radius: 12px;
    padding: 12px 6px;
    text-align: center;
    box-shadow: var(--shadow);
  }
  .stat-num { font-size: 22px; font-weight: 800; color: var(--maroon); }
  .stat-label { font-size: 10px; color: var(--gray2); margin-top: 2px; font-weight: 500; }

  /* ── Add Entry Card ── */
  .add-card {
    background: var(--white);
    border: 1px solid var(--gray3);
    border-radius: var(--radius);
    padding: 18px;
    margin-bottom: 16px;
    box-shadow: var(--shadow);
  }
  .add-card h3 {
    font-size: 15px; font-weight: 700;
    margin-bottom: 14px; color: var(--maroon);
    display: flex; align-items: center; gap: 8px;
    padding-bottom: 12px;
    border-bottom: 1.5px solid var(--maroon-md);
  }

  .form-row { display: flex; gap: 10px; margin-bottom: 10px; }
  .form-group { flex: 1; display: flex; flex-direction: column; gap: 5px; }
  .form-group label {
    font-size: 11px; font-weight: 600;
    color: var(--gray); text-transform: uppercase; letter-spacing: 0.05em;
  }

  .form-control {
    background: var(--offwhite);
    border: 1.5px solid var(--gray3);
    border-radius: 9px;
    padding: 10px 12px;
    font-size: 13px;
    color: var(--text);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }
  .form-control:focus {
    border-color: var(--maroon);
    box-shadow: 0 0 0 3px rgba(128,0,32,0.08);
    background: var(--white);
  }
  .form-control option { background: #fff; color: var(--text); }

  .meal-type-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 8px; margin-bottom: 12px;
  }
  .meal-type-btn {
    padding: 11px 8px;
    background: var(--offwhite);
    border: 1.5px solid var(--gray3);
    border-radius: 10px;
    font-size: 12px; font-weight: 600;
    color: var(--gray);
    cursor: pointer;
    transition: all 0.18s;
    display: flex; align-items: center; gap: 7px;
    justify-content: center;
  }
  .meal-type-btn:hover { border-color: var(--maroon-md); color: var(--maroon); }
  .meal-type-btn.selected {
    border-color: var(--maroon);
    background: var(--maroon-lt);
    color: var(--maroon);
    box-shadow: 0 0 0 2px rgba(128,0,32,0.10);
  }
  .meal-type-btn svg { flex-shrink: 0; }

  .btn-add {
    width: 100%; padding: 13px;
    background: var(--maroon);
    border: none; border-radius: 10px;
    font-size: 14px; font-weight: 700;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
    margin-top: 6px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    box-shadow: 0 4px 14px rgba(128,0,32,0.25);
  }
  .btn-add:hover { background: var(--maroon3); box-shadow: 0 4px 20px rgba(128,0,32,0.35); }
  .btn-add:active { transform: scale(0.98); }

  /* ── Meal Section ── */
  .meal-section { margin-bottom: 18px; }
  .meal-section-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 8px; padding: 0 2px;
  }
  .meal-section-title {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 700; color: var(--text);
  }
  .meal-section-title .meal-icon {
    width: 28px; height: 28px;
    background: var(--maroon-lt);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: var(--maroon);
  }
  .meal-count {
    background: var(--maroon);
    color: #fff;
    padding: 2px 9px;
    border-radius: 20px;
    font-size: 11px; font-weight: 700;
  }

  .entry-card {
    background: var(--white);
    border: 1px solid var(--gray3);
    border-left: 3px solid var(--maroon);
    border-radius: 12px;
    padding: 13px 14px;
    margin-bottom: 8px;
    display: flex; align-items: flex-start;
    gap: 12px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
    animation: slideIn 0.22s ease;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .entry-details { flex: 1; min-width: 0; }
  .entry-name { font-size: 14px; font-weight: 600; color: var(--text); }
  .entry-meta {
    font-size: 11px; color: var(--gray2); margin-top: 5px;
    display: flex; gap: 10px; flex-wrap: wrap; align-items: center;
  }
  .entry-chip {
    display: flex; align-items: center; gap: 3px;
    background: var(--gray4); border-radius: 20px;
    padding: 2px 8px; color: var(--gray);
  }
  .entry-chip.time { background: var(--maroon-lt); color: var(--maroon); }
  .entry-chip.cal  { background: #fff7ed; color: #c2410c; }
  .btn-icon {
    background: none; border: none;
    width: 30px; height: 30px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.18s;
    color: var(--gray2);
  }
  .btn-icon:hover { background: #fee2e2; color: #dc2626; }

  .no-entries {
    background: var(--gray4);
    border-radius: 10px;
    text-align: center; padding: 20px;
    color: var(--gray2); font-size: 12px;
    border: 1.5px dashed var(--gray3);
  }

  /* ── Export / History Cards ── */
  .export-card {
    background: var(--white);
    border: 1px solid var(--gray3);
    border-radius: var(--radius);
    padding: 18px;
    margin-bottom: 16px;
    box-shadow: var(--shadow);
  }
  .export-card h3 {
    font-size: 14px; font-weight: 700;
    margin-bottom: 14px; color: var(--maroon);
    display: flex; align-items: center; gap: 8px;
    padding-bottom: 12px;
    border-bottom: 1.5px solid var(--maroon-md);
  }
  .filter-row { display: flex; gap: 8px; margin-bottom: 10px; }
  .export-btns { display: flex; gap: 10px; margin-top: 14px; }
  .btn-export {
    flex: 1; padding: 12px 8px;
    border: none; border-radius: 10px;
    font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 7px;
  }
  .btn-pdf {
    background: var(--maroon);
    color: #fff;
    box-shadow: 0 3px 12px rgba(128,0,32,0.25);
  }
  .btn-pdf:hover { background: var(--maroon3); }
  .btn-excel {
    background: #166534;
    color: #fff;
    box-shadow: 0 3px 12px rgba(22,101,52,0.2);
  }
  .btn-excel:hover { background: #14532d; }

  /* ── History List ── */
  .history-date-group { margin-bottom: 14px; }
  .history-date-label {
    font-size: 11px; font-weight: 700;
    color: var(--maroon); text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 8px;
    display: flex; align-items: center; gap: 6px;
  }
  .history-entry {
    background: var(--white);
    border: 1px solid var(--gray3);
    border-radius: 10px;
    padding: 11px 14px;
    margin-bottom: 7px;
    display: flex; align-items: center; gap: 10px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .meal-badge {
    font-size: 10px; font-weight: 700;
    padding: 3px 9px; border-radius: 20px;
    background: var(--maroon-lt);
    color: var(--maroon); white-space: nowrap;
    border: 1px solid var(--maroon-md);
  }
  .food-name { font-size: 13px; font-weight: 500; flex: 1; color: var(--text); }
  .food-time { font-size: 11px; color: var(--gray2); white-space: nowrap; }

  /* ── Toast ── */
  .toast {
    position: fixed; bottom: 96px; left: 50%;
    transform: translateX(-50%);
    background: var(--maroon);
    color: #fff;
    padding: 10px 22px;
    border-radius: 20px;
    font-size: 13px; font-weight: 600;
    z-index: 999;
    box-shadow: 0 4px 20px rgba(128,0,32,0.3);
    animation: toastIn 0.3s ease, toastOut 0.3s ease 1.7s forwards;
    white-space: nowrap;
  }
  @keyframes toastIn  { from { opacity:0; bottom:80px; } to { opacity:1; bottom:96px; } }
  @keyframes toastOut { from { opacity:1; } to { opacity:0; } }

  /* ── Bottom Nav ── */
  .bottom-nav {
    position: fixed; bottom: 0; left: 50%;
    transform: translateX(-50%);
    width: 100%; max-width: 480px;
    background: var(--white);
    border-top: 1px solid var(--gray3);
    display: flex;
    z-index: 200;
    box-shadow: 0 -2px 16px rgba(0,0,0,0.06);
  }
  .nav-btn {
    flex: 1; padding: 10px 0 12px;
    background: none; border: none;
    display: flex; flex-direction: column;
    align-items: center; gap: 3px;
    cursor: pointer; color: var(--gray2);
    font-size: 10px; font-weight: 600;
    transition: color 0.18s;
    border-top: 2.5px solid transparent;
  }
  .nav-btn.active { color: var(--maroon); border-top-color: var(--maroon); }

  .badge-pill {
    display: inline-flex; align-items: center; justify-content: center;
    background: var(--maroon-lt);
    color: var(--maroon);
    font-size: 11px; font-weight: 700;
    border-radius: 20px; padding: 3px 10px;
    border: 1px solid var(--maroon-md);
  }

  @media (min-width: 481px) {
    .app { box-shadow: var(--shadow2); min-height: auto; border-radius: 20px; margin: 20px auto; }
    .bottom-nav { border-radius: 0 0 20px 20px; }
  }
`;

// ── Constants ─────────────────────────────────────────────────────────────────
const MEAL_TYPES = [
  { id: "breakfast", label: "Breakfast", MuiIcon: WbSunnyIcon },
  { id: "lunch",     label: "Lunch",     MuiIcon: LunchIcon },
  { id: "dinner",    label: "Dinner",    MuiIcon: NightIcon },
  { id: "snacks",    label: "Snacks",    MuiIcon: SnackIcon },
];

const STORAGE_KEY = "foodtracker_v2";

function today() { return new Date().toISOString().slice(0, 10); }

function formatDate(d) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "short", year: "numeric"
  });
}

function loadData() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveData(d) { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); }

// ── App ───────────────────────────────────────────────────────────────────────
export default function FoodTracker() {
  const [tab, setTab] = useState("today");
  const [entries, setEntries] = useState(loadData);
  const [toast, setToast]   = useState("");

  const [mealType,  setMealType]  = useState("breakfast");
  const [foodName,  setFoodName]  = useState("");
  const [qty,       setQty]       = useState("");
  const [calories,  setCalories]  = useState("");
  const [time,      setTime]      = useState(() => new Date().toTimeString().slice(0,5));
  const [notes,     setNotes]     = useState("");

  const [fromDate,    setFromDate]    = useState(() => { const d=new Date(); d.setDate(d.getDate()-6); return d.toISOString().slice(0,10); });
  const [toDate,      setToDate]      = useState(today);
  const [filterMeal,  setFilterMeal]  = useState("all");

  useEffect(() => { saveData(entries); }, [entries]);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(""),2000); };

  const addEntry = () => {
    if (!foodName.trim()) return showToast("Enter a food name!");
    setEntries(prev => [{
      id: Date.now(), date: today(), mealType,
      foodName: foodName.trim(), qty: qty.trim(),
      calories: calories ? Number(calories) : null,
      time, notes: notes.trim(),
    }, ...prev]);
    setFoodName(""); setQty(""); setCalories(""); setNotes("");
    showToast("✓ Entry added!");
  };

  const deleteEntry = (id) => { setEntries(prev=>prev.filter(e=>e.id!==id)); showToast("Deleted"); };

  const todayEntries = useMemo(()=>entries.filter(e=>e.date===today()),[entries]);
  const todayStats   = useMemo(()=>({
    total: todayEntries.length,
    cals:  todayEntries.reduce((s,e)=>s+(e.calories||0),0),
    meals: new Set(todayEntries.map(e=>e.mealType)).size,
  }), [todayEntries]);

  const filteredEntries = useMemo(()=>entries.filter(e=>{
    const inRange = e.date>=fromDate && e.date<=toDate;
    const mealOk  = filterMeal==="all" || e.mealType===filterMeal;
    return inRange && mealOk;
  }).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)),[entries,fromDate,toDate,filterMeal]);

  // ── PDF Export ──────────────────────────────────────────────────────────────
  const exportPDF = async () => {
    if (!filteredEntries.length) return showToast("No data to export!");
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    document.head.appendChild(script);
    await new Promise(r => { script.onload = r; });

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit:"mm", format:"a4" });
    const W = 210, m = 14;

    // ── Header band ──────────────────────────────────────────────────────────
    // White background
    doc.setFillColor(255,255,255);
    doc.rect(0,0,W,42,"F");

    // Maroon left stripe
    doc.setFillColor(128,0,32);
    doc.rect(0,0,6,42,"F");

    // Top maroon bar with rounded bottom
    doc.setFillColor(128,0,32);
    doc.rect(6,0,W-6,26,"F");

    // App title — large, white, bold (clearly visible)
    doc.setFont("helvetica","bold");
    doc.setFontSize(22);
    doc.setTextColor(255,255,255);
    doc.text("Daily Food Tracker", m+4, 16);

    // Subtitle / tagline
    doc.setFont("helvetica","normal");
    doc.setFontSize(9);
    doc.setTextColor(255,255,255);
    doc.text("Track every bite, every day", m+4, 23);

    // Light info bar below the maroon band
    doc.setFillColor(253,242,244);
    doc.rect(6,26,W-6,16,"F");

    doc.setFont("helvetica","bold");
    doc.setFontSize(8.5);
    doc.setTextColor(128,0,32);
    doc.text("PERIOD:", m+4, 33);
    doc.setFont("helvetica","normal");
    doc.setTextColor(55,65,81);
    doc.text(`${formatDate(fromDate)}  to  ${formatDate(toDate)}`, m+24, 33);

    doc.setFont("helvetica","bold");
    doc.setTextColor(128,0,32);
    doc.text("MEAL:", m+4, 39.5);
    doc.setFont("helvetica","normal");
    doc.setTextColor(55,65,81);
    const mealLabel = filterMeal==="all" ? "All Meals" : MEAL_TYPES.find(m2=>m2.id===filterMeal)?.label||filterMeal;
    doc.text(mealLabel, m+22, 39.5);

    doc.setFont("helvetica","bold");
    doc.setTextColor(128,0,32);
    doc.text("ENTRIES:", m+90, 39.5);
    doc.setFont("helvetica","normal");
    doc.setTextColor(55,65,81);
    doc.text(String(filteredEntries.length), m+112, 39.5);

    // Generated on
    doc.setFont("helvetica","italic");
    doc.setFontSize(7.5);
    doc.setTextColor(107,114,128);
    doc.text(`Generated: ${new Date().toLocaleString("en-IN")}`, W-m-2, 39.5, { align:"right" });

    let y = 50;

    // Group by date
    const grouped = {};
    filteredEntries.forEach(e => { if(!grouped[e.date]) grouped[e.date]=[]; grouped[e.date].push(e); });

    Object.entries(grouped).sort().forEach(([date, dayEntries]) => {
      if(y > 262) { doc.addPage(); y = 16; }

      // Date header row
      doc.setFillColor(128,0,32);
      doc.roundedRect(m, y, W-m*2, 9, 2, 2, "F");
      doc.setFont("helvetica","bold");
      doc.setFontSize(9);
      doc.setTextColor(255,255,255);
      doc.text(formatDate(date), m+4, y+6.2);
      y += 13;

      // Column headers
      doc.setFillColor(253,242,244);
      doc.rect(m, y, W-m*2, 7, "F");
      doc.setDrawColor(249,214,220);
      doc.rect(m, y, W-m*2, 7, "S");
      doc.setFont("helvetica","bold");
      doc.setFontSize(7.5);
      doc.setTextColor(128,0,32);
      const cols = [
        { label:"MEAL",      x: m+2 },
        { label:"FOOD ITEM", x: m+28 },
        { label:"QTY",       x: m+100 },
        { label:"CALORIES",  x: m+122 },
        { label:"TIME",      x: m+148 },
        { label:"NOTES",     x: m+163 },
      ];
      cols.forEach(c => doc.text(c.label, c.x, y+5));
      y += 8;

      // Rows
      dayEntries.forEach((e,i) => {
        if(y > 272) { doc.addPage(); y = 16; }
        doc.setFillColor(i%2===0 ? 255:249,i%2===0 ? 255:250,i%2===0 ? 255:251);
        doc.rect(m, y, W-m*2, 7.5, "F");
        doc.setDrawColor(229,231,235);
        doc.rect(m, y, W-m*2, 7.5, "S");

        const mt = MEAL_TYPES.find(x=>x.id===e.mealType);
        doc.setFont("helvetica","bold");
        doc.setFontSize(7.5);
        doc.setTextColor(128,0,32);
        doc.text((mt?.label||e.mealType).toUpperCase(), m+2, y+5.2);

        doc.setFont("helvetica","normal");
        doc.setTextColor(31,41,55);
        doc.text(e.foodName.slice(0,32), m+28, y+5.2);
        doc.setTextColor(107,114,128);
        doc.text(e.qty||"—",          m+100, y+5.2);
        doc.text(e.calories?`${e.calories} kcal`:"—", m+122, y+5.2);
        doc.text(e.time||"—",         m+148, y+5.2);
        doc.text((e.notes||"—").slice(0,18), m+163, y+5.2);
        y += 8;
      });

      // Day summary
      const dayCals = dayEntries.reduce((s,e)=>s+(e.calories||0),0);
      doc.setFillColor(249,214,220);
      doc.rect(m, y, W-m*2, 6.5, "F");
      doc.setFont("helvetica","bold");
      doc.setFontSize(8);
      doc.setTextColor(92,0,22);
      doc.text(`Day Total: ${dayCals} kcal  |  ${dayEntries.length} item${dayEntries.length!==1?"s":""}`,m+4,y+4.6);
      y += 10;
    });

    // ── Grand total footer ─────────────────────────────────────────────────
    if(y < 272) {
      y += 4;
      doc.setFillColor(128,0,32);
      doc.roundedRect(m, y, W-m*2, 10, 2,2, "F");
      doc.setFont("helvetica","bold");
      doc.setFontSize(9.5);
      doc.setTextColor(255,255,255);
      const grandCals = filteredEntries.reduce((s,e)=>s+(e.calories||0),0);
      doc.text(`Grand Total: ${grandCals} kcal  |  ${filteredEntries.length} entries`, m+4, y+7);
    }

    doc.save(`FoodLog_${fromDate}_to_${toDate}.pdf`);
    showToast("📄 PDF exported!");
  };

  // ── Excel Export ────────────────────────────────────────────────────────────
  const exportExcel = async () => {
    if(!filteredEntries.length) return showToast("No data to export!");
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    document.head.appendChild(script);
    await new Promise(r=>{script.onload=r;});
    const XLSX = window.XLSX;
    const rows = [["Date","Meal Type","Food Item","Quantity","Calories (kcal)","Time","Notes"]];
    filteredEntries.forEach(e=>{
      const mt=MEAL_TYPES.find(m=>m.id===e.mealType);
      rows.push([formatDate(e.date),mt?.label||e.mealType,e.foodName,e.qty||"",e.calories||"",e.time||"",e.notes||""]);
    });
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws["!cols"] = [18,12,30,14,15,8,24].map(w=>({wch:w}));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"Food Log");
    XLSX.writeFile(wb,`FoodLog_${fromDate}_to_${toDate}.xlsx`);
    showToast("📊 Excel exported!");
  };

  const byMeal = useMemo(()=>{
    const m={};
    MEAL_TYPES.forEach(mt=>{ m[mt.id]=todayEntries.filter(e=>e.mealType===mt.id); });
    return m;
  },[todayEntries]);

  const historyGrouped = useMemo(()=>{
    const g={};
    filteredEntries.forEach(e=>{ if(!g[e.date]) g[e.date]=[]; g[e.date].push(e); });
    return Object.entries(g).sort((a,b)=>b[0].localeCompare(a[0]));
  },[filteredEntries]);

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div className="app">

        {/* Header */}
        <div className="header">
          <div className="header-top">
            <div className="header-logo">
              <div className="logo-icon"><LocalDiningIcon /></div>
              <div>
                <h1>FoodLog</h1>
                <p>Your daily nutrition journal</p>
              </div>
            </div>
            <div className="date-badge">
              <CalendarIcon />
              {new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short"})}
            </div>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="tab-bar">
          {[
            { id:"today",   label:"Today",   Icon:HomeIcon },
            { id:"history", label:"History", Icon:HistoryIcon },
            { id:"export",  label:"Export",  Icon:DownloadIcon },
          ].map(({id,label,Icon})=>(
            <button key={id} className={`tab-btn ${tab===id?"active":""}`} onClick={()=>setTab(id)}>
              <Icon/>{label}
            </button>
          ))}
        </div>

        {/* ── TODAY ── */}
        {tab==="today" && (
          <div className="section">
            {/* Stats */}
            <div className="stats-strip">
              {[
                {num:todayStats.total, label:"Items"},
                {num:todayStats.cals,  label:"kcal"},
                {num:todayStats.meals, label:"Meals"},
                {num:entries.length,   label:"All-time"},
              ].map((s,i)=>(
                <div key={i} className="stat-card">
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Add form */}
            <div className="add-card">
              <h3><AddIcon /> Add Food Entry</h3>

              <div className="section-title" style={{marginBottom:8}}>Select Meal Type</div>
              <div className="meal-type-grid">
                {MEAL_TYPES.map(mt=>(
                  <button
                    key={mt.id}
                    className={`meal-type-btn ${mealType===mt.id?"selected":""}`}
                    onClick={()=>setMealType(mt.id)}
                  >
                    <mt.MuiIcon /> {mt.label}
                  </button>
                ))}
              </div>

              <div className="form-row">
                <div className="form-group" style={{flex:2}}>
                  <label>Food / Dish Name *</label>
                  <input
                    className="form-control"
                    placeholder="e.g. Idli with sambar"
                    value={foodName}
                    onChange={e=>setFoodName(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&addEntry()}
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input type="time" className="form-control" value={time} onChange={e=>setTime(e.target.value)} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Quantity</label>
                  <input className="form-control" placeholder="e.g. 2 pieces" value={qty} onChange={e=>setQty(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Calories (kcal)</label>
                  <input type="number" className="form-control" placeholder="e.g. 250" value={calories} onChange={e=>setCalories(e.target.value)} />
                </div>
              </div>

              <div className="form-group" style={{marginBottom:6}}>
                <label>Notes (optional)</label>
                <input className="form-control" placeholder="e.g. homemade, low oil..." value={notes} onChange={e=>setNotes(e.target.value)} />
              </div>

              <button className="btn-add" onClick={addEntry}>
                <AddIcon /> Add Entry
              </button>
            </div>

            {/* Meal sections */}
            {MEAL_TYPES.map(mt=>(
              <div key={mt.id} className="meal-section">
                <div className="meal-section-header">
                  <div className="meal-section-title">
                    <div className="meal-icon"><mt.MuiIcon /></div>
                    {mt.label}
                  </div>
                  {byMeal[mt.id].length>0 && <span className="meal-count">{byMeal[mt.id].length}</span>}
                </div>
                {byMeal[mt.id].length===0 ? (
                  <div className="no-entries">No {mt.label.toLowerCase()} logged yet</div>
                ) : byMeal[mt.id].map(entry=>(
                  <EntryCard key={entry.id} entry={entry} onDelete={deleteEntry} />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── HISTORY ── */}
        {tab==="history" && (
          <div className="section">
            <div className="export-card">
              <h3><FilterIcon /> Filter History</h3>
              <div className="filter-row">
                <div className="form-group">
                  <label>From Date</label>
                  <input type="date" className="form-control" value={fromDate} onChange={e=>setFromDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>To Date</label>
                  <input type="date" className="form-control" value={toDate} onChange={e=>setToDate(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Meal Type</label>
                <select className="form-control" value={filterMeal} onChange={e=>setFilterMeal(e.target.value)}>
                  <option value="all">All Meals</option>
                  {MEAL_TYPES.map(m=><option key={m.id} value={m.id}>{m.label}</option>)}
                </select>
              </div>
              <p style={{fontSize:12,color:"var(--maroon)",fontWeight:600,marginTop:10}}>
                {filteredEntries.length} entries found
              </p>
            </div>

            {historyGrouped.length===0 ? (
              <div className="no-entries" style={{padding:40}}>
                <div style={{fontSize:36,marginBottom:10}}>📭</div>
                No entries in this date range
              </div>
            ) : historyGrouped.map(([date,dayEntries])=>(
              <div key={date} className="history-date-group">
                <div className="history-date-label"><CalendarIcon />{formatDate(date)}</div>
                {dayEntries.map(e=>{
                  const mt=MEAL_TYPES.find(m=>m.id===e.mealType);
                  return (
                    <div key={e.id} className="history-entry">
                      <span className="meal-badge">{mt?.label}</span>
                      <span className="food-name">{e.foodName}{e.qty?` · ${e.qty}`:""}</span>
                      <span className="food-time">{e.time}</span>
                      <button className="btn-icon" onClick={()=>deleteEntry(e.id)}><DeleteIcon /></button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* ── EXPORT ── */}
        {tab==="export" && (
          <div className="section">
            <div className="export-card">
              <h3><DownloadIcon /> Export Data</h3>
              <div className="filter-row">
                <div className="form-group">
                  <label>From Date</label>
                  <input type="date" className="form-control" value={fromDate} onChange={e=>setFromDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>To Date</label>
                  <input type="date" className="form-control" value={toDate} onChange={e=>setToDate(e.target.value)} />
                </div>
              </div>
              <div className="form-group" style={{marginBottom:6}}>
                <label>Filter by Meal Type</label>
                <select className="form-control" value={filterMeal} onChange={e=>setFilterMeal(e.target.value)}>
                  <option value="all">All Meals</option>
                  {MEAL_TYPES.map(m=><option key={m.id} value={m.id}>{m.label}</option>)}
                </select>
              </div>
              <p style={{fontSize:12,color:"var(--maroon)",fontWeight:700,marginTop:10}}>
                {filteredEntries.length} entries will be exported
              </p>
              <div className="export-btns">
                <button className="btn-export btn-pdf" onClick={exportPDF}>
                  <PictureAsPdfIcon /> Export PDF
                </button>
                <button className="btn-export btn-excel" onClick={exportExcel}>
                  <TableChartIcon /> Export Excel
                </button>
              </div>
            </div>

            <div className="section-title">Export Preview</div>
            {filteredEntries.length===0 && <div className="no-entries">No entries for selected filters</div>}
            {filteredEntries.slice(0,6).map(e=>{
              const mt=MEAL_TYPES.find(m=>m.id===e.mealType);
              return (
                <div key={e.id} className="history-entry" style={{marginBottom:8}}>
                  <span className="meal-badge">{mt?.label}</span>
                  <span className="food-name">{e.foodName}</span>
                  <span className="food-time" style={{fontSize:10}}>{e.date}</span>
                </div>
              );
            })}
            {filteredEntries.length>6 && (
              <p style={{fontSize:12,color:"var(--gray2)",textAlign:"center",marginTop:8}}>
                + {filteredEntries.length-6} more entries…
              </p>
            )}
          </div>
        )}

        {/* Bottom Nav */}
        <nav className="bottom-nav">
          {[
            { id:"today",   label:"Today",   Icon:HomeIcon },
            { id:"history", label:"History", Icon:HistoryIcon },
            { id:"export",  label:"Export",  Icon:DownloadIcon },
          ].map(({id,label,Icon})=>(
            <button key={id} className={`nav-btn ${tab===id?"active":""}`} onClick={()=>setTab(id)}>
              <Icon />{label}
            </button>
          ))}
        </nav>

        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}

function EntryCard({ entry, onDelete }) {
  return (
    <div className="entry-card">
      <div className="entry-details">
        <div className="entry-name">{entry.foodName}</div>
        <div className="entry-meta">
          <span className="entry-chip time"><AccessTimeIcon />{entry.time}</span>
          {entry.qty     && <span className="entry-chip"><ScaleIcon />{entry.qty}</span>}
          {entry.calories && <span className="entry-chip cal"><WhatshotIcon />{entry.calories} kcal</span>}
          {entry.notes   && <span className="entry-chip"><NoteIcon />{entry.notes}</span>}
        </div>
      </div>
      <button className="btn-icon" onClick={()=>onDelete(entry.id)}><DeleteIcon /></button>
    </div>
  );
}