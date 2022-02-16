import { compareAsc, formatDistanceToNowStrict, sub } from 'date-fns';

export const checkTokenFormat = (token) => {
  const threeWordsRegexCheck = /[a-z]+ [a-z]+ [a-z]+/;
  return threeWordsRegexCheck.test(token);
};

export const getTokenFromStorage = () => {
  return localStorage.getItem('token');
};

export const validateHours = (item, hours) => {
  if (item.totalPurchases === 0) return false;

  const currentTime = new Date();
  const purchaseDate = item.lastPurchase.toDate();
  const oneDayAgo = sub(currentTime, {
    hours,
  });

  const boughtLast24h = compareAsc(purchaseDate, oneDayAgo);

  if (boughtLast24h === -1) {
    return false;
  }

  return true;
};

export const validateActive = (item) => {
  if (item.totalPurchases === 1) {
    return true;
  }

  const daysSinceLastPurchase = calculateDaysSinceLastPurchase(
    item.lastPurchase,
  );
  if (daysSinceLastPurchase >= item.howSoon * 2) {
    return true;
  }
};

export const calculateDaysSinceLastPurchase = (lastBought) => {
  const daysSinceLastTransaction = formatDistanceToNowStrict(
    lastBought.toDate(),
    {
      unit: 'day',
      roundingMethod: 'round',
    },
  );
  return +daysSinceLastTransaction.split(' ')[0];
};
