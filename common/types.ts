export type SearchResult = {
  addresses: string[];
};

export type RawSummaryResult = {
  net_worth_u: string;
  net_worth_sol: string;
  holding_sonic: string;
  tokens: { name: string; worth_u: string; percentage: string }[];
};

export type SummaryResult = {
  netWorthInUSD: number;
  netWorthInSOL: number;
  holdingSonic: number;
  tokens: { name: string; totalInUSD: number; percentage: number }[];
};

export type RawAccountTokenHoldingResult = {
  worth_amount_u: string;
  tokens: { name: string; logo_uri: string; balance: string; price_u: string; worth_amount_u: string }[];
};
export type AccountTokenHoldingResult = {
  worthInUSD: number;
  tokens: AssetInfo[];
};
// type RawTokenInfoItemKey = 'logo_uri' | 'balance' | 'name';

// type RawTokenInfoKey = `token_${string}_${RawTokenInfoItemKey}`;
// type TokenInfoItemKey = 'Balance' | 'Name';
// type TokenInfoKey = `token${string}${TokenInfoItemKey}`;
// type TokenLogoURIKey = `token${string}LogoURI`;
// type RawTokenInfoItems = Record<RawTokenInfoKey, string>;
// type TokenInfoItems = Record<TokenInfoKey, number> & Record<TokenLogoURIKey, string>;
export type RawLPHoldingResult = {
  worth_amount_u: string;
  lps: {
    worth_amount_u: string;
    name: string;
    token_a_logo_uri: string;
    token_b_logo_uri: string;
    token_a_balance: string;
    token_b_balance: string;
    token_a_name: string;
    token_b_name: string;
  }[];
};

export type LPHoldingResult = {
  totalAmountInUSD: number;
  LPs: ProtocolHoldingInfo[];
};
export type AssetInfo = {
  iconUrl: string;
  name: string;
  balance: number;
  price: number;
  totalValueInCurrency: number;
};

export type ProtocolBaseInfo = {
  type: string;
  protocolName: string;
  iconUrl: string;
  totalHoldingValueInCurrency: number;
};

export type ProtocolHoldingInfo = {
  assetName: string;
  tags: string[];
  tokenInfos: {
    symbol: string;
    amount: number;
    iconUrl: string;
  }[];
  totalValueInCurrency: number;
};
