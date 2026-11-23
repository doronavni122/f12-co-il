import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/images/articles");
mkdirSync(outDir, { recursive: true });

const articles = [
  ["ta125-opens-higher-on-tech-leadership", "#0B1F3A", "#1D6FE8", "TA-125"],
  ["bank-of-israel-holds-rate-path", "#0A2744", "#2B7FFF", "RATE"],
  ["mortgage-spreads-widen-for-new-buyers", "#102A4C", "#3B82F6", "MTG"],
  ["fintech-licensing-wave-israel-2026", "#0C2340", "#2563EB", "FIN"],
  ["crypto-liquidity-after-etf-flows", "#0E2A4A", "#38BDF8", "BTC"],
  ["why-cash-still-matters-in-portfolios", "#0B223D", "#60A5FA", "CASH"],
  ["shekel-dollar-range-traders-watch", "#0D2745", "#1E90FF", "FX"],
  ["us-jobs-data-israeli-markets", "#112F52", "#3B82F6", "JOBS"],
  ["rental-yields-tel-aviv-periphery", "#0A2038", "#4F8CFF", "YIELD"],
  ["open-banking-competition-israel", "#0C2744", "#2DD4BF", "OPEN"],
  ["stablecoins-payments-rail-watch", "#0F2C4E", "#22D3EE", "STABLE"],
  ["inflation-expectations-household-budget", "#122E4F", "#93C5FD", "CPI"],
  ["corporate-bonds-israel-spread-story", "#0B1E36", "#1D4ED8", "BOND"],
  ["proptech-lending-platforms-rise", "#10314F", "#60A5FA", "PROP"],
  ["ai-trading-tools-retail-investors", "#0A243F", "#38BDF8", "AI"],
  ["long-term-investing-noise-filter", "#0E2744", "#2563EB", "FILTER"],
];

function svg(bg, accent, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0.85"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <path d="M80 480 L280 320 L420 390 L640 210 L820 300 L1120 140" fill="none" stroke="#E8F1FF" stroke-width="8" stroke-linecap="round" opacity="0.9"/>
  <circle cx="1120" cy="140" r="14" fill="#F8FBFF"/>
  <text x="80" y="120" fill="#F8FBFF" font-family="Arial, sans-serif" font-size="42" font-weight="700">F12</text>
  <text x="80" y="180" fill="#D6E6FF" font-family="Arial, sans-serif" font-size="28">${label}</text>
</svg>
`;
}

for (const [slug, bg, accent, label] of articles) {
  writeFileSync(join(outDir, `${slug}.svg`), svg(bg, accent, label));
}

writeFileSync(
  join(__dirname, "../public/images/og-default.svg"),
  svg("#0B1F3A", "#1D6FE8", "FINANCE NEWS"),
);

console.log(`Generated ${articles.length} article SVGs + og-default`);
