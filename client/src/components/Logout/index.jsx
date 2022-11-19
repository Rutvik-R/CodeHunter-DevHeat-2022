import { GoogleLogout } from "react-google-login"

const clientId = "802182116275-0u77gmcntf7j70s9snpkjtqlpiucfvrc.apps.googleusercontent.com"

export default function Logout() {

	const onSuccess = () => {
		console.log("Log out successfully");
		// setUserName()
	}

	return (
		<div id="signOutButton">
			<GoogleLogout
				clientId={clientId}
				buttonText="Logout"
				onLogoutSuccess={onSuccess}
			/>
		</div>
	)
}