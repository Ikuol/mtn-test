export const applyFilter = (data, field, language) => {
  if (!data || !Array.isArray(data) || !field) return data;
  return data.filter((item) => {
    if (typeof item[field] === "string") {
      return item[field].toLowerCase().includes(language.toLowerCase());
    }
    return false;
  });
};

export const getUniqueValues = (data, key) => {
  if (!data || !Array.isArray(data)) return [];
  return [
    ...new Set(data.map((item) => item[key]).filter((val) => val !== null)),
  ];
};
