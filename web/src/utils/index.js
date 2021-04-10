export { Spinner } from "./spinner.js";
export { RandomGreet } from "./greet.js";
export * from "./colors.js";

function removeWhiteSpaces(string) {
	return string.replace(/\s/g, " ");
}

export { removeWhiteSpaces };
