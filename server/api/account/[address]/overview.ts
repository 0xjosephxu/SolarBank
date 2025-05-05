import { parseFromRawAccountTokenHoldingResult } from '~/common/parser';
import type { RawAccountTokenHoldingResult } from '~/common/types';

export default defineEventHandler(async event => {
  const address = getRouterParam(event, 'address');
  if (!address) return {};
  const config = useRuntimeConfig(event);
  const overviewResult = await $fetch<RawAccountTokenHoldingResult>(
    `https://solarbank-api.bubbly.finance/sonic/v1/account/${address}`,
    {
      //   method: 'POST',
      headers: { Authorization: `Bearer ${config.accessToken}` },
    },
  );
  return parseFromRawAccountTokenHoldingResult(overviewResult);
});
