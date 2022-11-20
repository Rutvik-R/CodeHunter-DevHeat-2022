import { GoogleLogin } from "react-google-login"
import axios from "axios";
import GoogleButton from "react-google-button ";
const clientId = "802182116275-0u77gmcntf7j70s9snpkjtqlpiucfvrc.apps.googleusercontent.com"
import styles from "./styles.module.css"
export default function Login() {
    const server = async (data) => {
      try{
       const url = "http://localhost:5000/user/add";
       const temp = await axios.post(url,data)
      }catch(err) {
        console.log(err);
      }
    }
	const onSuccess = (res) => {
		console.log("Login Success! Current user: ", res.profileObj);
        localStorage.setItem('social-app',JSON.stringify(res.profileObj))
				server(res.profileObj)
        .then(() => window.location = '/dashboard')
	}

	const onFailure = (res) => {
		console.log("Login Failed! res: ", res)
	}

	return (
		<div id = "signInButton" >
			<GoogleLogin 
				clientId={clientId}
                buttonText="login"
                style={{color:"red"}}
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={'signle_host_origin'}
				isSignedIn={true}
                // render = {()=>(<GoogleButton className={styles.button}/>)}
                render={renderProps => (
                    <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}></GoogleButton>
                  )}

        
			/>
		</div>
	)
}