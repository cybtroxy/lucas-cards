/** Ruta pública base (bajo `public/`) para el arte de las cartas. */
export const CARDS_ART_BASE_PATH = '/cards-art';

const LEVEL_TO_FOLDER: Readonly<Record<number, string>> = {
  1: '1-common',
  2: '2-uncommon',
  3: '3-rare',
  4: '4-epic',
  5: '5-legendary',
};

export function cardsArtFolderForLevel(level: number): string {
  const lv = Math.min(5, Math.max(1, level || 1));
  return LEVEL_TO_FOLDER[lv] ?? '1-common';
}

/** Ruta absoluta bajo el sitio para la imagen (`art_url` es solo el nombre de archivo). */
export function cardsArtImageSrc(
  level: number,
  artUrl: string | undefined | null,
): string | null {
  const file = (artUrl ?? '').trim();
  if (!file) return null;
  return `${CARDS_ART_BASE_PATH}/${cardsArtFolderForLevel(level)}/${file}`;
}
