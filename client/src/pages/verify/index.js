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
				footer={false}>
				<VerifyComponent />
			</Container>
		</React.Fragment>
	);
}

export default VerifyContainer;
