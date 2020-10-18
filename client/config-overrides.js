const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require("customize-cra");
const { addReactRefresh } = require("customize-cra-react-refresh");
const path = require("path");
const overrides = require("./src/theme/overrides");

module.exports = override(
	addWebpackAlias({
		"@client": path.resolve(__dirname, "src/client"),
		"@components": path.resolve(__dirname, "src/components"),
		"@containers": path.resolve(__dirname, "src/containers"),
		"@layouts": path.resolve(__dirname, "src/layouts"),
		"@slices": path.resolve(__dirname, "src/store/slices"),
		"@utils": path.resolve(__dirname, "src/utils"),
		"@pages": path.resolve(__dirname, "src/pages"),
		"@images": path.resolve(__dirname, "src/assets/images")
	}),
	fixBabelImports("import", {
		libraryName: "antd",
		libraryDirectory: "es",
		style: true
	}),
	addLessLoader({
		lessOptions: {
			javascriptEnabled: true,
			modifyVars: { ...overrides }
		}
	}),
	addReactRefresh()
);
