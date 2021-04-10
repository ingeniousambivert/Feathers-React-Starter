import React from "react";
import PropTypes from "prop-types";
import { LinkButton, SuccessResult, ErrorResult, Wrapper } from "@components";
import { Spinner } from "@utils";

function VerifyContainer(props) {
	const { error, loading } = props;

	return (
		<Wrapper>
			{loading ? (
				<Spinner loadingtext="Verifying your email. Please wait" />
			) : error ? (
				<ErrorResult
					title="Email Verification Failed"
					subTitle="The token is invalid or your email has already been verified."
					extra={[<LinkButton linkTo="/signin" key="signin" buttonText="Sign In" />]}
				/>
			) : (
				<SuccessResult
					title="Email Verification Successful"
					subTitle="Your email has been successfully verified. Sign in to try all the features."
					extra={[<LinkButton linkTo="/signin" key="signin" buttonText="Sign In" />]}
				/>
			)}
		</Wrapper>
	);
}

VerifyContainer.propTypes = {
	error: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.bool,
		PropTypes.number,
		PropTypes.string,
		PropTypes.element
	]).isRequired,
	loading: PropTypes.bool.isRequired
};

export default VerifyContainer;
