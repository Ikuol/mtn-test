export const applyFilter = () => {};

export const getUniqueValues = (data, key) => {
  if (!data || !Array.isArray(data)) return [];
  return [
    ...new Set(data.map((item) => item[key]).filter((val) => val !== null)),
  ];
};
