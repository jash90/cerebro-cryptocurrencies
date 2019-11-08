import styles from "./styles.css";
import React from "react";

module.exports = ({currency, currencies, thumbnail}) => (
	<div className={styles.main}>
		<div className={styles.articleTitleBar}><h1>{currency}</h1></div>
		<img className={styles.articleThumb} src={thumbnail} />
        <p>{JSON.stringify(currencies)}</p>
		{Object.keys(currencies).map(key=>{
            <p>`${key}: ${currencies[`${key}`]}`</p>
        })}
	</div>
)