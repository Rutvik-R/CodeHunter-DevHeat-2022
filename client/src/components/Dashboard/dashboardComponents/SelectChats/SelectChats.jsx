import styles from "./styles.module.css"
import { useState, useEffect } from "react"
import axios from "axios"

export default function SelectChats({setChatFetch, groupSelected, setGroupSelected, socket }) {
	const [group, setGroup] = useState("option1")

	const [listGroup, setListGroup] = useState(["Developer", "Finance", "BookClub"])

	const fetchGroups = async() => {
		try {
			const url = "http://localhost:5000/group/name"
			const res = await axios.get(url)
			setListGroup(res.data)
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		fetchGroups()
	}, [])


	const fetchChat = async() => {
	    try {
	      const url = "http://localhost:5000/group/specific"
	      const res = await axios.post(url, {name: groupSelected.slice(1)})
	      setChatFetch(res.data)
	    } catch (err) {
	      console.log(err)
	    }
	}

	useEffect(() => {
		fetchChat()
	}, [groupSelected])

	const handleClick = (e) => {
		if (e.target.id !== group) {
			setGroup(prev => prev==="option1" ? prev="option2" : prev="option1")
		}
	}

	const handleClickGroup = (e) => {
		setGroupSelected(e.target.innerText)
	}

	return (
		<div className={styles.selectChat__container}>
			<div className={styles.heading}>
				<div className={styles.options} id="option1" onClick={handleClick} style={group === "option1" ? {background: "#735F32"} : {}}>Groups</div>
				<div className={styles.options} id="option2" onClick={handleClick} style={group === "option1" ? {} : {background: "#735F32", borderRadius: "0 11px 0 0"}}>Chats</div>
			</div>
			<div className={styles.listGroups}>
				{group === "option1" && listGroup.map((item, index) => {
					return (
						<div key={index}>
							<div className={styles.group__name} onClick={handleClickGroup}>#{item}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}