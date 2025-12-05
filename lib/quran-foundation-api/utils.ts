export const playWordAudio = (url: string | null) => {
  if (!url) return;
  const audio = new Audio(`https://audio.qurancdn.com/${url}`);
  audio.play();
};

export function toArabicNumber(num: number | string): string {
  const digits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().replace(/\d/g, (d) => digits[parseInt(d)]);
}
