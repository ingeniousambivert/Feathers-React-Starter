import React from "react";
import Container from "@containers";
import SignInComponent from "@components/signin";

function SignInContainer() {
	return (
		<React.Fragment>
			<Container
				header={true}
				contentstyle={{ marginTop: "4%" }}
				iconcolor="#202020"
				background="#FEFEFE"
				footer={false}>
				<SignInComponent />
			</Container>
		</React.Fragment>
	);
}

export default SignInContainer;
