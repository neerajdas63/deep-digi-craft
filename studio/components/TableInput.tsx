import React, { useCallback } from "react";
import { set } from "sanity";
import type { ObjectInputProps } from "sanity";

interface TableRow {
  _key: string;
  cells: string[];
}

function makeKey() {
  return Math.random().toString(36).slice(2, 9);
}

export function TableInput({ value, onChange }: ObjectInputProps) {
  const rows: TableRow[] = (value as any)?.rows ?? [];
  const colCount = rows[0]?.cells?.length ?? 0;

  const patchRows = useCallback(
    (newRows: TableRow[]) => onChange(set(newRows, ["rows"])),
    [onChange]
  );

  const addRow = () => {
    patchRows([
      ...rows,
      { _key: makeKey(), cells: Array(Math.max(colCount, 1)).fill("") },
    ]);
  };

  const addColumn = () => {
    if (rows.length === 0) {
      // No rows yet — create a header row with 1 column
      patchRows([{ _key: makeKey(), cells: [""] }]);
      return;
    }
    patchRows(rows.map((r) => ({ ...r, cells: [...r.cells, ""] })));
  };

  const removeLastColumn = () => {
    if (colCount <= 1) return;
    patchRows(rows.map((r) => ({ ...r, cells: r.cells.slice(0, -1) })));
  };

  const removeRow = (ri: number) => {
    patchRows(rows.filter((_, i) => i !== ri));
  };

  const updateCell = (ri: number, ci: number, val: string) => {
    patchRows(
      rows.map((row, i) =>
        i === ri ? { ...row, cells: row.cells.map((c, j) => (j === ci ? val : c)) } : row
      )
    );
  };

  /* ── styles ── */
  const btn = (color = "#0070f3"): React.CSSProperties => ({
    padding: "4px 12px",
    fontSize: 12,
    border: `1px solid ${color}`,
    borderRadius: 4,
    cursor: "pointer",
    background: "transparent",
    color: color,
    fontWeight: 600,
  });
  const dangerBtn: React.CSSProperties = btn("#e53e3e");

  return (
    <div style={{ fontFamily: "sans-serif", fontSize: 13 }}>

      {/* ── toolbar ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
        <button type="button" style={btn()} onClick={addColumn}>
          + Add Column
        </button>
        <button type="button" style={btn()} onClick={addRow}>
          + Add Row
        </button>
        <button
          type="button"
          style={colCount <= 1 ? { ...dangerBtn, opacity: 0.4 } : dangerBtn}
          onClick={removeLastColumn}
          disabled={colCount <= 1}
        >
          − Remove Last Column
        </button>
      </div>

      {/* ── grid ── */}
      {rows.length === 0 ? (
        <div style={{ color: "#888", padding: "8px 0", fontSize: 12 }}>
          Click <strong>+ Add Column</strong> to set up columns, then <strong>+ Add Row</strong> to add data rows.
          <br />
          <em>First row is the header row.</em>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", minWidth: "100%" }}>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={row._key}>
                  {/* row number */}
                  <td
                    style={{
                      padding: "4px 8px",
                      fontSize: 11,
                      color: "#aaa",
                      userSelect: "none",
                      minWidth: 28,
                      textAlign: "center",
                      background: ri === 0 ? "#f7f7f7" : "transparent",
                    }}
                  >
                    {ri === 0 ? "H" : ri}
                  </td>

                  {/* cells */}
                  {row.cells.map((cell, ci) => (
                    <td
                      key={ci}
                      style={{
                        border: "1px solid #d0d0d0",
                        padding: 0,
                        background: ri === 0 ? "#f0f4ff" : "#fff",
                      }}
                    >
                      <input
                        value={cell}
                        onChange={(e) => updateCell(ri, ci, e.target.value)}
                        placeholder={ri === 0 ? `Header ${ci + 1}` : ""}
                        style={{
                          display: "block",
                          width: "100%",
                          minWidth: 100,
                          padding: "6px 8px",
                          border: "none",
                          outline: "none",
                          background: "transparent",
                          fontWeight: ri === 0 ? 700 : 400,
                          fontSize: 13,
                          boxSizing: "border-box",
                        }}
                      />
                    </td>
                  ))}

                  {/* delete row */}
                  <td style={{ paddingLeft: 6 }}>
                    <button
                      type="button"
                      onClick={() => removeRow(ri)}
                      title="Remove row"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#e53e3e",
                        fontSize: 16,
                        lineHeight: 1,
                        padding: "2px 4px",
                      }}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: 11, color: "#888", marginTop: 6 }}>
            Row <strong>H</strong> = header row (bold on the website). All other rows = data rows.
          </p>
        </div>
      )}
    </div>
  );
}
