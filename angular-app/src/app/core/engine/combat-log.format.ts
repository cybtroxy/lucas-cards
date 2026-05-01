/**
 * Formato de líneas de registro — port de game.js (formatCombatLine / formatCombatDetail / round block).
 */
import type { CombatLogLine } from '../models/combat-detail.model';
import type { SimultaneousExchangeResult, StrikeDetail } from '../models/combat-detail.model';

export function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function typeEffLabel(eff: string, isEn: boolean): string {
  if (eff === 'super') return isEn ? 'super' : 'súper';
  if (eff === 'weak') return isEn ? 'weak' : 'débil';
  return isEn ? 'neutral' : 'neutro';
}

function formatCombatLine(L: CombatLogLine, isEn: boolean): string {
  const n = (x: unknown) => `<span class="ce-num">${escapeHtml(String(x))}</span>`;
  const dm = (x: unknown) => `<span class="ce-dmg">${escapeHtml(String(x))}</span>`;
  const mit = (x: unknown) => `<span class="ce-mit">${escapeHtml(String(x))}</span>`;
  const bonus = (x: unknown) => `<span class="ce-bonus">${escapeHtml(String(x))}</span>`;
  const neg = (x: string) => `<span class="ce-neg">${escapeHtml(String(x))}</span>`;
  const hpC = (x: unknown) => `<span class="ce-hp">${escapeHtml(String(x))}</span>`;
  const note = (t: string) => `<span class="ce-note">${t}</span>`;
  const cr = (t: string) => `<span class="ce-crit">${t}</span>`;
  const k = L.k;
  switch (k) {
    case 'base':
      return (
        'ATK ' +
        n(L['atk']) +
        (isEn ? ' × type ' : ' × tipo ') +
        n(L['mult']) +
        ` (${typeEffLabel(String(L['eff']), isEn)}) → ` +
        dm(L['out'])
      );
    case 'crit':
      return L['proc']
        ? cr(isEn ? 'CRIT! ' : '¡CRIT! ') + n(L['from']) + ' → ' + dm(L['to'])
        : n(L['from']) + ' → ' + dm(L['to']);
    case 'pierce_atk':
      return isEn
        ? note(
            'Pierce: your attack ignores one shield block and uses lighter armor (1) while receiving.',
          )
        : note(
            'Perforar: al resolver el golpe, anula 1 carga de escudo y la armadura rinde 1 en vez de 2.',
          );
    case 'pierce_defense':
      return isEn
        ? neg('Pierce effect: ') +
            (L['shieldStripped'] ? 'shield block cleared' : '—') +
            (L['armorIs'] != null ? ' · effective armor ' + n(L['armorIs']) : '')
        : neg('Aplicar perforar: ') +
            (L['shieldStripped'] ? 'escudo anulado' : '—') +
            (L['armorIs'] != null ? ' · armadura efectiva ' + n(L['armorIs']) : '');
    case 'first_strike':
      return (isEn ? 'First strike: ' : 'Primer impacto: ') + n(L['from']) + ' → ' + dm(L['to']);
    case 'life_steal_pass':
      return isEn
        ? 'Life steal: heal 25% of final damage to attacker.'
        : 'Robo de vida: el atacante cura 25% del daño final infligido.';
    case 'burn_primer':
      return (
        (isEn ? 'Burn: +' : 'Brasas: +') +
        n(L['extra']) +
        (isEn
          ? ' extra damage (added after defense mitigation; not blocked by shield).'
          : ' al daño final (no mitigada por escudo; se aplica al total).')
      );
    case 'stun':
      return (isEn ? 'Stun: ' : 'Aturdir: ') + n(L['from']) + ' → ' + dm(L['to']);
    case 'psychic':
      return (isEn ? 'Psychic: ' : 'psíquico: ') + n(L['from']) + ' → ' + dm(L['to']);
    case 'execute_flag':
      return note(
        isEn
          ? 'Execute armed: if target is below 5 HP after this hit, damage becomes their remaining HP.'
          : 'Ejecución armada: si el rival baja de 5 PV, el daño pasa a ser sus PV actuales.',
      );
    case 'buff_next':
      return (isEn ? 'Buff: ' : 'Refuerzo: ') + n(L['from']) + ' → ' + dm(L['to']);
    case 'shield_block':
      return isEn
        ? neg('Shield: blocks this strike → ') + mit('0') + ' to the core'
        : neg('Escudo: anula el impacto de este golpe → ') + mit('0') + ' al daño de contacto';
    case 'armor':
      return (
        (isEn ? 'Armor: −' : 'Armadura: −') +
        n(L['sub']) +
        (isEn ? '  ' : '  ') +
        n(L['from']) +
        (isEn ? ' → ' : ' → ') +
        dm(L['to'])
      );
    case 'damage_reduce':
      return isEn
        ? 'Damage cut: ×' + n(L['factor']) + '  ' + n(L['from']) + ' → ' + dm(L['to'])
        : 'Corte: ×' + n(L['factor']) + '  ' + n(L['from']) + ' → ' + dm(L['to']);
    case 'execute_finisher':
      return (
        (isEn ? 'Execute: ' : 'Ejecución: ') +
        n(L['from']) +
        ' → ' +
        dm(L['to']) +
        (isEn ? ' (lethal vs low HP).' : ' (remate por PV bajos).')
      );
    case 'burn_add':
      return isEn
        ? 'Add burn: +' +
            n(L['n']) +
            '  (on top of post-mitigation ' +
            n(L['afterMitigation']) +
            ')'
        : 'Carga brasa: +' +
            n(L['n']) +
            '  (sobre ' +
            n(L['afterMitigation']) +
            ' del golpe ya atenuado)';
    case 'hp_hit': {
      const br = (Number(L['burn']) || 0) > 0;
      const bPart = br ? (isEn ? ' + ' + n(L['burn']) + ' burn' : ' + ' + n(L['burn']) + ' brasa') : '';
      return (
        `<div class="ce-summary">` +
        (isEn ? 'HP: ' : 'PV: ') +
        hpC(L['prevHp']) +
        ' → ' +
        hpC(L['nextHp']) +
        (isEn ? '  ·  loss ' : '  ·  −') +
        dm(L['total']) +
        (isEn ? ' (' : ' (') +
        (isEn ? 'hit' : 'golpe') +
        ' ' +
        n(L['fromAtk']) +
        bPart +
        ')</div>'
      );
    }
    case 'drain':
      return (
        (isEn ? 'Drain: +' : 'Sangría: +') +
        bonus(L['gain']) +
        (isEn ? ' HP (25% of damage).' : ' PV (25% del daño).')
      );
    case 'self_heal':
      return (
        (isEn ? 'Heal on hit: +' : 'Toque curativo: +') + bonus(L['n']) + (isEn ? ' HP' : ' PV')
      );
    case 'revive':
      return isEn ? cr('Revive! ') + 'Left at 1 HP.' : cr('¡Revivir! ') + '1 PV';
    default:
      return note(JSON.stringify(L));
  }
}

