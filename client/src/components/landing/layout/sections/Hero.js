import React from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import ButtonGroup from "../../utils/elements/ButtonGroup";
import Button from "../../utils/elements/Button";
import HeroBanner from "./partials/HeroBanner";

import { Row, Col } from "antd";
import TypeIt from "typeit-react";

const propTypes = {
	...SectionProps.types
};

const defaultProps = {
	...SectionProps.defaults
};

const typeItStyle = { marginTop: "5%", width: "70%", color: "#202020" };
const ctaButtonStyle = { marginTop: "15%", marginBottom: "10%", color: "#fff" };

const Hero = ({
	className,
	topOuterDivider,
	bottomOuterDivider,
	topDivider,
	bottomDivider,
	hasBgColor,
	invertColor,
	...props
}) => {
	const outerClasses = classNames(
		"hero section center-content",
		topOuterDivider && "has-top-divider",
		bottomOuterDivider && "has-bottom-divider",
		hasBgColor && "has-bg-color",
		invertColor && "invert-color",
		className
	);

	const innerClasses = classNames(
		"hero-inner section-inner",
		topDivider && "has-top-divider",
		bottomDivider && "has-bottom-divider"
	);

	return (
		<section {...props} className={outerClasses}>
			<div className="container-md">
				<div className={innerClasses}>
					<Row gutter={[16, 16]} justify="center" align="middle">
						<Col
							xs={(24, { order: 2 })}
							sm={(24, { order: 2 })}
							md={(12, { order: 2 })}
							lg={(12, { order: 2 })}
							xl={(12, { order: 1 })}>
							<div className="hero-content">
								<h1 id="hero-text" className="mt-0 mb-16 heading-text">
									The Best Tool for
									<br />
									<span className="text-color-primary">Startups</span>
								</h1>
								<div className="container-xs">
									<div>
										<ButtonGroup>
											<Button
												style={ctaButtonStyle}
												tag="a"
												color="primary"
												href="/signup"
												wideMobile>
												Get started
											</Button>
										</ButtonGroup>
									</div>
									<TypeIt
										style={typeItStyle}
										className="m-0 mb-32"
										options={{
											loop: true,
											loopDelay: 300,
											breakLines: true,
											lifeLike: true
										}}
										getBeforeInit={(instance) => {
											instance
												.type(
													"<b> theManagementProject</b> is an adaptable project &  workflow <br/> management app, equipped <br/> with collaboration tools."
												)
												.pause(750)
												.delete(115)
												.pause(500)
												.type(
													"Our goal is to make managing the product & the business  <br/> with it easier. "
												)
												.pause(700)
												.delete(100)
												.pause(200)
												.type(
													"To provide a clear focus,<br/> order & objectives."
												)
												.pause(700)
												.delete(100)
												.pause(200)
												.type(
													"And have continuous oversight <br/> with control in an <br/>orderly & progressive process."
												);

											// Remember to return it!
											return instance;
										}}
									/>
								</div>
							</div>
						</Col>
						<Col
							xs={(24, { order: 1 })}
							sm={(24, { order: 1 })}
							md={(12, { order: 1 })}
							lg={(10, { order: 1 })}
							xl={(10, { order: 2 })}>
							<div
								alignItems="flex-start"
								id="hero-banner"
								className="hero-figure illustration-element-01">
								<HeroBanner />
							</div>
						</Col>
					</Row>
				</div>
			</div>
		</section>
	);
};

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
