import React from "react";
import Container from "@pages/container";
import HomeComponent from "@components/home";

function HomeContainer() {
	return (
		<React.Fragment>
			<Container header={true} iconcolor="#fff" background="#6669CC" elevate={true}>
				<HomeComponent />
			</Container>
		</React.Fragment>
	);
}

export default HomeContainer;
