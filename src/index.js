import { url, CURRENCIES, CRYPTOCURRENCIES } from "./const";
import icon from "./icon.png";
export const fn = ({ term, display}) => {
  const regex = /([0-9]+) (\w+) (?:to|in|at) (\w+)/;
  const match = term.toLowerCase().match(regex);
  if (match) {
    let count = Number(match[1]);
    let firstCurrency = String(match[2]).toUpperCase();
    let secondCurrency = String(match[3]).toUpperCase();
    let cryptocurrency = firstCurrency;
    let currency = secondCurrency;
    let divide = false;

    if (
      CURRENCIES.includes(firstCurrency) &&
      CRYPTOCURRENCIES.includes(secondCurrency)
    ) {
      currency = firstCurrency;
      cryptocurrency = secondCurrency;
      divide = true;
    }

    if (
      CURRENCIES.includes(currency) &&
      CRYPTOCURRENCIES.includes(cryptocurrency)
    ) {
      try {
        fetch(`${url}${cryptocurrency}&tsyms=${currency}`)
          .then(resp => resp.json())
          .then(response => {
            const price = Number(response[`${currency}`]);
            const value = this.calculate(divide, count, price);
            display({
              title: `${count} ${firstCurrency} = ${value} ${secondCurrency}`,
              term: `${term} = ${value} ${currency}`,
              icon: icon
            });
          });
      } catch (err) {
        // do nothing when amount parse failed
        return;
      }
    }
  }
};
export const calculate = (divide, a, b) => {
  if (divide) {
    return (a / b).toFixed(2);
  } else {
    return (a * b).toFixed(2);
  }
};
