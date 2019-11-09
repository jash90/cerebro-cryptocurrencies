import styles from "./styles.css";

module.exports = ({ count, currency, currencies, thumbnail }) => (
  <div className={styles.main}>
    <div className={styles.articleTitleBar}>
      <h1>{`${count} ${currency}`}</h1>
    </div>
    <img className={styles.articleThumb} src={thumbnail} />
    {Object.keys(currencies).map(key => {
      return (
        <div>
          <h3>{`${key}: ${(currencies[`${key}`] * count).toFixed(2)} ${key}`}</h3>
        </div>
      );
    })}
  </div>
);
