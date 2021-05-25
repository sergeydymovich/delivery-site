module.exports = {
  calculateOrderSum: (arr, field) => {
    return arr.reduce(
      (sum, current) => sum + current[field] * current.count,
      0
    );
  },
};