import React from "react";
import Container from "@pages/container";
import SignInComponent from "@components/signin";

function SignInContainer() {
	return (
		<React.Fragment>
			<Container
				header={true}
				contentstyle={{ marginTop: "4%" }}
				iconcolor="#202020"
				background="#FEFEFE"
				footer={true}
				footercolor="#202020"
				footerbackground="#FEFEFE">
				<SignInComponent />
			</Container>
		</React.Fragment>
	);
}

export default SignInContainer;
