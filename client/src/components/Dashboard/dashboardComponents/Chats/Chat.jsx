import styles from "./styles.module.css"
import { useState } from "react"

export default function Chat({ chatFetch }) {

	let chatData = chatFetch
	let chats = chatData && chatData.chat

	const email = JSON.parse(localStorage.getItem("social-app")).email

	return (
		<div className={styles.chat__container}>
			<div className={styles.chat__userName}>
				<div className={styles.chat__profile} style={{background: "#BC6565"}}></div>
				<div className={styles.chat__firstName}>{chatData && chatData.name}</div>
			</div>
			<div className={styles.list__chats}>
				{chats && chats.map((item, index) => {
					return (
						<div className={styles.message__actual}>{item.message}</div>
					)
				}).reverse()}
			</div>
			<div className={styles.msg__input}>
				<input type="text" placeholder="Type Here..." />
				<i className="fa fa-send"></i>
			</div>
		</div>
	)
}