import styles from "./styles.module.css"
import Chat from "./dashboardComponents/Chats/Chat"
import OnlineNow from "./dashboardComponents/OnlineNow/OnlineNow"
import Selectchats from "./dashboardComponents/SelectChats/SelectChats"

export default function Dashboard() {
	return (
		<div className={styles.user__dashboard}> 
			<Chat />
			<div className={styles.select__chats}>
				<OnlineNow />
				<Selectchats />
			</div>
		</div>
	)
} 