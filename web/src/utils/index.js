export { Spinner } from "./spinner.js";
export { RandomGreet } from "./greet.js";
export * from "./colors.js";

function removeWhiteSpaces(string) {
	return string.replace(/\s/g, " ");
}

function transformAdminTable(data) {
	if (!data || !data.length) return null;
	else {
		return data.map((item) => {
			return {
				key: item._id,
				isActive: item.isActive,
				isVerified: item.isVerified,
				name: `${item.firstname} ${item.lastname}`,
				email: item.email,
				permissions: item.permissions.toString(),
				lastLoggedIn: item.lastLoggedIn
			};
		});
	}
}

export { removeWhiteSpaces, transformAdminTable };
