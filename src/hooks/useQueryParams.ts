export const useQueryParams = (url: string | null = null) => {
  const paramsObj = new URLSearchParams(url ? url : window.location.search);
  const newObj = {};
  for (const [key, value] of paramsObj) {
    newObj[key] = value;
  }
  return newObj as unknown;
};
