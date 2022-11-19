import styles from "./styles.module.css"
export default function Chat() {

	const chats = ["first", "two", "three", "floor"]

	return (
		<div className={styles.chat__container}>
			<div className={styles.chat__userName}>
				<div className={styles.chat__profile} style={{background: "#BC6565"}}></div>
				<div className={styles.chat__firstName}>userName</div>
			</div>
			<div className={styles.list__chats}>
				{chats.map((item, index) => {
					return (
						<p key={index}>{item}</p>
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