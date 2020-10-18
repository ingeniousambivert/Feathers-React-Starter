import React from "react";
import Container from "@containers";
import RedirectSignInComponent from "@components/signin/redirect";

function RedirectSignInContainer() {
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
				<RedirectSignInComponent />
			</Container>
		</React.Fragment>
	);
}

export default RedirectSignInContainer;
