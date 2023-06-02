const timeDifference = (from, to) => {
  const fromHr = from.split(":")[0];
  const fromMin = from.split(":")[1];

  const toHr = to.split(":")[0];
  const toMin = to.split(":")[1];

  const totalFromTime = (Number(fromHr)*60)+Number(fromMin)
  const totalToTime = (Number(toHr)*60)+Number(toMin)

  const result = Number(Number(Number(totalToTime) - Number(totalFromTime)) / 60).toFixed(1);

  return `${result} hrs`;
};

module.exports = timeDifference;
