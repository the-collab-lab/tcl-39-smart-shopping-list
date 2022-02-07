import { compareAsc, sub } from 'date-fns';

export const checkTokenFormat = (token) => {
  const threeWordsRegexCheck = /[a-z]+ [a-z]+ [a-z]+/;
  return threeWordsRegexCheck.test(token);
};

export const getTokenFromStorage = () => {
  return localStorage.getItem('token');
};

export function validateHours(item, hours) {
  if (!item.lastPurchase) return false;

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
