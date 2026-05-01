/** Estado persistente por carta en combate (createBattleState / merge). */
export interface BattleState {
  firstStrikeLeft: number;
  shieldBlocks: number;
  reviveLeft: number;
  buffUsed: boolean;
  healProcsLeft: number;
}
