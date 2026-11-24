/** Illustrative snapshot - not a live market feed. */
const MARKET_AS_OF = "2026-11-23T18:00:00+02:00";

const TICKS = [
  { symbol: "ת״א-35", value: "2,148.40", change: "+0.62%", up: true },
  { symbol: "ת״א-125", value: "2,531.10", change: "+0.41%", up: true },
  { symbol: "USD/ILS", value: "3.642", change: "-0.18%", up: false },
  { symbol: "EUR/ILS", value: "3.951", change: "+0.09%", up: true },
  { symbol: "S&P 500", value: "5,892.30", change: "+0.27%", up: true },
  { symbol: "Nasdaq", value: "19,104.8", change: "+0.55%", up: true },
  { symbol: "זהב", value: "$2,341", change: "+0.33%", up: true },
  { symbol: "נפט WTI", value: "$77.40", change: "-0.72%", up: false },
  { symbol: "ביטקוין", value: "$97,820", change: "+1.12%", up: true },
  { symbol: "ריבית ב״י", value: "3.25%", change: "יציב", up: true },
] as const;

export function MarketsStrip() {
  const loop = [...TICKS, ...TICKS];
  const asOfLabel = new Date(MARKET_AS_OF).toLocaleString("he-IL", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <section
      aria-label="מדדי שוק - נתוני הדגמה"
      className="overflow-hidden border-y border-border bg-surface"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-6">
        <div className="shrink-0">
          <p className="text-xs font-bold tracking-wide text-brand">שווקים</p>
          <p className="text-[10px] text-muted" title="נתוני הדגמה - לא פיד חי">
            הדגמה · {asOfLabel}
          </p>
        </div>
        <div className="markets-ticker min-w-0 flex-1 overflow-hidden">
          <ul className="animate-ticker flex w-max gap-8 whitespace-nowrap text-sm">
            {loop.map((tick, index) => (
              <li
                key={`${tick.symbol}-${index}`}
                className="flex items-center gap-2"
              >
                <span className="font-semibold">{tick.symbol}</span>
                <span className="text-muted">{tick.value}</span>
                <span className={tick.up ? "text-success" : "text-danger"}>
                  {tick.change}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
