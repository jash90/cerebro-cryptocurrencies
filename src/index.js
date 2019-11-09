import {
  URL,
  CURRENCIES,
  CRYPTOCURRENCIES,
  API,
  DEFAULT_CURRENCIES
} from "./const";
import Preview from "./Preview";
import icon from "./icon.png";
export const fn = ({ term, display }) => {
  const regex = /([0-9]+)\s?(\w+)\s?(?:to|in|at)\s?(\w+)/;
  const match = term.toLowerCase().match(regex);
  if (match) {
    let count = Number(match[1]);
    let firstCurrency = String(match[2]).toUpperCase();
    let secondCurrency = String(match[3]).toUpperCase();

    if (
      (CURRENCIES.includes(firstCurrency) ||
        CRYPTOCURRENCIES.includes(firstCurrency))
    ) {
      try {

        if (
          !CURRENCIES.includes(secondCurrency) &&
          !CRYPTOCURRENCIES.includes(secondCurrency)
        ) {
          secondCurrency = "USD"
        }

        fetch(
          `${URL}${firstCurrency}&tsyms=${secondCurrency +
            DEFAULT_CURRENCIES}&api_key=${API}`
        )
          .then(resp => resp.json())
          .then(response => {
            const price = Number(response[`${secondCurrency}`]);
            const value = (count * price).toFixed(2);
            display({
              title: `${count} ${firstCurrency} = ${value} ${secondCurrency}`,
              term: `${term}`,
              icon: icon,
              clipboard: `${count} ${firstCurrency} = ${value} ${secondCurrency}`,
              getPreview: () => (
                <Preview
                  count={count}
                  currency={firstCurrency}
                  currencies={response}
                  thumbnail={icon}
                />
              )
            });
          });
      } catch (err) {
        return;
      }
    }
  }
};
