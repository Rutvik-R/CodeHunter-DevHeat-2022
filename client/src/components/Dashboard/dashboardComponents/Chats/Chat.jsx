import styles from "./styles.module.css"
import { useState } from "react"
import axios from "axios"

export default function Chat({ chatFetch, socket }) {

	let chatData = chatFetch
	let chats = chatData && chatData.chat
	const email = JSON.parse(localStorage.getItem("social-app")).email

	const [message, setMessage] = useState("")

	const handleChange = (e) => {
		setMessage(e.target.value)
	}

	const handleSubmit = async() => {
		
		try {
			const url = "http://localhost:5000/group/chat"
			const data = {groupName: chatData.name, message: message, from: email}
			socket.emit("send-message", data)
			setMessage("")
			const res = await axios.post(url, data)
			// console.log(res)
		} catch (err) {
			console.log(err)
		}
	}


	socket.on("recieve-message", data => console.log(data))

 

	return (
		<div className={styles.chat__container}>
			<div className={styles.chat__userName}>
				<div className={styles.chat__profile} style={{background: "#BC6565"}}></div>
				<div className={styles.chat__firstName}>{chatData && chatData.name}</div>
			</div>
			<div className={styles.list__chats}>
				{chats && chats.map((item, index) => {
					return (
						<div className={styles.divBox} key={index} style={item.from === email ? {justifyContent: "flex-end"} : {}}>
							<div className={styles.message__actual} style={item.from === email ? {background: "#5F669B"} : {}} >{item.message}</div>
						</div>
					)
				}).reverse()}
			</div>
			<div className={styles.msg__input}>
				<input type="text" placeholder="Type Here..." value={message} onChange={handleChange}/>
				<i className="fa fa-send" onClick={handleSubmit}></i>
			</div>
		</div>
	)
}