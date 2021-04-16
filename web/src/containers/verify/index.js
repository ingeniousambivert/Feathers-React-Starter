import React from "react";
import PropTypes from "prop-types";
import { LinkText, PrimaryButton, SuccessResult, ErrorResult, Wrapper } from "@components";
import { Spinner, white } from "@utils";

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
					extra={[
						<PrimaryButton key="signin">
							<LinkText
								style={{ color: white }}
								linkTo="/signin"
								linkText="Sign In"
							/>
						</PrimaryButton>
					]}
				/>
			) : (
				<SuccessResult
					title="Email Verification Successful"
					subTitle="Your email has been successfully verified. Sign in to try all the features."
					extra={[
						<PrimaryButton key="signin">
							<LinkText
								style={{ color: white }}
								linkTo="/signin"
								linkText="Sign In"
							/>
						</PrimaryButton>
					]}
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
