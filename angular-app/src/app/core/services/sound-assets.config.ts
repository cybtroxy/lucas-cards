/**
 * Rutas bajo `public/sounds/` sin extensión.
 * Por defecto se sirven `.mp3` (generar con `scripts/convert_wavs_to_mp3.sh`).
 * Safari/iOS suelen ir mejor con MP3 que con WAV en algunos dispositivos.
 */
export let preferMp3Assets = true;

/** Cambiar formato en runtime (`false` = WAV). */
export function setPreferMp3Assets(on: boolean): void {
  preferMp3Assets = on;
}

export function soundAssetUrl(relativePathWithoutExt: string): string {
  const ext = preferMp3Assets ? 'mp3' : 'wav';
  const clean = relativePathWithoutExt.replace(/^\/+/, '').replace(/\.(wav|mp3)$/i, '');
  return `/sounds/${clean}.${ext}`;
}
