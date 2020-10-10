const axios = require("axios");
const hooks = require("./authentication.hooks");

const {
  AuthenticationService,
  JWTStrategy
} = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const {
  expressOauth,
  OAuthStrategy
} = require("@feathersjs/authentication-oauth");

class GoogleStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile);
    console.log(profile);
    return {
      ...baseData,
      picture: profile.picture,
      name: profile.name,
      email: profile.email
    };
  }
}

class FacebookStrategy extends OAuthStrategy {
  async getProfile(authResult) {
    // This is the oAuth access token that can be used
    // for Facebook API requests as the Bearer token
    const accessToken = authResult.access_token;

    const { data } = await axios.get("https://graph.facebook.com/me", {
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      params: {
        // There are
        fields: "id,name,email,picture"
      }
    });

    return data;
  }
  async getEntityData(profile) {
    // `profile` is the data returned by getProfile
    const baseData = await super.getEntityData(profile);

    return {
      ...baseData,
      picture: profile.profile_pic,
      name: profile.name,
      email: profile.email
    };
  }
}

module.exports = (app) => {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());
  authentication.register("facebook", new FacebookStrategy());
  authentication.register("google", new GoogleStrategy());

  app.use("/authentication", authentication);
  app.configure(expressOauth());
  app.hooks(hooks);
};
