import { useState, useEffect, useMemo, useCallback } from "react";

// ── Firebase (loaded via CDN scripts, initialized once) ──────────────────────
let db = null;
let fbLoaded = false;

async function loadFirebase() {
  if (fbLoaded) return db;
  await loadScript("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
  await loadScript("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js");

  const firebaseConfig = {
    apiKey: "AIzaSyDKbjA9o75fVyNQxUWKkmDMUN1EYgpEd80",
    authDomain: "food-tracker-d29fb.firebaseapp.com",
    projectId: "food-tracker-d29fb",
    storageBucket: "food-tracker-d29fb.firebasestorage.app",
    messagingSenderId: "912403468297",
    appId: "1:912403468297:web:538ef395319ff7436ae8d8",
  };

  if (!window.firebase.apps.length) window.firebase.initializeApp(firebaseConfig);
  db = window.firebase.firestore();
  fbLoaded = true;
  return db;
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

// ── Firestore helpers ────────────────────────────────────────────────────────
const COLLECTION = "food_entries";

async function fsAdd(entry) {
  const firestore = await loadFirebase();
  const ref = await firestore.collection(COLLECTION).add(entry);
  return ref.id;
}

async function fsDelete(id) {
  const firestore = await loadFirebase();
  await firestore.collection(COLLECTION).doc(id).delete();
}

async function fsSubscribe(callback) {
  const firestore = await loadFirebase();
  return firestore
    .collection(COLLECTION)
    .orderBy("createdAt", "desc")
    .onSnapshot(snap => {
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      callback(docs);
    });
}

// ── MUI Icons ─────────────────────────────────────────────────────────────────
const HomeIcon       = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>;
const HistoryIcon    = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>;
const DownloadIcon   = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>;
const AddIcon        = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>;
const DeleteIcon     = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>;
const WbSunnyIcon    = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>;
const LunchIcon      = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>;
const NightIcon      = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>;
const SnackIcon      = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2H1z"/></svg>;
const FilterIcon     = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>;
const PdfIcon        = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/></svg>;
const ExcelIcon      = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 2v3H5V5h15zm-8 14H5v-5h7v5zm0-7H5v-5h7v5zm8 7h-6v-5h6v5zm0-7h-6v-5h6v5z"/></svg>;
const DiningIcon     = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2H1z"/></svg>;
const CalendarIcon   = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>;
const TimeIcon       = () => <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>;
const NoteIcon       = () => <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M21 6v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h14l4 4zm-2 0l-2-2H5v16h14V6zm-5 1H7v2h7V7zm2 4H7v2h9v-2zm0 4H7v2h9v-2z"/></svg>;
const CloudIcon      = () => <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>;
const SyncIcon       = () => <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>;

// ── CSS ───────────────────────────────────────────────────────────────────────
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
    --shadow:   0 2px 16px rgba(128,0,32,0.09);
    --shadow2:  0 4px 24px rgba(128,0,32,0.13);
  }
  body { font-family:'Poppins',sans-serif; background:var(--offwhite); color:var(--text); min-height:100vh; }
  input,select,textarea,button { font-family:'Poppins',sans-serif; }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:var(--gray4); }
  ::-webkit-scrollbar-thumb { background:var(--maroon-md); border-radius:4px; }

  .app { max-width:480px; margin:0 auto; min-height:100vh; background:var(--offwhite); position:relative; padding-bottom:88px; }

  /* Header */
  .header { background:var(--maroon); padding:18px 20px 14px; position:sticky; top:0; z-index:100; box-shadow:0 2px 12px rgba(128,0,32,0.25); }
  .header-top { display:flex; align-items:center; justify-content:space-between; }
  .header-logo { display:flex; align-items:center; gap:10px; }
  .logo-icon { width:38px;height:38px;background:rgba(255,255,255,0.18);border-radius:11px;display:flex;align-items:center;justify-content:center;color:#fff;border:1.5px solid rgba(255,255,255,0.3); }
  .header h1 { font-size:18px;font-weight:700;color:#fff; }
  .header p  { font-size:11px;color:rgba(255,255,255,0.7);margin-top:1px; }
  .date-badge { background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);padding:5px 13px;border-radius:20px;font-size:11px;font-weight:600;color:#fff;display:flex;align-items:center;gap:5px; }

  /* Sync status bar */
  .sync-bar { display:flex;align-items:center;gap:6px;padding:6px 14px;font-size:11px;font-weight:500; }
  .sync-bar.syncing { background:#fff7ed;color:#92400e; }
  .sync-bar.ok      { background:#f0fdf4;color:#166534; }
  .sync-bar.err     { background:#fef2f2;color:#991b1b; }
  .sync-dot { width:7px;height:7px;border-radius:50%;flex-shrink:0; }
  .sync-dot.pulse { animation:pulse 1.2s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.35} }

  /* Tab bar */
  .tab-bar { display:flex;background:var(--white);border-bottom:1px solid var(--gray3);padding:0 8px; }
  .tab-btn { flex:1;padding:12px 0;background:transparent;border:none;border-bottom:3px solid transparent;font-size:12px;font-weight:600;color:var(--gray);cursor:pointer;transition:all 0.2s;display:flex;flex-direction:column;align-items:center;gap:3px; }
  .tab-btn.active { color:var(--maroon);border-bottom-color:var(--maroon); }

  /* Section */
  .section { padding:16px; }
  .section-title { font-size:11px;font-weight:700;color:var(--gray2);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px; }

  /* Stats */
  .stats-strip { display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px; }
  .stat-card { background:var(--white);border:1px solid var(--gray3);border-radius:12px;padding:14px 8px;text-align:center;box-shadow:var(--shadow); }
  .stat-num { font-size:24px;font-weight:800;color:var(--maroon); }
  .stat-label { font-size:10px;color:var(--gray2);margin-top:2px;font-weight:500; }

  /* Add card */
  .add-card { background:var(--white);border:1px solid var(--gray3);border-radius:var(--radius);padding:18px;margin-bottom:16px;box-shadow:var(--shadow); }
  .add-card h3 { font-size:15px;font-weight:700;margin-bottom:14px;color:var(--maroon);display:flex;align-items:center;gap:8px;padding-bottom:12px;border-bottom:1.5px solid var(--maroon-md); }
  .form-row { display:flex;gap:10px;margin-bottom:10px; }
  .form-group { flex:1;display:flex;flex-direction:column;gap:5px; }
  .form-group label { font-size:11px;font-weight:600;color:var(--gray);text-transform:uppercase;letter-spacing:0.05em; }
  .form-control { background:var(--offwhite);border:1.5px solid var(--gray3);border-radius:9px;padding:10px 12px;font-size:13px;color:var(--text);outline:none;transition:border-color 0.2s,box-shadow 0.2s;width:100%; }
  .form-control:focus { border-color:var(--maroon);box-shadow:0 0 0 3px rgba(128,0,32,0.08);background:var(--white); }
  .form-control option { background:#fff;color:var(--text); }
  .meal-type-grid { display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px; }
  .meal-type-btn { padding:11px 8px;background:var(--offwhite);border:1.5px solid var(--gray3);border-radius:10px;font-size:12px;font-weight:600;color:var(--gray);cursor:pointer;transition:all 0.18s;display:flex;align-items:center;gap:7px;justify-content:center; }
  .meal-type-btn:hover { border-color:var(--maroon-md);color:var(--maroon); }
  .meal-type-btn.selected { border-color:var(--maroon);background:var(--maroon-lt);color:var(--maroon);box-shadow:0 0 0 2px rgba(128,0,32,0.10); }
  .btn-add { width:100%;padding:13px;background:var(--maroon);border:none;border-radius:10px;font-size:14px;font-weight:700;color:#fff;cursor:pointer;transition:background 0.2s,transform 0.1s,box-shadow 0.2s;margin-top:6px;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 14px rgba(128,0,32,0.25); }
  .btn-add:hover { background:var(--maroon3); }
  .btn-add:active { transform:scale(0.98); }
  .btn-add:disabled { opacity:0.6;cursor:not-allowed; }

  /* Meal sections */
  .meal-section { margin-bottom:18px; }
  .meal-section-header { display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding:0 2px; }
  .meal-section-title { display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:var(--text); }
  .meal-icon { width:28px;height:28px;background:var(--maroon-lt);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--maroon); }
  .meal-count { background:var(--maroon);color:#fff;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:700; }

  .entry-card { background:var(--white);border:1px solid var(--gray3);border-left:3px solid var(--maroon);border-radius:12px;padding:13px 14px;margin-bottom:8px;display:flex;align-items:flex-start;gap:12px;box-shadow:0 1px 6px rgba(0,0,0,0.04);animation:slideIn 0.22s ease; }
  @keyframes slideIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
  .entry-details { flex:1;min-width:0; }
  .entry-name { font-size:14px;font-weight:600;color:var(--text); }
  .entry-meta { font-size:11px;color:var(--gray2);margin-top:5px;display:flex;gap:8px;flex-wrap:wrap;align-items:center; }
  .entry-chip { display:flex;align-items:center;gap:3px;background:var(--gray4);border-radius:20px;padding:2px 8px;color:var(--gray); }
  .entry-chip.time { background:var(--maroon-lt);color:var(--maroon); }
  .btn-icon { background:none;border:none;width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background 0.18s;color:var(--gray2); }
  .btn-icon:hover { background:#fee2e2;color:#dc2626; }

  .no-entries { background:var(--gray4);border-radius:10px;text-align:center;padding:20px;color:var(--gray2);font-size:12px;border:1.5px dashed var(--gray3); }

  /* History / Export */
  .export-card { background:var(--white);border:1px solid var(--gray3);border-radius:var(--radius);padding:18px;margin-bottom:16px;box-shadow:var(--shadow); }
  .export-card h3 { font-size:14px;font-weight:700;margin-bottom:14px;color:var(--maroon);display:flex;align-items:center;gap:8px;padding-bottom:12px;border-bottom:1.5px solid var(--maroon-md); }
  .filter-row { display:flex;gap:8px;margin-bottom:10px; }
  .export-btns { display:flex;gap:10px;margin-top:14px; }
  .btn-export { flex:1;padding:12px 8px;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:7px; }
  .btn-pdf   { background:var(--maroon);color:#fff;box-shadow:0 3px 12px rgba(128,0,32,0.25); }
  .btn-pdf:hover { background:var(--maroon3); }
  .btn-excel { background:#166534;color:#fff;box-shadow:0 3px 12px rgba(22,101,52,0.2); }
  .btn-excel:hover { background:#14532d; }

  .history-date-group { margin-bottom:14px; }
  .history-date-label { font-size:11px;font-weight:700;color:var(--maroon);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:8px;display:flex;align-items:center;gap:6px; }
  .history-entry { background:var(--white);border:1px solid var(--gray3);border-radius:10px;padding:11px 14px;margin-bottom:7px;display:flex;align-items:center;gap:10px;box-shadow:0 1px 4px rgba(0,0,0,0.04); }
  .meal-badge { font-size:10px;font-weight:700;padding:3px 9px;border-radius:20px;background:var(--maroon-lt);color:var(--maroon);white-space:nowrap;border:1px solid var(--maroon-md); }
  .food-name  { font-size:13px;font-weight:500;flex:1;color:var(--text); }
  .food-time  { font-size:11px;color:var(--gray2);white-space:nowrap; }

  /* Loading skeleton */
  .skeleton { background:linear-gradient(90deg,var(--gray4) 25%,var(--gray3) 50%,var(--gray4) 75%);background-size:200% 100%;animation:shimmer 1.4s infinite;border-radius:10px;height:56px;margin-bottom:8px; }
  @keyframes shimmer { 0%{background-position:200% 0}100%{background-position:-200% 0} }

  /* Toast */
  .toast { position:fixed;bottom:96px;left:50%;transform:translateX(-50%);background:var(--maroon);color:#fff;padding:10px 22px;border-radius:20px;font-size:13px;font-weight:600;z-index:999;box-shadow:0 4px 20px rgba(128,0,32,0.3);animation:toastIn 0.3s ease,toastOut 0.3s ease 1.7s forwards;white-space:nowrap; }
  @keyframes toastIn  { from{opacity:0;bottom:80px}to{opacity:1;bottom:96px} }
  @keyframes toastOut { from{opacity:1}to{opacity:0} }

  /* Bottom nav */
  .bottom-nav { position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:480px;background:var(--white);border-top:1px solid var(--gray3);display:flex;z-index:200;box-shadow:0 -2px 16px rgba(0,0,0,0.06); }
  .nav-btn { flex:1;padding:10px 0 12px;background:none;border:none;display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;color:var(--gray2);font-size:10px;font-weight:600;transition:color 0.18s;border-top:2.5px solid transparent; }
  .nav-btn.active { color:var(--maroon);border-top-color:var(--maroon); }

  @media (min-width:481px) {
    .app { box-shadow:var(--shadow2);min-height:auto;border-radius:20px;margin:20px auto; }
    .bottom-nav { border-radius:0 0 20px 20px; }
  }
`;

// ── Constants ──────────────────────────────────────────────────────────────────
const MEAL_TYPES = [
  { id:"breakfast", label:"Breakfast", Icon: WbSunnyIcon },
  { id:"lunch",     label:"Lunch",     Icon: LunchIcon   },
  { id:"dinner",    label:"Dinner",    Icon: NightIcon   },
  { id:"snacks",    label:"Snacks",    Icon: SnackIcon   },
];

function today() { return new Date().toISOString().slice(0,10); }
function formatDate(d) {
  return new Date(d+"T00:00:00").toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short",year:"numeric"});
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function FoodTracker() {
  const [tab,       setTab]       = useState("today");
  const [entries,   setEntries]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [syncState, setSyncState] = useState("ok"); // "ok" | "syncing" | "err"
  const [toast,     setToast]     = useState("");

  // form
  const [mealType, setMealType] = useState("breakfast");
  const [foodName, setFoodName] = useState("");
  const [time,     setTime]     = useState(() => new Date().toTimeString().slice(0,5));
  const [notes,    setNotes]    = useState("");
  const [saving,   setSaving]   = useState(false);

  // filters
  const [fromDate,   setFromDate]   = useState(() => { const d=new Date(); d.setDate(d.getDate()-6); return d.toISOString().slice(0,10); });
  const [toDate,     setToDate]     = useState(today);
  const [filterMeal, setFilterMeal] = useState("all");

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(""), 2200); };

  // ── Subscribe to Firestore real-time ────────────────────────────────────────
  useEffect(() => {
    let unsub;
    setSyncState("syncing");
    fsSubscribe(docs => {
      setEntries(docs);
      setLoading(false);
      setSyncState("ok");
    }).then(u => { unsub = u; })
      .catch(() => { setSyncState("err"); setLoading(false); });
    return () => unsub && unsub();
  }, []);

  // ── Add entry ───────────────────────────────────────────────────────────────
  const addEntry = useCallback(async () => {
    if (!foodName.trim()) return showToast("Enter a food name!");
    setSaving(true);
    setSyncState("syncing");
    try {
      await fsAdd({
        date: today(),
        mealType,
        foodName: foodName.trim(),
        time,
        notes: notes.trim(),
        createdAt: Date.now(),
      });
      setFoodName(""); setNotes("");
      setTime(new Date().toTimeString().slice(0,5));
      showToast("✓ Saved to Firebase!");
    } catch {
      setSyncState("err");
      showToast("❌ Save failed. Check connection.");
    }
    setSaving(false);
  }, [foodName, mealType, time, notes]);

  // ── Delete entry ────────────────────────────────────────────────────────────
  const deleteEntry = useCallback(async (id) => {
    setSyncState("syncing");
    try {
      await fsDelete(id);
      showToast("Deleted");
    } catch {
      setSyncState("err");
      showToast("❌ Delete failed");
    }
  }, []);

  // ── Derived ──────────────────────────────────────────────────────────────────
  const todayEntries = useMemo(()=>entries.filter(e=>e.date===today()),[entries]);
  const todayStats   = useMemo(()=>({
    total: todayEntries.length,
    meals: new Set(todayEntries.map(e=>e.mealType)).size,
  }), [todayEntries]);

  const filteredEntries = useMemo(()=>entries.filter(e=>{
    return e.date>=fromDate && e.date<=toDate && (filterMeal==="all"||e.mealType===filterMeal);
  }).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)),[entries,fromDate,toDate,filterMeal]);

  const byMeal = useMemo(()=>{
    const m={}; MEAL_TYPES.forEach(mt=>{ m[mt.id]=todayEntries.filter(e=>e.mealType===mt.id); }); return m;
  },[todayEntries]);

  const historyGrouped = useMemo(()=>{
    const g={}; filteredEntries.forEach(e=>{ if(!g[e.date]) g[e.date]=[]; g[e.date].push(e); });
    return Object.entries(g).sort((a,b)=>b[0].localeCompare(a[0]));
  },[filteredEntries]);

  // ── PDF Export ───────────────────────────────────────────────────────────────
  const exportPDF = async () => {
    if (!filteredEntries.length) return showToast("No data to export!");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit:"mm", format:"a4" });
    const W=210, m=14;

    // Header
    doc.setFillColor(255,255,255); doc.rect(0,0,W,42,"F");
    doc.setFillColor(128,0,32);    doc.rect(0,0,6,42,"F");
    doc.setFillColor(128,0,32);    doc.rect(6,0,W-6,26,"F");
    doc.setFont("helvetica","bold"); doc.setFontSize(22); doc.setTextColor(255,255,255);
    doc.text("Daily Food Tracker", m+4, 16);
    doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(255,255,255);
    doc.text("Track every bite, every day", m+4, 23);
    doc.setFillColor(253,242,244); doc.rect(6,26,W-6,16,"F");
    doc.setFont("helvetica","bold"); doc.setFontSize(8.5); doc.setTextColor(128,0,32);
    doc.text("PERIOD:", m+4, 33);
    doc.setFont("helvetica","normal"); doc.setTextColor(55,65,81);
    doc.text(`${formatDate(fromDate)}  to  ${formatDate(toDate)}`, m+24, 33);
    doc.setFont("helvetica","bold"); doc.setTextColor(128,0,32);
    doc.text("MEAL:", m+4, 39.5);
    doc.setFont("helvetica","normal"); doc.setTextColor(55,65,81);
    const mLabel = filterMeal==="all" ? "All Meals" : MEAL_TYPES.find(x=>x.id===filterMeal)?.label||filterMeal;
    doc.text(mLabel, m+22, 39.5);
    doc.setFont("helvetica","bold"); doc.setTextColor(128,0,32);
    doc.text("ENTRIES:", m+90, 39.5);
    doc.setFont("helvetica","normal"); doc.setTextColor(55,65,81);
    doc.text(String(filteredEntries.length), m+112, 39.5);
    doc.setFont("helvetica","italic"); doc.setFontSize(7.5); doc.setTextColor(107,114,128);
    doc.text(`Generated: ${new Date().toLocaleString("en-IN")}`, W-m-2, 39.5, { align:"right" });

    let y = 50;
    const grouped = {};
    filteredEntries.forEach(e=>{ if(!grouped[e.date]) grouped[e.date]=[]; grouped[e.date].push(e); });

    Object.entries(grouped).sort().forEach(([date, dayEntries]) => {
      if(y>262) { doc.addPage(); y=16; }
      doc.setFillColor(128,0,32); doc.roundedRect(m, y, W-m*2, 9, 2,2,"F");
      doc.setFont("helvetica","bold"); doc.setFontSize(9); doc.setTextColor(255,255,255);
      doc.text(formatDate(date), m+4, y+6.2);
      y += 13;

      // Column headers
      doc.setFillColor(253,242,244); doc.rect(m,y,W-m*2,7,"F");
      doc.setDrawColor(249,214,220); doc.rect(m,y,W-m*2,7,"S");
      doc.setFont("helvetica","bold"); doc.setFontSize(7.5); doc.setTextColor(128,0,32);
      [["MEAL",m+2],["FOOD ITEM",m+32],["TIME",m+135],["NOTES",m+155]].forEach(([t,x])=>doc.text(t,x,y+5));
      y += 8;

      dayEntries.forEach((e,i) => {
        if(y>272) { doc.addPage(); y=16; }
        doc.setFillColor(i%2===0?255:249, i%2===0?255:250, i%2===0?255:251);
        doc.rect(m,y,W-m*2,7.5,"F");
        doc.setDrawColor(229,231,235); doc.rect(m,y,W-m*2,7.5,"S");
        const mt = MEAL_TYPES.find(x=>x.id===e.mealType);
        doc.setFont("helvetica","bold"); doc.setFontSize(7.5); doc.setTextColor(128,0,32);
        doc.text((mt?.label||e.mealType).toUpperCase(), m+2, y+5.2);
        doc.setFont("helvetica","normal"); doc.setTextColor(31,41,55);
        doc.text(e.foodName.slice(0,40), m+32, y+5.2);
        doc.setTextColor(107,114,128);
        doc.text(e.time||"—", m+135, y+5.2);
        doc.text((e.notes||"—").slice(0,20), m+155, y+5.2);
        y += 8;
      });

      doc.setFillColor(249,214,220); doc.rect(m,y,W-m*2,6.5,"F");
      doc.setFont("helvetica","bold"); doc.setFontSize(8); doc.setTextColor(92,0,22);
      doc.text(`${dayEntries.length} item${dayEntries.length!==1?"s":""}  logged`, m+4, y+4.6);
      y += 10;
    });

    if(y<272) {
      y+=4;
      doc.setFillColor(128,0,32); doc.roundedRect(m,y,W-m*2,10,2,2,"F");
      doc.setFont("helvetica","bold"); doc.setFontSize(9.5); doc.setTextColor(255,255,255);
      doc.text(`Grand Total: ${filteredEntries.length} entries`, m+4, y+7);
    }
    doc.save(`FoodLog_${fromDate}_to_${toDate}.pdf`);
    showToast("📄 PDF exported!");
  };

  // ── Excel Export ─────────────────────────────────────────────────────────────
  const exportExcel = async () => {
    if (!filteredEntries.length) return showToast("No data to export!");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js");
    const XLSX = window.XLSX;
    const rows = [["Date","Meal Type","Food Item","Time","Notes"]];
    filteredEntries.forEach(e=>{
      const mt=MEAL_TYPES.find(m=>m.id===e.mealType);
      rows.push([formatDate(e.date), mt?.label||e.mealType, e.foodName, e.time||"", e.notes||""]);
    });
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws["!cols"] = [18,12,36,10,28].map(w=>({wch:w}));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"Food Log");
    XLSX.writeFile(wb,`FoodLog_${fromDate}_to_${toDate}.xlsx`);
    showToast("📊 Excel exported!");
  };

  // ── Sync status bar ───────────────────────────────────────────────────────────
  const syncInfo = {
    ok:      { cls:"ok",      dot:"#22c55e", text:"Synced with Firebase" },
    syncing: { cls:"syncing", dot:"#f59e0b", text:"Syncing…", pulse:true },
    err:     { cls:"err",     dot:"#ef4444", text:"Connection error – check network" },
  }[syncState];

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div className="app">

        {/* Header */}
        <div className="header">
          <div className="header-top">
            <div className="header-logo">
              <div className="logo-icon"><DiningIcon /></div>
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

        {/* Sync bar */}
        <div className={`sync-bar ${syncInfo.cls}`}>
          <div className={`sync-dot${syncInfo.pulse?" pulse":""}`} style={{background:syncInfo.dot}} />
          {syncState==="syncing" ? <SyncIcon /> : <CloudIcon />}
          {syncInfo.text}
        </div>

        {/* Tabs */}
        <div className="tab-bar">
          {[{id:"today",Icon:HomeIcon,label:"Today"},{id:"history",Icon:HistoryIcon,label:"History"},{id:"export",Icon:DownloadIcon,label:"Export"}].map(({id,Icon,label})=>(
            <button key={id} className={`tab-btn ${tab===id?"active":""}`} onClick={()=>setTab(id)}>
              <Icon />{label}
            </button>
          ))}
        </div>

        {/* ── TODAY ─────────────────────────────────────────────────────────── */}
        {tab==="today" && (
          <div className="section">
            {/* Stats */}
            <div className="stats-strip">
              <div className="stat-card"><div className="stat-num">{todayStats.total}</div><div className="stat-label">Today's Items</div></div>
              <div className="stat-card"><div className="stat-num">{todayStats.meals}</div><div className="stat-label">Meals Logged</div></div>
              <div className="stat-card"><div className="stat-num">{entries.length}</div><div className="stat-label">All-Time</div></div>
            </div>

            {/* Add form */}
            <div className="add-card">
              <h3><AddIcon /> Add Food Entry</h3>
              <div className="section-title" style={{marginBottom:8}}>Select Meal Type</div>
              <div className="meal-type-grid">
                {MEAL_TYPES.map(mt=>(
                  <button key={mt.id} className={`meal-type-btn ${mealType===mt.id?"selected":""}`} onClick={()=>setMealType(mt.id)}>
                    <mt.Icon /> {mt.label}
                  </button>
                ))}
              </div>
              <div className="form-row">
                <div className="form-group" style={{flex:2}}>
                  <label>Food / Dish Name *</label>
                  <input className="form-control" placeholder="e.g. Idli with sambar" value={foodName}
                    onChange={e=>setFoodName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addEntry()} />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input type="time" className="form-control" value={time} onChange={e=>setTime(e.target.value)} />
                </div>
              </div>
              <div className="form-group" style={{marginBottom:6}}>
                <label>Notes (optional)</label>
                <input className="form-control" placeholder="e.g. homemade, low oil…" value={notes} onChange={e=>setNotes(e.target.value)} />
              </div>
              <button className="btn-add" onClick={addEntry} disabled={saving}>
                <AddIcon /> {saving ? "Saving…" : "Add Entry"}
              </button>
            </div>

            {/* Meal sections */}
            {loading ? (
              <>{[1,2,3].map(i=><div key={i} className="skeleton"/>)}</>
            ) : MEAL_TYPES.map(mt=>(
              <div key={mt.id} className="meal-section">
                <div className="meal-section-header">
                  <div className="meal-section-title">
                    <div className="meal-icon"><mt.Icon /></div>
                    {mt.label}
                  </div>
                  {byMeal[mt.id].length>0 && <span className="meal-count">{byMeal[mt.id].length}</span>}
                </div>
                {byMeal[mt.id].length===0
                  ? <div className="no-entries">No {mt.label.toLowerCase()} logged yet</div>
                  : byMeal[mt.id].map(e=><EntryCard key={e.id} entry={e} onDelete={deleteEntry}/>)
                }
              </div>
            ))}
          </div>
        )}

        {/* ── HISTORY ────────────────────────────────────────────────────────── */}
        {tab==="history" && (
          <div className="section">
            <div className="export-card">
              <h3><FilterIcon /> Filter History</h3>
              <div className="filter-row">
                <div className="form-group">
                  <label>From</label>
                  <input type="date" className="form-control" value={fromDate} onChange={e=>setFromDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>To</label>
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

            {loading ? <>{[1,2,3,4].map(i=><div key={i} className="skeleton"/>)}</>
            : historyGrouped.length===0
              ? <div className="no-entries" style={{padding:40}}><div style={{fontSize:36,marginBottom:10}}>📭</div>No entries in this range</div>
              : historyGrouped.map(([date,dayEntries])=>(
                <div key={date} className="history-date-group">
                  <div className="history-date-label"><CalendarIcon />{formatDate(date)}</div>
                  {dayEntries.map(e=>{
                    const mt=MEAL_TYPES.find(m=>m.id===e.mealType);
                    return (
                      <div key={e.id} className="history-entry">
                        <span className="meal-badge">{mt?.label}</span>
                        <span className="food-name">{e.foodName}</span>
                        <span className="food-time">{e.time}</span>
                        <button className="btn-icon" onClick={()=>deleteEntry(e.id)}><DeleteIcon /></button>
                      </div>
                    );
                  })}
                </div>
              ))
            }
          </div>
        )}

        {/* ── EXPORT ─────────────────────────────────────────────────────────── */}
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
                <label>Filter by Meal</label>
                <select className="form-control" value={filterMeal} onChange={e=>setFilterMeal(e.target.value)}>
                  <option value="all">All Meals</option>
                  {MEAL_TYPES.map(m=><option key={m.id} value={m.id}>{m.label}</option>)}
                </select>
              </div>
              <p style={{fontSize:12,color:"var(--maroon)",fontWeight:700,marginTop:10}}>
                {filteredEntries.length} entries will be exported
              </p>
              <div className="export-btns">
                <button className="btn-export btn-pdf" onClick={exportPDF}><PdfIcon /> Export PDF</button>
                <button className="btn-export btn-excel" onClick={exportExcel}><ExcelIcon /> Export Excel</button>
              </div>
            </div>

            <div className="section-title">Preview</div>
            {filteredEntries.length===0
              ? <div className="no-entries">No entries for selected filters</div>
              : filteredEntries.slice(0,6).map(e=>{
                  const mt=MEAL_TYPES.find(m=>m.id===e.mealType);
                  return (
                    <div key={e.id} className="history-entry" style={{marginBottom:8}}>
                      <span className="meal-badge">{mt?.label}</span>
                      <span className="food-name">{e.foodName}</span>
                      <span className="food-time" style={{fontSize:10}}>{e.date}</span>
                    </div>
                  );
                })
            }
            {filteredEntries.length>6 && (
              <p style={{textAlign:"center",fontSize:12,color:"var(--gray2)",marginTop:8}}>
                +{filteredEntries.length-6} more entries…
              </p>
            )}
          </div>
        )}

        {/* Bottom Nav */}
        <nav className="bottom-nav">
          {[{id:"today",Icon:HomeIcon,label:"Today"},{id:"history",Icon:HistoryIcon,label:"History"},{id:"export",Icon:DownloadIcon,label:"Export"}].map(({id,Icon,label})=>(
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
          <span className="entry-chip time"><TimeIcon /> {entry.time}</span>
          {entry.notes && <span className="entry-chip"><NoteIcon /> {entry.notes}</span>}
        </div>
      </div>
      <button className="btn-icon" onClick={()=>onDelete(entry.id)}><DeleteIcon /></button>
    </div>
  );
}