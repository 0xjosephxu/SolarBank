import { parseFromRawLPHoldingResult } from '~/common/parser';
import type { RawLPHoldingResult } from '~/common/types';

export default defineEventHandler(async event => {
  const address = getRouterParam(event, 'address');
  if (!address) return {};
  const config = useRuntimeConfig(event);
  try {
    const lpResult = await $fetch<RawLPHoldingResult>(
      `https://solarbank-api.bubbly.finance/sonic/v1/account/${address}/lp`,
      {
        headers: { Authorization: `Bearer ${config.accessToken}` },
      },
    );
    return parseFromRawLPHoldingResult(lpResult);
  } catch {
    throw Error('no found');
  }
});
