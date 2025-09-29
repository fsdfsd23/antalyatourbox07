import type { Seat, Gender } from "@/lib/bus";

export function SeatLegend() {
  return (
    <div className="flex items-center gap-3 text-xs">
      <div className="flex items-center gap-1">
        <span className="inline-block w-3 h-3 rounded bg-slate-200" /> Boş
      </div>
      <div className="flex items-center gap-1">
        <span className="inline-block w-3 h-3 rounded bg-blue-400" /> Erkek
      </div>
      <div className="flex items-center gap-1">
        <span className="inline-block w-3 h-3 rounded bg-pink-400" /> Kadın
      </div>
      <div className="flex items-center gap-1">
        <span className="inline-block w-3 h-3 rounded bg-emerald-400" /> Seçilen
      </div>
    </div>
  );
}

export default function SeatGrid({
  seats,
  selected,
  onToggle,
  horizontal = false,
}: {
  seats: Seat[];
  selected: Record<number, Gender>;
  onToggle: (no: number) => void;
  horizontal?: boolean;
}) {
  const renderSeat = (s: Seat, idx: number) => {
    const sel = selected[s.no];
    const bg = sel
      ? "bg-emerald-400"
      : s.taken === "M"
        ? "bg-blue-400"
        : s.taken === "F"
          ? "bg-pink-400"
          : "bg-slate-200 hover:bg-slate-300";
    return (
      <button
        key={s.no}
        className={`h-8 rounded text-[11px] ${bg}`}
        disabled={!!s.taken}
        onClick={() => onToggle(s.no)}
        title={`Koltuk ${s.no}`}
      >
        {s.no}
      </button>
    );
  };

  // 2+1 layout per row (left 2 seats, aisle, right 1 seat)
  const rows: Seat[][] = [];
  for (let i = 0; i < seats.length; i += 3) rows.push(seats.slice(i, i + 3));

  if (horizontal) {
    return (
      <div className="overflow-x-auto">
        <div className="flex gap-3">
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[repeat(3,2rem)] gap-2 items-center"
            >
              {row[0] ? renderSeat(row[0], 0) : <div />}
              {row[1] ? renderSeat(row[1], 1) : <div />}
              <div className="w-4" />
              {row[2] ? renderSeat(row[2], 2) : <div />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="inline-grid grid-cols-[repeat(3,2rem)] gap-2 items-center">
      {rows.map((row, i) => (
        <div key={i} className="contents">
          {row[0] ? renderSeat(row[0], 0) : <div />}
          {row[1] ? renderSeat(row[1], 1) : <div />}
          <div className="w-4" />
          {row[2] ? renderSeat(row[2], 2) : <div />}
        </div>
      ))}
    </div>
  );
}
