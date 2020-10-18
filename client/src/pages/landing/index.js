import React from "react";
import Container from "@containers";
import LandingComponent from "@components/landing";

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
				<LandingComponent />
			</Container>
		</React.Fragment>
	);
}

export default SignInContainer;
