const WORDS_PER_MINUTE = 200;

export function estimateReadingTimeMinutes(body: string): number {
  const plain = body
    .replace(/[#>*_`\-\[\]\(\)]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = plain ? plain.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
