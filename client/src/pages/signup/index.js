import React from "react";
import Container from "@containers";
import SignUpComponent from "@components/signup";

function SignUpContainer() {
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
				<SignUpComponent />
			</Container>
		</React.Fragment>
	);
}

export default SignUpContainer;
