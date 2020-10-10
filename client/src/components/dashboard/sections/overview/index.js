import React from "react";
import { Image, Typography } from "antd";
import Wrapper from "@components/wrapper";
import Welcome from "@images/illustrations/welcome_dashboard.svg";

const { Text } = Typography;

function Overview() {
	return (
		<Wrapper>
			<Image src={Welcome} width={200} />
			<br />
			<Text strong>Overview</Text>
		</Wrapper>
	);
}

export default Overview;
