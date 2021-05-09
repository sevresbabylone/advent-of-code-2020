export const getBinaryPartition = (
  boardingCode: string,
  upperbound: number,
  lowerbound: number,
): number => {
  if (upperbound === lowerbound) return upperbound;
  const midpoint = (upperbound + lowerbound) / 2;
  const lowerboundOfTop = Math.ceil(midpoint);
  const upperboundOfBottom = Math.floor(midpoint);
  if (boardingCode[0] === "F" || boardingCode[0] === "L") {
    return getBinaryPartition(
      boardingCode.slice(1),
      upperboundOfBottom,
      lowerbound,
    );
  } else {
    return getBinaryPartition(
      boardingCode.slice(1),
      upperbound,
      lowerboundOfTop,
    );
  }
};

export const getSeatID = (boardingCode: string): number => {
  const rowNumber = getBinaryPartition(boardingCode, 127, 0);
  const seatNumber = getBinaryPartition(boardingCode.slice(7), 7, 0);
  return rowNumber * 8 + seatNumber;
};

export const getAllSeatIDs = (boardingCodes: string[]): number[] => {
  return boardingCodes.map(getSeatID);
};

export const findSeatGap = (seatIds: number[]): number => {
  const sortedSeatIds = [...seatIds];
  sortedSeatIds.sort((a, b) => a - b);
  const seatSet = new Set(seatIds);

  for (
    let i = sortedSeatIds[0];
    i <= sortedSeatIds[sortedSeatIds.length - 1];
    i++
  ) {
    if (!seatSet.has(i)) {
      return i;
    }
  }
  return -1;
};
