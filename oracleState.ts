// oracleState.ts

export type OraclePhase =
  | "idle"
  | "drawing"
  | "interpreting"
  | "reveal";

export interface OracleState {
  phase: OraclePhase;
  emotion: string;
  intensity: number;
}

export const defaultOracleState: OracleState = {
  phase: "idle",
  emotion: "calm",
  intensity: 0.5,
};
