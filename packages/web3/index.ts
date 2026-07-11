// Web3 — liquidación instantánea de comisión al anfitrión (la pieza opcional
// "si da tiempo"). Placeholder del contrato; la implementación real se decide
// en un issue (chain, testnet vs mainnet, real vs simulado para la demo).

export interface LiquidacionInput {
  anfitrionWallet: string;
  montoMXN: number;
  reservaId: string;
}
export interface LiquidacionOutput {
  txHash: string; // evidencia visible de que el dinero se movió (el "wow")
  status: "confirmed" | "pending" | "simulated";
}

/** TODO(issue web3): implementar liquidación real. Por ahora, simulada. */
export async function liquidar(_input: LiquidacionInput): Promise<LiquidacionOutput> {
  return { txHash: "0xSIMULADO", status: "simulated" };
}
