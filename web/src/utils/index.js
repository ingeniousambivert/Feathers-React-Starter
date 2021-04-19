import moment from "moment";

function removeWhiteSpaces(string) {
	return string.replace(/\s/g, "");
}

function transformAdminTable(data) {
	if (!data || !data.length) return null;
	else {
		return data.map((item) => {
			return {
				_id: item._id,
				key: item._id,
				isActive: item.isActive,
				isVerified: item.isVerified,
				name: `${item.firstname} ${item.lastname}`,
				firstname: item.firstname,
				lastname: item.lastname,
				email: item.email,
				permissions: item.permissions.toString(),
				lastLogIn: moment(item.lastLogIn).toString(),
				createdAt: moment(item.createdAt).toString()
			};
		});
	}
}

export { Spinner } from "./spinner.js";
export { RandomGreet } from "./greet.js";
export * from "./colors.js";
export { removeWhiteSpaces, transformAdminTable };
