import { parseFromRawSummaryResult } from '~/common/parser';
import type { RawSummaryResult, SummaryResult } from '~/common/types';

export default defineEventHandler(async event => {
  const address = getRouterParam(event, 'address');
  if (!address) return undefined;
  const config = useRuntimeConfig(event);
  try {
    const summaryResult = await $fetch<RawSummaryResult>(
      `https://solarbank-api.bubbly.finance/sonic/v1/account/${address}/summary`,
      {
        //   method: 'POST',
        headers: { Authorization: `Bearer ${config.accessToken}` },
      },
    );
    return parseFromRawSummaryResult(summaryResult);
  } catch {
    throw { holdingSonic: 0, netWorthInSOL: 0, netWorthInUSD: 0, tokens: [] } satisfies SummaryResult;
  }
});
