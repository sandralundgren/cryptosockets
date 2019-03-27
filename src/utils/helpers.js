export const roundedPrice = val => parseFloat(val).toFixed(2);

export const formatOptions = arr =>
  arr.map(item => ({
    key: item.id,
    label: item.display_name,
    value: item.id,
    text: item.display_name
  }));

export const difference = (arr1, arr2) => arr1.filter(el => !arr2.includes(el));
