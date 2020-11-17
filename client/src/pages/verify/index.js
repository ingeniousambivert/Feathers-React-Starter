import React from "react";
import Container from "@containers";
import VerifyComponent from "@components/verify";

function VerifyContainer() {
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
				<VerifyComponent />
			</Container>
		</React.Fragment>
	);
}

export default VerifyContainer;
