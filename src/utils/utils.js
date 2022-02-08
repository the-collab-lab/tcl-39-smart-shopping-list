import { compareAsc, formatDistanceToNowStrict, sub } from 'date-fns';

export const checkTokenFormat = (token) => {
  const threeWordsRegexCheck = /[a-z]+ [a-z]+ [a-z]+/;
  return threeWordsRegexCheck.test(token);
};

export const getTokenFromStorage = () => {
  return localStorage.getItem('token');
};

export function validateHours(item, hours) {
  //Modificarlo para que no marque cuando totalPurchases es 0

  if (item.totalPurchases === 0) return false;

  //Dates
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
}

export const calculateDaysSinceLastPurchase = (lastBought) => {
  let daysSinceLastTransaction = formatDistanceToNowStrict(
    lastBought.toDate(),
    {
      unit: 'day',
      roundingMethod: 'round',
    },
  );
  return (daysSinceLastTransaction = +daysSinceLastTransaction.split(' ')[0]);
};
