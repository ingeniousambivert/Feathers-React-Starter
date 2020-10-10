import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
	TeamOutlined,
	UnorderedListOutlined,
	SettingOutlined,
	UserOutlined,
	PicRightOutlined,
	MessageOutlined,
	PlusOutlined
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { Logo, PageHeader } from "@layouts";
import { white } from "@utils";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

function SiderContainer(props) {
	const { owner, title, children } = props;
	const [collapsed, setCollapsed] = useState(false);
	const logoStyle = {
		height: "40px",
		margin: collapsed ? "13.5px 16.5px 20.5px 22px" : "13.5px 0px 20.5px 80px",
		transition: "margin 0.25s"
	};
	const siderStyle = { boxShadow: "0px 1px 10px rgba(153, 153, 153, 0.5)" };
	const contentStyle = { padding: "2%" };
	const onCollapse = (collapsed) => {
		setCollapsed(collapsed);
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<React.Fragment>
				<Sider
					theme="dark"
					collapsible
					style={siderStyle}
					collapsed={collapsed}
					onCollapse={onCollapse}>
					<div className="logo" style={logoStyle}>
						<Logo iconcolor={white} />
					</div>
					<Menu theme="dark" defaultSelectedKeys={["9"]} mode="inline">
						<Menu.Item key="9" icon={<PicRightOutlined />}>
							<b>Overview</b>
						</Menu.Item>
						<SubMenu key="sub3" icon={<UnorderedListOutlined />} title={<b>Tasks</b>}>
							<Menu.Item key="8"> My Tasks</Menu.Item>
							<Menu.Item key="7"> All Tasks </Menu.Item>
						</SubMenu>
						<SubMenu key="sub2" icon={<TeamOutlined />} title={<b>Teams</b>}>
							<Menu.Item key="6">
								<Link to="project/dashboard/team">
									<PlusOutlined />
									Create
								</Link>
							</Menu.Item>
						</SubMenu>
						<SubMenu key="sub4" icon={<MessageOutlined />} title={<b>Chats</b>}>
							<Menu.Item key="12"> General</Menu.Item>
							<Menu.Item key="13">
								<Link to="project/dashboard/chat">
									<PlusOutlined />
									Create
								</Link>
							</Menu.Item>
						</SubMenu>
						<SubMenu key="sub1" icon={<UserOutlined />} title={<b>{owner}</b>}>
							<Menu.Item key="3">
								<Link
									to={{
										pathname: "/home",
										state: { to: "projectsList" }
									}}>
									Projects
								</Link>
							</Menu.Item>
							<Menu.Item key="1">
								<Link
									to={{
										pathname: "/home",
										state: { to: "userNotices" }
									}}>
									Notices
								</Link>
							</Menu.Item>
							<Menu.Item key="2">
								<Link
									to={{
										pathname: "/home",
										state: { to: "userSettings" }
									}}>
									Settings
								</Link>
							</Menu.Item>
						</SubMenu>
						<Menu.Item key="4" icon={<SettingOutlined />}>
							<b>Settings</b>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout>
					<PageHeader showlogo={false} width={700} heading={title} />
					<Content style={contentStyle}>{children}</Content>
				</Layout>
			</React.Fragment>
		</Layout>
	);
}

SiderContainer.propTypes = {
	owner: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node), //as you can render an array of elements
		PropTypes.element //for a single component/element
	]).isRequired
};

export default SiderContainer;
