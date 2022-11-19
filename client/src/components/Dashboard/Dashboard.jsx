import styles from "./styles.module.css";
import Chat from "./dashboardComponents/Chats/Chat";
import OnlineNow from "./dashboardComponents/OnlineNow/OnlineNow";
import Selectchats from "./dashboardComponents/SelectChats/SelectChats";
import axios from "axios"
import { useState, useEffect } from "react";

import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log(`${socket.id}`);
  socket.emit('storeClientInfo', { customId: JSON.parse(localStorage.getItem("social-app")).email} );
});

export default function Dashboard() {
  const [groupSelected, setGroupSelected] = useState();

  const [chatFetch, setChatFetch] = useState()

  const [prevGroupSelected, setPrevGroupSelected] = useState(null)
  
  useEffect(() => {
    prevGroupSelected && socket.emit("leave-room", prevGroupSelected);
    socket.emit("join-room", groupSelected);
    setPrevGroupSelected(groupSelected)
  }, [groupSelected]);

  return (
    <div className={styles.user__dashboard}>
      <Chat 
        chatGroup={chatFetch && chatFetch.name}
        chatFetch={chatFetch && chatFetch.chat}
        socket={socket}
      />
      <div className={styles.select__chats}>
        <OnlineNow 
          socket={socket}
        />
        <Selectchats
          setChatFetch={setChatFetch}
          groupSelected={groupSelected}
          setGroupSelected={setGroupSelected}
          socket={socket}
        />
      </div>
    </div>
  );
}
