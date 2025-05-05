import type {
  AccountTokenHoldingResult,
  LPHoldingResult,
  ProtocolHoldingInfo,
  RawAccountTokenHoldingResult,
  RawLPHoldingResult,
  RawSummaryResult,
  SummaryResult,
} from './types';

export function parseFromRawSummaryResult(raw: RawSummaryResult): SummaryResult {
  return {
    netWorthInUSD: parseFloat(raw.net_worth_u),
    netWorthInSOL: parseFloat(raw.net_worth_sol),
    holdingSonic: parseFloat(raw.holding_sonic),
    tokens: raw.tokens.map(token => ({
      name: token.name,
      totalInUSD: parseFloat(token.worth_u),
      percentage: parseFloat(token.percentage),
    })),
  };
}

export function parseFromRawAccountTokenHoldingResult(raw: RawAccountTokenHoldingResult): AccountTokenHoldingResult {
  return {
    worthInUSD: parseFloat(raw.worth_amount_u),
    tokens: raw.tokens.map(token => ({
      name: token.name,
      iconUrl: token.logo_uri,
      price: parseFloat(token.price_u),
      balance: parseFloat(token.balance),
      totalValueInCurrency: parseFloat(token.worth_amount_u),
    })),
  };
}

export function parseFromRawLPHoldingResult(raw: RawLPHoldingResult): LPHoldingResult {
  const LPs: ProtocolHoldingInfo[] = raw.lps.map(item => ({
    tokenInfos: [
      { symbol: item.token_a_name, amount: parseFloat(item.token_a_balance), iconUrl: item.token_a_logo_uri },
      { symbol: item.token_b_name, amount: parseFloat(item.token_b_balance), iconUrl: item.token_b_logo_uri },
    ],
    totalValueInCurrency: parseFloat(item.worth_amount_u),
    tags: [],
    assetName: item.name,
  }));

  return {
    totalAmountInUSD: parseFloat(raw.worth_amount_u),
    LPs,
  };
}
