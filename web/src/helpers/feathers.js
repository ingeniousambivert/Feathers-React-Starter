import feathers from "@feathersjs/client";
import auth from "@feathersjs/authentication-client";
import rest from "@feathersjs/rest-client";
import axios from "axios";
import { appJWTKey } from "@/utils/constants";

const BASE_URL = import.meta.env.VITE_APP_API_URL;

function createFeathersClient(responseType) {
  const client = feathers();
  client.configure(rest(BASE_URL).axios(axios.create({ responseType })));
  client.configure(auth({ storageKey: appJWTKey }));
  return client;
}

const feathersClient = createFeathersClient("json");
const feathersBufferClient = createFeathersClient("arraybuffer");

feathersClient
  .reAuthenticate()
  .then((data) => {
    const jwt = typeof data.accessToken === "string" ? data.accessToken : null;
    if (jwt) {
      feathersBufferClient.authentication.setAccessToken(jwt);
      feathersBufferClient.configure((client) => {
        client.hooks({
          before: {
            all: [
              (context) => {
                context.params = {
                  ...context.params,
                  headers: {
                    ...(context.params.headers || {}),
                    Authorization: `Bearer ${jwt}`
                  }
                };
                return context;
              }
            ]
          }
        });
      });
    } else {
      console.error("Malformed JWT:", jwt);
    }
  })
  .catch((error) => {
    console.error("Reauthentication error:", error);
  });

export { BASE_URL, createFeathersClient, feathersBufferClient };
export default feathersClient;
