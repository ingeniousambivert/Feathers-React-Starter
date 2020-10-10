import React from "react";
import Container from "@pages/container";
import DashboardComponent from "@components/dashboard";

function DashboardContainer() {
	return (
		<React.Fragment>
			<Container>
				<DashboardComponent />
			</Container>
		</React.Fragment>
	);
}

export default DashboardContainer;
