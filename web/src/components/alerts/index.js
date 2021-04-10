import PropTypes from "prop-types";
import { message } from "antd";

const SuccessAlert = (props) => message.success(props.message, props.timeOut && props.timeOut);
const ErrorAlert = (props) => message.error(props.message, props.timeOut && props.timeOut);
const InfoAlert = (props) => message.info(props.message, props.timeOut && props.timeOut);

SuccessAlert.proptype = {
	message: PropTypes.string.isRequired,
	timeOut: PropTypes.number
};
ErrorAlert.proptype = {
	message: PropTypes.string.isRequired,
	timeOut: PropTypes.number
};
InfoAlert.proptype = {
	message: PropTypes.string.isRequired,
	timeOut: PropTypes.number
};

export { SuccessAlert, ErrorAlert, InfoAlert };
