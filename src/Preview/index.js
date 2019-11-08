import React from "react"
import styles from "./styles.css"

module.exports = ({currency, currencies, thumbnail}) => (
	<div className={styles.main}>
		<div className={styles.articleTitleBar}><h1>{currency}</h1></div>
		<img className={styles.articleThumb} src={thumbnail} />
		{Object.keys(currencies).map(key=>{
            <p>`${key}: ${currencies[`${key}`]}`</p>
        })}
	</div>
)