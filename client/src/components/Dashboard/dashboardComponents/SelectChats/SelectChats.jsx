import styles from "./styles.module.css"
import { useState } from "react"

export default function SelectChats() {
	const [group, setGroup] = useState("option1")

	const handleClick = (e) => {
		if (e.target.id !== group) {
			setGroup(prev => prev==="option1" ? prev="option2" : prev="option1")
		}
	}

	return (
		<div className={styles.selectChat__container}>
			<div className={styles.heading}>
				<div className={styles.options} id="option1" onClick={handleClick} style={group === "option1" ? {background: "#735F32"} : {}}>Groups</div>
				<div className={styles.options} id="option2" onClick={handleClick} style={group === "option1" ? {} : {background: "#735F32", borderRadius: "0 11px 0 0"}}>Chats</div>
			</div>
		</div>
	)
}