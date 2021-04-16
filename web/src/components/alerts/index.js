import { message } from "antd";

const SuccessAlert = (params) => message.success(params);
const ErrorAlert = (params) => message.error(params);
const InfoAlert = (params) => message.info(params);

export { SuccessAlert, ErrorAlert, InfoAlert };