export function formatCombatDetail(d: StrikeDetail | undefined, dir: 'p' | 'r', isEn: boolean): string {
  if (!d?.lines?.length) return '';
  const from = escapeHtml(d.attackerName || '?');
  const to = escapeHtml(d.defenderName || '?');
  const cls = dir === 'p' ? 'ce-dir-p' : 'ce-dir-r';
  const li = d.lines
    .map((x) => formatCombatLine(x, isEn))
    .filter(Boolean)
    .map((x) => `<li>${x}</li>`)
    .join('');
  if (!li) return '';
  return (
    '<div class="ce-block">' +
    `<div class="ce-block-head ${cls}">` +
    `<span class="ce-from">${from}</span> <span class="ce-note">→</span> <span class="ce-to">${to}</span></div>` +
    `<ul class="ce-lines">${li}</ul></div>`
  );
}

export function buildCombatEventRoundBlock(
  round: number,
  ex: SimultaneousExchangeResult,
  isEn: boolean,
): string {
  const title = isEn ? `Round ${round} — simultaneous` : `Asalto ${round} — simultáneo`;
  const a = formatCombatDetail(ex.detailPtoR, 'p', isEn);
  const b = formatCombatDetail(ex.detailRtoP, 'r', isEn);
  if (!a && !b) return '';
  return `<div class="ce-round"><div class="ce-round-title">${title}</div>${a}${b}</div>`;
}

export function formatCombatFaintLine(card: { name?: string }, side: 'player' | 'rival', isEn: boolean): string {
  const name = escapeHtml(card.name || '?');
  const sp = side === 'player' ? 'player-name' : 'rival-name';
  if (isEn) {
    return `<p class="ce-faint">↓ <span class="${sp}">${name}</span> is down.</p>`;
  }
  return `<p class="ce-faint">↓ <span class="${sp}">${name}</span> ha caído.</p>`;
}

export function combatLogEntriesToHtml(
  entries: { kind: string; html?: string; round?: number; exchange?: SimultaneousExchangeResult }[],
  isEn: boolean,
): string {
  let out = '';
  for (const e of entries) {
    if (e.kind === 'html' && e.html) out += e.html;
    if (e.kind === 'round' && e.exchange && e.round != null) {
      out += buildCombatEventRoundBlock(e.round, e.exchange, isEn);
    }
  }
  return out;
}
