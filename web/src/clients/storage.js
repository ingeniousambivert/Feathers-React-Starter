import safety from "@/helpers/safety";
import feathersClient from "@/helpers/feathers";

const storageService = feathersClient.service("storage");

export const createMediaStorageThunk = async (payload) => {
  return await safety(storageService.create(payload));
};

export const createStorageThunk = async (payload) => {
  return await safety(storageService.create(payload));
};

export const getStorageThunk = async (id) => {
  return await safety(storageService.get(id));
};

export const removeStorageThunk = async (id) => {
  return await safety(storageService.remove(id));
};
