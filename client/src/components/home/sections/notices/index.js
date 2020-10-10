import React from "react";
import { Empty, Typography } from "antd";

const { Text } = Typography;

function Notices() {
	return (
		<div style={{ marginTop: "2%" }}>
			<Empty
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				imageStyle={{
					height: 100,
					alignContent: "center",
					margin: "0 auto"
				}}
				description={<Text>No Notifications</Text>}
			/>
		</div>
	);
}

export default Notices;
