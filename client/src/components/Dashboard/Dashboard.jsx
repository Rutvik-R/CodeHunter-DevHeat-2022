import styles from "./styles.module.css"
import Chat from "./dashboardComponents/Chats/Chat"
import OnlineNow from "./dashboardComponents/OnlineNow/OnlineNow"
import Selectchats from "./dashboardComponents/SelectChats/SelectChats"

import { useState, useEffect } from "react"

import { io } from "socket.io-client"

const socket = io("http://localhost:5000")

socket.on('connect', () => {
	console.log(`${socket.id}`)
})

socket.emit('join-room', "groupName");

export default function Dashboard() {

	const [groupSelected, setGroupSelected] = useState()

	useEffect(() => {
		socket.emit('join-room', groupSelected);
	}, [groupSelected])

	return (
		<div className={styles.user__dashboard}> 
			<Chat />
			<div className={styles.select__chats}>
				<OnlineNow />
				<Selectchats 
					groupSelected={groupSelected}
					setGroupSelected={setGroupSelected}
					socket={socket}
				/>
			</div>
		</div>
	)
} 