import styles from "./styles.module.css"
import {useState, useEffect } from "react"
import axios from 'axios'

export default function OnlineNow({ socket }) {

	const [users, setUsers] = useState([])

	useEffect(() => {
		socket.on("clients", clients => setUsers(clients))
	}, [socket])

	console.log(users)

	const [userData, setUserData] = useState([])

	const fetchUserData = async(data) => {
		try {
			const url = "http://localhost:5000/user"
			const res = await axios.post(url, {email: data})
			setUserData([...userData, res.data])
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		users.map((item) => {
			fetchUserData(item.customId)
		})
	}, [users])

	console.log(userData)

	return (
		<div className={styles.OnlineNow}>
			<div className={styles.heading}>
				<p>Online Now</p>
				<div className={styles.online__green}></div>
			</div>
			<div className={styles.online__profile}>
				{userData && userData.map((item, index) => {
					return (
						<div className={styles.tmp_profile} key={index}>
							<div className={styles.user__profile} style={{backgroundImage: `url(${item.imageUrl})`}}></div>
							<div>{item.givenName}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}