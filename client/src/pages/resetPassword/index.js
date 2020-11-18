import React from "react";
import Container from "@containers";
import ResetPasswordComponent from "@components/resetPassword";

function ResetPassword() {
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
				<ResetPasswordComponent />
			</Container>
		</React.Fragment>
	);
}

export default ResetPassword;