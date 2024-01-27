import safety from "@/helpers/safety";
import feathersClient from "@/helpers/feathers";

const userService = feathersClient.service("users");
const userManageService = feathersClient.service("user-management");

export const signUpUserThunk = async (payload) => {
  return await safety(userService.create(payload));
};

export const signInUserThunk = async (payload) => {
  if (!payload) {
    await safety(feathersClient.reAuthenticate());
    return await safety(feathersClient.get("authentication"));
  } else {
    return await safety(
      feathersClient.authenticate({
        strategy: "local",
        ...payload
      })
    );
  }
};

export const signOutUserThunk = async () => {
  return await safety(feathersClient.logout());
};

export const verifyAccountThunk = async (token) => {
  return await safety(
    userManageService.create({
      action: "verifySignupLong",
      value: token
    })
  );
};

export const forgotPasswordThunk = async (email) => {
  return await safety(
    userManageService.create({
      action: "sendResetPwd",
      value: { email }
    })
  );
};

export const resetPasswordThunk = async ({ token, password }) => {
  return await safety(
    userManageService.create({
      action: "resetPwdLong",
      value: { token, password }
    })
  );
};

export const resendVerificationThunk = async (email) => {
  return await safety(
    userManageService.create({
      action: "resendVerifySignup",
      value: { email }
    })
  );
};

export const updateUserThunk = async (id, updatedData) => {
  return await safety(userService.patch(id, updatedData));
};

export const getUserThunk = async (id) => {
  return await safety(userService.get(id));
};
