export default defineEventHandler(async event => {
  const { input } = getQuery<{ input: string }>(event);
  const config = useRuntimeConfig(event);

  const searchResult = await $fetch('https://solarbank-api.bubbly.finance/sonic/v1/search', {
    body: { query: input },
    method: 'POST',
    headers: { Authorization: `Bearer ${config.accessToken}` },
  });
  return searchResult;
});
