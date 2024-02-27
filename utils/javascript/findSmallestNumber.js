function findSmallestNumber(arr) {
  if (!arr || arr.length === 0) {
    return null; // Return null for an empty array
  }

  if (arr.length === 1) {
    return arr[0];
  }

  let smallest = arr[0]; // Assume the first element is the smallest

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
    }
  }

  return smallest;
}

export default findSmallestNumber;
