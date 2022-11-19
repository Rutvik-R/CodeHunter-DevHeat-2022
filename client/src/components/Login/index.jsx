import { GoogleLogin } from "react-google-login"

const clientId = "802182116275-0u77gmcntf7j70s9snpkjtqlpiucfvrc.apps.googleusercontent.com"

export default function Login() {

	const onSuccess = (res) => {
		console.log("Login Success! Current user: ", res.profileObj);
		// setUserName(res.profileObj)
	}

	const onFailure = (res) => {
		console.log("Login Failed! res: ", res)
	}

	return (
		<div id = "signInButton">
			<GoogleLogin 
				clientId={clientId}
				buttonText="Login"
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={'signle_host_origin'}
				isSignedIn={true}
			/>
		</div>
	)
}