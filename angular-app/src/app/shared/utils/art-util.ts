export function isLikelyImageSource(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const v = value.trim().toLowerCase();
  if (!v) return false;
  if (v.startsWith('data:image/')) return true;
  if (
    v.startsWith('http://') ||
    v.startsWith('https://') ||
    v.startsWith('./') ||
    v.startsWith('../') ||
    v.startsWith('/')
  ) {
    return true;
  }
  return /\.(png|jpe?g|gif|webp|svg|avif)(\?.*)?$/.test(v);
}
