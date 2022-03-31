export default function getMostFrequent(arr: any[]) {
  const hashmap = arr.reduce((acc: { [x: string]: any; }, val: string | number) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return hashmap
}