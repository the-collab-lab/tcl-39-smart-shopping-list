import {
  compareAsc,
  differenceInDays,
  formatDistanceToNowStrict,
  sub,
} from 'date-fns';

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

export const isDoubleEstimated = (lastPurchaseDate, howSoonInDays) => {
  const diffDays = differenceInDays(Date.now(), lastPurchaseDate);
  return 2 * diffDays >= howSoonInDays;
};

export const isProductInactive = (
  totalPurchases = 0,
  howSoonInDays = 0,
  lastPurchaseDate,
) => {
  return (
    totalPurchases === 1 || isDoubleEstimated(lastPurchaseDate, howSoonInDays)
  );
};

export const getProductsEstimatedWithRange = (
  products = [],
  start = 0,
  end = 6,
) => {
  const productsFiltered = products.filter(
    (product) =>
      product.howSoon >= start &&
      product.howSoon <= end &&
      !isProductInactive(
        product.totalPurchases,
        product.howSoon,
        product.lastPurchase,
      ),
  );
  return productsFiltered;
};

export const getProductsEstimated = (products = [], start = 0) => {
  const productsFiltered = products.filter(
    (product) =>
      product.howSoon >= start &&
      !isProductInactive(
        product.totalPurchases,
        product.howSoon,
        product.lastPurchase,
      ),
  );
  return productsFiltered;
};

export const getInactiveProducts = (products = []) => {
  return products.filter((product) => {
    return isProductInactive(
      product.totalPurchases,
      product.howSoon,
      product.lastPurchase,
    );
  });
};

export const sortProductsByName = (products = []) => {
  return products.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};
