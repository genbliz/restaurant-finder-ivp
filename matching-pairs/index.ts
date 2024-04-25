function sockMerchant(n: number | string, arr: string | number[]) {
  // The first line contains an integer , the number of socks represented in .
  const n01 = Number(n);

  // The second line contains space-separated integers, , the colors of the socks in the pile
  const socks = (() => {
    if (Array.isArray(arr)) {
      return arr;
    }

    // When it is string separated by comma
    if (arr.trim().includes(",")) {
      return arr
        .trim()
        .split(",")
        .filter((k) => k)
        .map((n) => parseInt(n));
    }

    // When it is string separated by space
    return arr
      .trim()
      .split(" ")
      .filter((k) => k)
      .map((n) => parseInt(n));
  })();

  const pairAggregator: Record<number, number> = {};
  let pairsCount = 0;

  for (let i = 0; i < n01; i++) {
    const item = socks[i];

    if (!pairAggregator[item]) {
      pairAggregator[item] = 1;
    } else {
      pairAggregator[item] += 1;
    }

    if (pairAggregator[item] > 1) {
      pairsCount += 1;
      pairAggregator[item] = 0;
    }
  }

  return pairsCount;

  // 9, [10, 20, 20, 10, 10, 30, 50, 10, 20]
}

console.log(sockMerchant(9, "10 20 20 10 10 30 50 10 20"));
