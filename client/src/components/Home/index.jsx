import React from 'react'
import styles from './styles.module.css'
import { useState, useEffect } from 'react';
import Login from '../Login/index';
import {gapi} from "gapi-script"
import Logout from '../Logout';

const clientId = "802182116275-0u77gmcntf7j70s9snpkjtqlpiucfvrc.apps.googleusercontent.com"

function Home() {
    const [userName, setUserName] = useState();

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientId,
        scope: ""
      })
    }

    gapi.load('client:auth2', start)
  })
    return (
       <div className={styles.container}>
           <div className={styles.container1}>
            <div className={styles.container2}>Welcome to our community</div> 
            <div className={styles.container3}>#Social App</div>
            {userName ?
        <Logout/>
        :
        <Login />
      }

           </div>
           
       </div>
    )
}
export default Home