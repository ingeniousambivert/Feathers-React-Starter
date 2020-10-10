import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsAuthenticated } from "../../store/slices/auth";

import Hero from "../../components/landing/layout/sections/Hero";
import FeaturesTiles from "../../components/landing/layout/sections/FeaturesTiles";
import FeaturesSplit from "../../components/landing/layout/sections/FeaturesSplit";
import Cta from "../../components/landing/layout/sections/Cta";

const Landing = () => {
	let history = useHistory();
	let isUserAuthenticated = useSelector(selectIsAuthenticated);

	useEffect(() => {
		if (isUserAuthenticated) return history.push("/home");
	}, [isUserAuthenticated, history]);
	return (
		<React.Fragment>
			<Hero className="illustration-section-01" />
			<FeaturesTiles />
			<FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />

			<Cta split />
		</React.Fragment>
	);
};

export default Landing;
