import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const LandingLayout = ({ children }) => (
	<React.Fragment>
		<Header navPosition="right" />
		<main className="site-content">{children}</main>
		<Footer />
	</React.Fragment>
);

export default LandingLayout;
