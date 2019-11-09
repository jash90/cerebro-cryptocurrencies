import styles from "./styles.css";
import React from "react";

module.exports = ({count, currency, currencies, thumbnail}) => (
	<div className={styles.main}>
		<div className={styles.articleTitleBar}><h1>{`${count} ${currency}`}</h1></div>
		<img className={styles.articleThumb} src={thumbnail} />
		{Object.keys(currencies).map(key=>{
            <p>{`${key}: ${currencies[`${key}`]*count} ${key}`}</p>
        })}
	</div>
)