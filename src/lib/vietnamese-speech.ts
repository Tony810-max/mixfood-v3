const VIETNAMESE_DIGITS: Record<string, string> = {
  '0': 'không',
  '1': 'một',
  '2': 'hai',
  '3': 'ba',
  '4': 'bốn',
  '5': 'năm',
  '6': 'sáu',
  '7': 'bảy',
  '8': 'tám',
  '9': 'chín',
};

export function vietnameseTableNumber(value: string) {
  return value
    .trim()
    .replace(/\d/g, (digit) => ` ${VIETNAMESE_DIGITS[digit]} `)
    .replace(/[-_/]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function speakVietnamese(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  const synthesis = window.speechSynthesis;
  const speak = () => {
    const voice = synthesis.getVoices().find((candidate) =>
      candidate.lang.toLowerCase().replace('_', '-').startsWith('vi'),
    );
    synthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;
    if (voice) utterance.voice = voice;
    synthesis.speak(utterance);
  };

  if (synthesis.getVoices().length > 0) {
    speak();
    return;
  }
  const onVoicesChanged = () => speak();
  synthesis.addEventListener('voiceschanged', onVoicesChanged, { once: true });
  window.setTimeout(() => {
    synthesis.removeEventListener('voiceschanged', onVoicesChanged);
    if (!synthesis.speaking) speak();
  }, 700);
}
