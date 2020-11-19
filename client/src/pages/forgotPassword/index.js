import React from "react";
import Container from "@containers";
import ForgotPasswordComponent from "@components/forgotPassword";

function ForgotPassword() {
	return (
		<React.Fragment>
			<Container
				header={true}
				contentstyle={{ marginTop: "4%" }}
				iconcolor="#202020"
				background="#FEFEFE"
				footer={false}>
				<ForgotPasswordComponent />
			</Container>
		</React.Fragment>
	);
}

export default ForgotPassword;
