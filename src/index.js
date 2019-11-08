import {
  URL,
  CURRENCIES,
  CRYPTOCURRENCIES,
  API,
  DEFAULT_CURRENCIES
} from "./const";
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
        CRYPTOCURRENCIES.includes(firstCurrency)) &&
      (CURRENCIES.includes(secondCurrency) ||
        CRYPTOCURRENCIES.includes(secondCurrency))
    ) {
      try {
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
              getPreview: () => (
                <Preview
                  term={`${count} ${firstCurrency}`}
                  previewText={response}
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
