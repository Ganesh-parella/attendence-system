// src/utils/csv.js
export const toCSV = (rows = [], header = []) => {
  const esc = (v) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const head = header.length ? header.join(",") : Object.keys(rows[0] || {}).join(",");
  const lines = [head];
  for (const r of rows) {
    const values = header.length ? header.map(h => esc(r[h])) : Object.values(r).map(esc);
    lines.push(values.join(","));
  }
  return lines.join("\n");
};
