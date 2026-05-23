import { useState, useEffect, useMemo } from "react";

// ── Inline styles via CSS-in-JS (injected once) ──────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green:   #22c55e;
    --green2:  #16a34a;
    --green3:  #dcfce7;
    --black:   #0f1117;
    --black2:  #1a1f2e;
    --black3:  #242938;
    --gray:    #374151;
    --gray2:   #6b7280;
    --gray3:   #d1d5db;
    --white:   #ffffff;
    --offwhite:#f9fafb;
    --radius:  14px;
    --shadow:  0 4px 24px rgba(0,0,0,0.18);
  }

  body {
    font-family: 'Poppins', sans-serif;
    background: var(--black);
    color: var(--white);
    min-height: 100vh;
  }

  input, select, textarea, button {
    font-family: 'Poppins', sans-serif;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--black2); }
  ::-webkit-scrollbar-thumb { background: var(--green); border-radius: 4px; }

  .app {
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    background: var(--black2);
    position: relative;
    padding-bottom: 80px;
  }

  /* ── Header ── */
  .header {
    background: var(--black);
    padding: 20px 20px 16px;
    border-bottom: 1px solid rgba(34,197,94,0.15);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .header-top { display: flex; align-items: center; justify-content: space-between; }
  .header-logo { display: flex; align-items: center; gap: 10px; }
  .logo-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--green), var(--green2));
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .header h1 { font-size: 18px; font-weight: 700; color: var(--white); }
  .header p { font-size: 11px; color: var(--gray2); margin-top: 1px; }
  .date-badge {
    background: var(--black3);
    border: 1px solid rgba(34,197,94,0.3);
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
    color: var(--green);
  }

  /* ── Tab Bar ── */
  .tab-bar {
    display: flex;
    background: var(--black);
    padding: 4px;
    margin: 16px 16px 0;
    border-radius: 12px;
    gap: 4px;
  }
  .tab-btn {
    flex: 1; padding: 9px 0;
    background: transparent;
    border: none; border-radius: 9px;
    font-size: 12px; font-weight: 600;
    color: var(--gray2);
    cursor: pointer;
    transition: all 0.2s;
  }
  .tab-btn.active {
    background: var(--green);
    color: var(--black);
  }

  /* ── Section ── */
  .section { padding: 16px; }
  .section-title {
    font-size: 13px; font-weight: 600;
    color: var(--gray2); text-transform: uppercase;
    letter-spacing: 0.08em; margin-bottom: 12px;
  }

  /* ── Add Entry Card ── */
  .add-card {
    background: var(--black3);
    border: 1px solid rgba(34,197,94,0.15);
    border-radius: var(--radius);
    padding: 18px;
    margin-bottom: 16px;
  }
  .add-card h3 {
    font-size: 15px; font-weight: 600;
    margin-bottom: 14px; color: var(--white);
    display: flex; align-items: center; gap: 8px;
  }

  .form-row { display: flex; gap: 10px; margin-bottom: 10px; }
  .form-group { flex: 1; display: flex; flex-direction: column; gap: 5px; }
  .form-group label { font-size: 11px; font-weight: 500; color: var(--gray2); }

  .form-control {
    background: var(--black2);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 9px;
    padding: 10px 12px;
    font-size: 13px;
    color: var(--white);
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }
  .form-control:focus { border-color: var(--green); }
  .form-control option { background: var(--black2); }

  .meal-type-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 8px; margin-bottom: 10px;
  }
  .meal-type-btn {
    padding: 10px;
    background: var(--black2);
    border: 1.5px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    font-size: 12px; font-weight: 500;
    color: var(--gray2);
    cursor: pointer;
    transition: all 0.2s;
    display: flex; align-items: center; gap: 7px;
    justify-content: center;
  }
  .meal-type-btn.selected {
    border-color: var(--green);
    background: rgba(34,197,94,0.1);
    color: var(--green);
  }

  .btn-add {
    width: 100%; padding: 13px;
    background: var(--green);
    border: none; border-radius: 10px;
    font-size: 14px; font-weight: 700;
    color: var(--black);
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    margin-top: 4px;
  }
  .btn-add:hover { background: var(--green2); }
  .btn-add:active { transform: scale(0.98); }

  /* ── Meal Cards ── */
  .meal-section { margin-bottom: 20px; }
  .meal-section-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 10px; padding: 0 2px;
  }
  .meal-section-title {
    display: flex; align-items: center; gap: 8px;
    font-size: 14px; font-weight: 600; color: var(--white);
  }
  .meal-count {
    background: var(--green3);
    color: var(--green2);
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 11px; font-weight: 700;
  }

  .entry-card {
    background: var(--black);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    padding: 14px;
    margin-bottom: 8px;
    display: flex; align-items: flex-start;
    gap: 12px;
    animation: slideIn 0.2s ease;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .entry-icon {
    width: 36px; height: 36px; min-width: 36px;
    background: rgba(34,197,94,0.1);
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }
  .entry-details { flex: 1; min-width: 0; }
  .entry-name { font-size: 14px; font-weight: 600; color: var(--white); }
  .entry-meta {
    font-size: 11px; color: var(--gray2); margin-top: 3px;
    display: flex; gap: 8px; flex-wrap: wrap;
  }
  .entry-time { color: var(--green); font-weight: 500; }
  .entry-actions { display: flex; gap: 6px; }
  .btn-icon {
    background: none; border: none;
    width: 28px; height: 28px;
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 14px;
    transition: background 0.2s;
  }
  .btn-icon:hover { background: rgba(255,255,255,0.08); }
  .btn-icon.del:hover { background: rgba(239,68,68,0.15); }

  .no-entries {
    text-align: center; padding: 24px;
    color: var(--gray2); font-size: 13px;
  }

  /* ── Stats Strip ── */
  .stats-strip {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 8px; margin-bottom: 16px;
  }
  .stat-card {
    background: var(--black3);
    border: 1px solid rgba(34,197,94,0.12);
    border-radius: 12px;
    padding: 12px 8px;
    text-align: center;
  }
  .stat-num { font-size: 20px; font-weight: 700; color: var(--green); }
  .stat-label { font-size: 10px; color: var(--gray2); margin-top: 2px; }

  /* ── History / Export Tab ── */
  .export-card {
    background: var(--black3);
    border: 1px solid rgba(34,197,94,0.15);
    border-radius: var(--radius);
    padding: 18px;
    margin-bottom: 16px;
  }
  .export-card h3 {
    font-size: 14px; font-weight: 600;
    margin-bottom: 14px; color: var(--white);
    display: flex; align-items: center; gap: 8px;
  }
  .filter-row { display: flex; gap: 8px; margin-bottom: 10px; }
  .export-btns { display: flex; gap: 8px; margin-top: 14px; }
  .btn-export {
    flex: 1; padding: 11px;
    border: none; border-radius: 10px;
    font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .btn-pdf { background: #ef4444; color: white; }
  .btn-pdf:hover { background: #dc2626; }
  .btn-excel { background: #16a34a; color: white; }
  .btn-excel:hover { background: #15803d; }

  .history-list { display: flex; flex-direction: column; gap: 8px; }
  .history-date-group { margin-bottom: 12px; }
  .history-date-label {
    font-size: 12px; font-weight: 600; color: var(--green);
    margin-bottom: 8px; padding: 5px 10px;
    background: rgba(34,197,94,0.08);
    border-radius: 8px; display: inline-block;
  }
  .history-entry {
    background: var(--black);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px;
    padding: 12px 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .history-entry .meal-badge {
    font-size: 10px; font-weight: 600;
    padding: 3px 8px; border-radius: 20px;
    background: rgba(34,197,94,0.12);
    color: var(--green); white-space: nowrap;
  }
  .history-entry .food-name { font-size: 13px; font-weight: 500; flex: 1; }
  .history-entry .food-time { font-size: 11px; color: var(--gray2); }

  /* ── Toast ── */
  .toast {
    position: fixed; bottom: 88px; left: 50%;
    transform: translateX(-50%);
    background: var(--green);
    color: var(--black);
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 13px; font-weight: 600;
    z-index: 999;
    animation: toastIn 0.3s ease, toastOut 0.3s ease 1.7s forwards;
    white-space: nowrap;
  }
  @keyframes toastIn  { from { opacity:0; bottom:72px; } to { opacity:1; bottom:88px; } }
  @keyframes toastOut { from { opacity:1; } to { opacity:0; } }

  /* ── Bottom nav ── */
  .bottom-nav {
    position: fixed; bottom: 0; left: 50%;
    transform: translateX(-50%);
    width: 100%; max-width: 480px;
    background: var(--black);
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex;
    z-index: 200;
  }
  .nav-btn {
    flex: 1; padding: 12px 0;
    background: none; border: none;
    display: flex; flex-direction: column;
    align-items: center; gap: 3px;
    cursor: pointer; color: var(--gray2);
    font-size: 10px; font-weight: 500;
    transition: color 0.2s;
  }
  .nav-btn.active { color: var(--green); }
  .nav-btn svg { width: 20px; height: 20px; }

  @media (min-width: 481px) {
    .app { box-shadow: var(--shadow); border-radius: 24px; margin-top: 20px; margin-bottom: 20px; }
    .bottom-nav { border-radius: 0 0 24px 24px; }
  }
`;

// ── Constants ──────────────────────────────────────────────────────────────────
const MEAL_TYPES = [
  { id: "breakfast", label: "Breakfast", emoji: "🌅" },
  { id: "lunch",     label: "Lunch",     emoji: "☀️" },
  { id: "dinner",    label: "Dinner",    emoji: "🌙" },
  { id: "snacks",    label: "Snacks",    emoji: "🍎" },
];

const STORAGE_KEY = "foodtracker_v1";

function today() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(d) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "short", year: "numeric"
  });
}

function loadData() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function FoodTracker() {
  const [tab, setTab] = useState("today");
  const [entries, setEntries] = useState(loadData);
  const [toast, setToast] = useState("");

  // Form state
  const [mealType, setMealType] = useState("breakfast");
  const [foodName, setFoodName] = useState("");
  const [qty, setQty] = useState("");
  const [calories, setCalories] = useState("");
  const [time, setTime] = useState(() => new Date().toTimeString().slice(0, 5));
  const [notes, setNotes] = useState("");

  // Export filter state
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() - 6);
    return d.toISOString().slice(0, 10);
  });
  const [toDate, setToDate] = useState(today);
  const [filterMeal, setFilterMeal] = useState("all");

  useEffect(() => { saveData(entries); }, [entries]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const addEntry = () => {
    if (!foodName.trim()) return showToast("Enter a food name!");
    const entry = {
      id: Date.now(),
      date: today(),
      mealType,
      foodName: foodName.trim(),
      qty: qty.trim(),
      calories: calories ? Number(calories) : null,
      time,
      notes: notes.trim(),
    };
    setEntries(prev => [entry, ...prev]);
    setFoodName(""); setQty(""); setCalories(""); setNotes("");
    showToast("✓ Entry added!");
  };

  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(e => e.id !== id));
    showToast("Deleted");
  };

  const todayEntries = useMemo(
    () => entries.filter(e => e.date === today()),
    [entries]
  );

  const todayStats = useMemo(() => {
    const cals = todayEntries.reduce((s, e) => s + (e.calories || 0), 0);
    return {
      total: todayEntries.length,
      cals,
      meals: new Set(todayEntries.map(e => e.mealType)).size,
    };
  }, [todayEntries]);

  // Export filtered data
  const filteredEntries = useMemo(() => {
    return entries.filter(e => {
      const inRange = e.date >= fromDate && e.date <= toDate;
      const mealOk = filterMeal === "all" || e.mealType === filterMeal;
      return inRange && mealOk;
    }).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  }, [entries, fromDate, toDate, filterMeal]);

  // ── PDF Export ─────────────────────────────────────────────────────────────
  const exportPDF = async () => {
    if (filteredEntries.length === 0) return showToast("No data to export!");

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    document.head.appendChild(script);
    await new Promise(r => { script.onload = r; });

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210, margin = 16;

    // Header background
    doc.setFillColor(15, 17, 23);
    doc.rect(0, 0, W, 36, "F");

    // Green accent bar
    doc.setFillColor(34, 197, 94);
    doc.rect(0, 0, 5, 36, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18); doc.setFont("helvetica", "bold");
    doc.text("🥗 Daily Food Tracker", margin + 4, 14);

    doc.setFontSize(9); doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 114, 128);
    doc.text(`Period: ${formatDate(fromDate)} → ${formatDate(toDate)}`, margin + 4, 22);
    doc.text(`Meal Filter: ${filterMeal === "all" ? "All Meals" : filterMeal}   |   Total Entries: ${filteredEntries.length}`, margin + 4, 29);

    let y = 44;

    // Group by date
    const grouped = {};
    filteredEntries.forEach(e => {
      if (!grouped[e.date]) grouped[e.date] = [];
      grouped[e.date].push(e);
    });

    Object.entries(grouped).sort().forEach(([date, dayEntries]) => {
      if (y > 265) { doc.addPage(); y = 16; }

      // Date header
      doc.setFillColor(34, 197, 94);
      doc.roundedRect(margin, y, W - margin * 2, 8, 2, 2, "F");
      doc.setTextColor(15, 17, 23);
      doc.setFontSize(10); doc.setFont("helvetica", "bold");
      doc.text(formatDate(date), margin + 4, y + 5.5);
      y += 12;

      // Table header
      doc.setFillColor(26, 31, 46);
      doc.rect(margin, y, W - margin * 2, 7, "F");
      doc.setTextColor(107, 114, 128);
      doc.setFontSize(8); doc.setFont("helvetica", "bold");
      doc.text("MEAL", margin + 2, y + 5);
      doc.text("FOOD ITEM", margin + 30, y + 5);
      doc.text("QTY", margin + 100, y + 5);
      doc.text("CALS", margin + 125, y + 5);
      doc.text("TIME", margin + 150, y + 5);
      doc.text("NOTES", margin + 165, y + 5);
      y += 8;

      dayEntries.forEach((e, i) => {
        if (y > 272) { doc.addPage(); y = 16; }
        doc.setFillColor(i % 2 === 0 ? 36: 41, 56 , 30, 35, 50);
        doc.rect(margin, y, W - margin * 2, 7, "F");

        doc.setTextColor(34, 197, 94);
        doc.setFontSize(8); doc.setFont("helvetica", "bold");
        const mt = MEAL_TYPES.find(m => m.id === e.mealType);
        doc.text((mt?.label || e.mealType).toUpperCase(), margin + 2, y + 5);

        doc.setTextColor(230, 230, 230); doc.setFont("helvetica", "normal");
        doc.text(e.foodName.slice(0, 30), margin + 30, y + 5);
        doc.text(e.qty || "—", margin + 100, y + 5);
        doc.text(e.calories ? `${e.calories}` : "—", margin + 125, y + 5);
        doc.text(e.time || "—", margin + 150, y + 5);
        doc.text((e.notes || "—").slice(0, 16), margin + 165, y + 5);
        y += 8;
      });

      // Day total
      const dayCals = dayEntries.reduce((s, e) => s + (e.calories || 0), 0);
      if (dayCals > 0) {
        doc.setFillColor(34, 197, 94, 20);
        doc.rect(margin, y, W - margin * 2, 6, "F");
        doc.setTextColor(34, 197, 94);
        doc.setFontSize(8); doc.setFont("helvetica", "bold");
        doc.text(`Total: ${dayCals} kcal  |  ${dayEntries.length} items`, margin + 2, y + 4.5);
        y += 7;
      }
      y += 6;
    });

    // Footer
    const totalCals = filteredEntries.reduce((s, e) => s + (e.calories || 0), 0);
    if (y < 270) {
      doc.setFillColor(15, 17, 23);
      doc.rect(0, y + 2, W, 12, "F");
      doc.setTextColor(34, 197, 94);
      doc.setFontSize(9); doc.setFont("helvetica", "bold");
      doc.text(`Grand Total: ${totalCals} kcal  |  ${filteredEntries.length} entries`, margin, y + 10);
    }

    doc.save(`food-tracker-${fromDate}-to-${toDate}.pdf`);
    showToast("📄 PDF exported!");
  };

  // ── Excel Export ───────────────────────────────────────────────────────────
  const exportExcel = async () => {
    if (filteredEntries.length === 0) return showToast("No data to export!");

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    document.head.appendChild(script);
    await new Promise(r => { script.onload = r; });

    const XLSX = window.XLSX;
    const rows = [
      ["Date", "Meal Type", "Food Item", "Quantity", "Calories (kcal)", "Time", "Notes"]
    ];
    filteredEntries.forEach(e => {
      const mt = MEAL_TYPES.find(m => m.id === e.mealType);
      rows.push([
        formatDate(e.date),
        mt?.label || e.mealType,
        e.foodName,
        e.qty || "",
        e.calories || "",
        e.time || "",
        e.notes || ""
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws["!cols"] = [16, 12, 28, 14, 16, 8, 24].map(w => ({ wch: w }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Food Log");
    XLSX.writeFile(wb, `food-tracker-${fromDate}-to-${toDate}.xlsx`);
    showToast("📊 Excel exported!");
  };

  // ── Today grouped by meal ──────────────────────────────────────────────────
  const byMeal = useMemo(() => {
    const m = {};
    MEAL_TYPES.forEach(mt => {
      m[mt.id] = todayEntries.filter(e => e.mealType === mt.id);
    });
    return m;
  }, [todayEntries]);

  // History grouped by date
  const historyGrouped = useMemo(() => {
    const g = {};
    filteredEntries.forEach(e => {
      if (!g[e.date]) g[e.date] = [];
      g[e.date].push(e);
    });
    return Object.entries(g).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filteredEntries]);

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <div className="app">
        {/* Header */}
        <div className="header">
          <div className="header-top">
            <div className="header-logo">
              <div className="logo-icon">🥗</div>
              <div>
                <h1>FoodLog</h1>
                <p>Track every bite, every day</p>
              </div>
            </div>
            <div className="date-badge">{new Date().toLocaleDateString("en-IN", { day:"numeric", month:"short" })}</div>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="tab-bar">
          <button className={`tab-btn ${tab === "today" ? "active" : ""}`} onClick={() => setTab("today")}>
            Today
          </button>
          <button className={`tab-btn ${tab === "history" ? "active" : ""}`} onClick={() => setTab("history")}>
            History
          </button>
          <button className={`tab-btn ${tab === "export" ? "active" : ""}`} onClick={() => setTab("export")}>
            Export
          </button>
        </div>

        {/* TODAY TAB */}
        {tab === "today" && (
          <div className="section">
            {/* Stats */}
            <div className="stats-strip">
              <div className="stat-card">
                <div className="stat-num">{todayStats.total}</div>
                <div className="stat-label">Items</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">{todayStats.cals}</div>
                <div className="stat-label">kcal</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">{todayStats.meals}</div>
                <div className="stat-label">Meals</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">{entries.length}</div>
                <div className="stat-label">Total</div>
              </div>
            </div>

            {/* Add Entry */}
            <div className="add-card">
              <h3>➕ Add Food Entry</h3>

              <div className="section-title">Select Meal</div>
              <div className="meal-type-grid">
                {MEAL_TYPES.map(mt => (
                  <button
                    key={mt.id}
                    className={`meal-type-btn ${mealType === mt.id ? "selected" : ""}`}
                    onClick={() => setMealType(mt.id)}
                  >
                    {mt.emoji} {mt.label}
                  </button>
                ))}
              </div>

              <div className="form-row">
                <div className="form-group" style={{ flex: 2 }}>
                  <label>Food / Dish Name *</label>
                  <input
                    className="form-control"
                    placeholder="e.g. Idli with sambar"
                    value={foodName}
                    onChange={e => setFoodName(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addEntry()}
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    className="form-control"
                    placeholder="e.g. 2 pieces"
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Calories</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="kcal"
                    value={calories}
                    onChange={e => setCalories(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 10 }}>
                <label>Notes (optional)</label>
                <input
                  className="form-control"
                  placeholder="e.g. homemade, low oil..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>

              <button className="btn-add" onClick={addEntry}>Add Entry</button>
            </div>

            {/* Today's meals */}
            {MEAL_TYPES.map(mt => (
              <div key={mt.id} className="meal-section">
                <div className="meal-section-header">
                  <div className="meal-section-title">
                    <span>{mt.emoji}</span> {mt.label}
                  </div>
                  {byMeal[mt.id].length > 0 && (
                    <span className="meal-count">{byMeal[mt.id].length}</span>
                  )}
                </div>
                {byMeal[mt.id].length === 0 ? (
                  <div className="no-entries">No {mt.label.toLowerCase()} added yet</div>
                ) : (
                  byMeal[mt.id].map(entry => (
                    <EntryCard key={entry.id} entry={entry} onDelete={deleteEntry} mt={mt} />
                  ))
                )}
              </div>
            ))}
          </div>
        )}

        {/* HISTORY TAB */}
        {tab === "history" && (
          <div className="section">
            <div className="export-card">
              <h3>🔍 Filter History</h3>
              <div className="filter-row">
                <div className="form-group">
                  <label>From</label>
                  <input type="date" className="form-control" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>To</label>
                  <input type="date" className="form-control" value={toDate} onChange={e => setToDate(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Meal Type</label>
                <select className="form-control" value={filterMeal} onChange={e => setFilterMeal(e.target.value)}>
                  <option value="all">All Meals</option>
                  {MEAL_TYPES.map(m => <option key={m.id} value={m.id}>{m.emoji} {m.label}</option>)}
                </select>
              </div>
              <p style={{ fontSize: 12, color: "var(--gray2)", marginTop: 10 }}>
                {filteredEntries.length} entries found
              </p>
            </div>

            {historyGrouped.length === 0 ? (
              <div className="no-entries" style={{ padding: 40 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>📭</div>
                No entries in this range
              </div>
            ) : (
              historyGrouped.map(([date, dayEntries]) => (
                <div key={date} className="history-date-group">
                  <div className="history-date-label">{formatDate(date)}</div>
                  {dayEntries.map(e => {
                    const mt = MEAL_TYPES.find(m => m.id === e.mealType);
                    return (
                      <div key={e.id} className="history-entry">
                        <span style={{ fontSize: 18 }}>{mt?.emoji}</span>
                        <span className="meal-badge">{mt?.label}</span>
                        <span className="food-name">{e.foodName}{e.qty ? ` — ${e.qty}` : ""}</span>
                        <span className="food-time">{e.time}</span>
                        <button className="btn-icon del" onClick={() => deleteEntry(e.id)}>🗑</button>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        )}

        {/* EXPORT TAB */}
        {tab === "export" && (
          <div className="section">
            <div className="export-card">
              <h3>📤 Export Data</h3>

              <div className="filter-row">
                <div className="form-group">
                  <label>From Date</label>
                  <input type="date" className="form-control" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>To Date</label>
                  <input type="date" className="form-control" value={toDate} onChange={e => setToDate(e.target.value)} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 4 }}>
                <label>Filter by Meal Type</label>
                <select className="form-control" value={filterMeal} onChange={e => setFilterMeal(e.target.value)}>
                  <option value="all">All Meals</option>
                  {MEAL_TYPES.map(m => <option key={m.id} value={m.id}>{m.emoji} {m.label}</option>)}
                </select>
              </div>

              <p style={{ fontSize: 12, color: "var(--green)", marginTop: 10, fontWeight: 600 }}>
                {filteredEntries.length} entries will be exported
              </p>

              <div className="export-btns">
                <button className="btn-export btn-pdf" onClick={exportPDF}>
                  📄 Export PDF
                </button>
                <button className="btn-export btn-excel" onClick={exportExcel}>
                  📊 Export Excel
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="section-title">Preview</div>
            {filteredEntries.slice(0, 5).map(e => {
              const mt = MEAL_TYPES.find(m => m.id === e.mealType);
              return (
                <div key={e.id} className="history-entry" style={{ marginBottom: 8, background: "var(--black3)", borderRadius: 10 }}>
                  <span style={{ fontSize: 16 }}>{mt?.emoji}</span>
                  <span className="meal-badge">{mt?.label}</span>
                  <span className="food-name">{e.foodName}</span>
                  <span className="food-time">{e.date}</span>
                </div>
              );
            })}
            {filteredEntries.length > 5 && (
              <p style={{ fontSize: 12, color: "var(--gray2)", textAlign: "center", marginTop: 8 }}>
                + {filteredEntries.length - 5} more entries
              </p>
            )}
            {filteredEntries.length === 0 && (
              <div className="no-entries">No entries for selected filters</div>
            )}
          </div>
        )}

        {/* Bottom Nav */}
        <nav className="bottom-nav">
          <button className={`nav-btn ${tab === "today" ? "active" : ""}`} onClick={() => setTab("today")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
            Today
          </button>
          <button className={`nav-btn ${tab === "history" ? "active" : ""}`} onClick={() => setTab("history")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            History
          </button>
          <button className={`nav-btn ${tab === "export" ? "active" : ""}`} onClick={() => setTab("export")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export
          </button>
        </nav>

        {/* Toast */}
        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}

function EntryCard({ entry, onDelete, mt }) {
  return (
    <div className="entry-card">
      <div className="entry-icon">{mt.emoji}</div>
      <div className="entry-details">
        <div className="entry-name">{entry.foodName}</div>
        <div className="entry-meta">
          <span className="entry-time">⏰ {entry.time}</span>
          {entry.qty && <span>📦 {entry.qty}</span>}
          {entry.calories && <span>🔥 {entry.calories} kcal</span>}
          {entry.notes && <span>📝 {entry.notes}</span>}
        </div>
      </div>
      <div className="entry-actions">
        <button className="btn-icon del" onClick={() => onDelete(entry.id)}>🗑</button>
      </div>
    </div>
  );
}