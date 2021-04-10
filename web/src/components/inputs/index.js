import React from "react";
import { Input, Form } from "antd";
import { LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const { TextArea, Search } = Input;

const SimpleInput = (props) => <Input prefix={props.prefix} placeholder={props.placeholder} />;
const PasswordInput = (props) => (
	<Input.Password
		prefix={props.prefix ? props.prefix : <LockOutlined />}
		placeholder={props.placeholder ? props.placeholder : "Password"}
	/>
);
const TextAreaInput = (props) => <TextArea rows={4} placeholder={props.placeholder} />;
const SearchInput = (props) => (
	<Search
		placeholder={props.placeholder}
		allowClear
		onSearch={props.onSearch}
		style={props.style}
	/>
);

const SimpleFormInput = (props) => (
	<Form.Item name={props.name} rules={props.rules}>
		<Input prefix={props.prefix} placeholder={props.placeholder} />
	</Form.Item>
);

const PasswordFormInput = (props) => (
	<Form.Item name={props.name} rules={props.rules}>
		<Input.Password
			prefix={props.prefix ? props.prefix : <LockOutlined />}
			placeholder={props.placeholder ? props.placeholder : "Password"}
		/>
	</Form.Item>
);

const SimpleFormItem = (props) => (
	<Form.Item name={props.name} rules={props.rules}>
		{props.children}
	</Form.Item>
);

SimpleInput.propTypes = {
	prefix: PropTypes.element.isRequired,
	placeholder: PropTypes.string.isRequired
};

PasswordInput.propTypes = {
	prefix: PropTypes.element,
	placeholder: PropTypes.string
};

TextAreaInput.propTypes = {
	placeholder: PropTypes.string
};

SearchInput.propTypes = {
	placeholder: PropTypes.string.isRequired,
	onSearch: PropTypes.func.isRequired,
	style: PropTypes.object
};

SimpleFormInput.propTypes = {
	name: PropTypes.string.isRequired,
	rules: PropTypes.arrayOf(PropTypes.object).isRequired,
	prefix: PropTypes.element.isRequired,
	placeholder: PropTypes.string.isRequired
};

PasswordFormInput.propTypes = {
	name: PropTypes.string.isRequired,
	rules: PropTypes.arrayOf(PropTypes.object).isRequired,
	prefix: PropTypes.element,
	placeholder: PropTypes.string
};

SimpleFormItem.propTypes = {
	name: PropTypes.string,
	rules: PropTypes.arrayOf(PropTypes.object),
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
		.isRequired
};

export {
	SimpleInput,
	PasswordInput,
	TextAreaInput,
	SearchInput,
	SimpleFormInput,
	PasswordFormInput,
	SimpleFormItem
};
