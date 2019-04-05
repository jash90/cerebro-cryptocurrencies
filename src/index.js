import { URL, CURRENCIES, CRYPTOCURRENCIES, API } from "./const";
import icon from "./icon.png";
export const fn = ({ term, display }) => {
  const regex = /([0-9]+) (\w+) (?:to|in|at) (\w+)/;
  const match = term.toLowerCase().match(regex);
  if (match) {
    let count = Number(match[1]);
    let firstCurrency = String(match[2]).toUpperCase();
    let secondCurrency = String(match[3]).toUpperCase();

    if (
      (CURRENCIES.includes(firstCurrency) ||
        CRYPTOCURRENCIES.includes(firstCurrency)) &&
      (CURRENCIES.includes(secondCurrency) ||
        CRYPTOCURRENCIES.includes(secondCurrency))
    ) {
      try {
        fetch(`${URL}${firstCurrency}&tsyms=${secondCurrency}&api_key=${API}`)
          .then(resp => resp.json())
          .then(response => {
            const price = Number(response[`${secondCurrency}`]);
            const value = (count * price).toFixed(2);
            display({
              title: `${count} ${firstCurrency} = ${value} ${secondCurrency}`,
              term: `${term}`,
              icon: icon
            });
          });
      } catch (err) {
        return;
      }
  }
  }
};
