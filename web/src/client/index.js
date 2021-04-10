import feathers from "@feathersjs/client";
import auth from "@feathersjs/authentication-client";
import rest from "@feathersjs/rest-client";
import axios from "axios";

const restClient = rest(process.env.REACT_APP_API_URL);
const feathersClient = feathers();

feathersClient.configure(restClient.axios(axios));
feathersClient.configure(feathers.authentication());
feathersClient.configure(
	auth({
		storage: window.localStorage,
		storageKey: "feathers-react-jwt"
	})
);
feathersClient.reAuthenticate().catch((error) => {
	return error;
});

export default feathersClient;
