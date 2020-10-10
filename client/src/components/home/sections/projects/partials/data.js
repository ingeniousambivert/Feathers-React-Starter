/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Button, Typography, Card, Row, Col, Tooltip, notification } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import { primaryColor, white } from "@utils";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const { Text } = Typography;

function ShowProjects(props) {
	const { projects, create } = props;
	const { total, data } = projects;

	const infoNotification = () => {
		const descriptionText = (
			<span>
				The &quot; &nbsp; &bull; &nbsp; &quot; beside the project title denotes that you are
				the owner of the project
			</span>
		);

		notification["info"]({
			message: descriptionText,
			placement: "bottomRight",
			duration: 4
		});
	};

	const renderProjects = (project) => {
		const cardHeadStyle = { background: primaryColor };
		const cardTextStyle = { color: white };
		return (
			<Col Col span={8}>
				<Card
					headStyle={cardHeadStyle}
					size="small"
					style={{ margin: "4% 0" }}
					title={
						<Text style={cardTextStyle} strong>
							{" "}
							{project.title} &nbsp; &bull;{" "}
						</Text>
					}
					extra={
						<Link
							to={{
								pathname: "/project/dashboard",
								state: { id: project._id }
							}}>
							<Tooltip title="Go to project dashboard">
								<DashboardOutlined style={cardTextStyle} />
							</Tooltip>
						</Link>
					}>
					<Text strong>{project.niche}</Text> <br />
					{project.description}
				</Card>
			</Col>
		);
	};

	useEffect(() => {
		//infoNotification();
	}, []);

	return (
		<div>
			<Row gutter={[16, 24]} justify="end" align="middle">
				<Col>
					<Text>
						Total <b>{total}</b>{" "}
						{total > 1 ? <span>projects</span> : <span>project</span>}{" "}
					</Text>
				</Col>
			</Row>
			<Row gutter={[16, 24]} justify="space-around" align="middle">
				<Col xs={22} sm={22} md={20} lg={18} xl={18}>
					<Row gutter={16}>{data.map(renderProjects)}</Row>
				</Col>
			</Row>
			<Row gutter={[16, 24]} justify="center" align="middle">
				<Col>
					<Button type="primary" onClick={create}>
						Create
					</Button>
				</Col>
			</Row>
		</div>
	);
}

ShowProjects.propTypes = {
	projects: PropTypes.object.isRequired,
	create: PropTypes.func.isRequired
};

export default ShowProjects;
