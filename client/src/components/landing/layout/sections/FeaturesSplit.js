import React from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../../utils/elements/Image";

const propTypes = {
	...SectionSplitProps.types
};

const defaultProps = {
	...SectionSplitProps.defaults
};

const FeaturesSplit = ({
	className,
	topOuterDivider,
	bottomOuterDivider,
	topDivider,
	bottomDivider,
	hasBgColor,
	invertColor,
	invertMobile,
	invertDesktop,
	alignTop,
	imageFill,
	...props
}) => {
	const outerClasses = classNames(
		"features-split section",
		topOuterDivider && "has-top-divider",
		bottomOuterDivider && "has-bottom-divider",
		hasBgColor && "has-bg-color",
		invertColor && "invert-color",
		className
	);

	const innerClasses = classNames(
		"features-split-inner section-inner",
		topDivider && "has-top-divider",
		bottomDivider && "has-bottom-divider"
	);

	const splitClasses = classNames(
		"split-wrap",
		invertMobile && "invert-mobile",
		invertDesktop && "invert-desktop",
		alignTop && "align-top"
	);

	const sectionHeader = {
		title: "Workflow that just works",
		paragraph:
			"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis."
	};

	const paraStyle = { color: "#414142" };
	return (
		<section {...props} className={outerClasses}>
			<div className="container">
				<div className={innerClasses}>
					<SectionHeader data={sectionHeader} className="center-content heading-text" />
					<div className={splitClasses}>
						<div className="split-item">
							<div className="split-item-content center-content-mobile reveal-from-left">
								<div className="text-xxs text-color-primary fw-600 tt-u mb-8">
									Lightning fast workflow
								</div>
								<h3 className="mt-0 mb-12 heading-text">Data-driven insights</h3>
								<p className="m-0" style={paraStyle}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
									eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris
									nisi ut aliquip ex ea commodo consequat.
								</p>
							</div>
							<div
								className={classNames(
									"split-item-image center-content-mobile",
									imageFill && "split-item-image-fill"
								)}>
								<Image
									src={require("../../../../assets/images/illustrations/projects.svg")}
									alt="Features split 01"
									width={528}
									height={396}
								/>
							</div>
						</div>

						<div className="split-item">
							<div className="split-item-content center-content-mobile reveal-from-right">
								<div className="text-xxs text-color-primary fw-600 tt-u mb-8">
									Lightning fast workflow
								</div>
								<h3 className="mt-0 mb-12 heading-text">Data-driven insights</h3>
								<p className="m-0" style={paraStyle}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
									eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris
									nisi ut aliquip ex ea commodo consequat.
								</p>
							</div>
							<div
								className={classNames(
									"split-item-image center-content-mobile",
									imageFill && "split-item-image-fill"
								)}>
								<Image
									src={require("../../../../assets/images/illustrations/schedule.svg")}
									alt="Features split 02"
									width={528}
									height={396}
								/>
							</div>
						</div>

						<div className="split-item">
							<div className="split-item-content center-content-mobile reveal-from-left">
								<div className="text-xxs text-color-primary fw-600 tt-u mb-8">
									Lightning fast workflow
								</div>
								<h3 className="mt-0 mb-12 heading-text">Data-driven insights</h3>
								<p className="m-0" style={paraStyle}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
									eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris
									nisi ut aliquip ex ea commodo consequat.
								</p>
							</div>
							<div
								className={classNames(
									"split-item-image center-content-mobile",
									imageFill && "split-item-image-fill"
								)}>
								<Image
									src={require("../../../../assets/images/illustrations/business.svg")}
									alt="Features split 03"
									width={528}
									height={396}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
