/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { appJWTKey, appStorageKey } from "@/utils/constants";
import { isObjectEmpty } from "@/utils";

const defaultState = {
  current: {
    user: {}
  },
  static: {
    status: "",
    performed: [],
    loading: false,
    sync: []
  }
};

const useStore = create()(
  persist(
    (set, get) => ({
      ...defaultState,
      setLoading: (loading) => set((state) => ({ static: { ...state.static, loading } })),
      setCurrentUser: (payload) =>
        set((state) => {
          return { current: { ...state.current, user: payload } };
        }),
      setStaticSync: (payload) =>
        set((state) => {
          return { static: { ...state.static, sync: payload } };
        }),
      setStaticStatus: (payload) =>
        set((state) => {
          return { static: { ...state.static, status: payload } };
        }),
      setStaticPerformed: (payload) =>
        set((state) => {
          return { static: { ...state.static, performed: payload } };
        }),
      unsetAppData: () =>
        set(() => {
          return defaultState;
        })
    }),
    { name: appStorageKey }
  )
);

export const loadingSelector = (state) => state.static.loading;
export const syncSelector = (state) => state.static.sync;
export const authenticationSelector = (state) => {
  if (isObjectEmpty(state.current.user) === false && window.localStorage.getItem(appJWTKey)) return true;
  else return false;
};
export const currentSelector = (state) => state.current;
export const staticSelector = (state) => state.static;

export const setLoadingSelector = (state) => state.setLoading;
export const setCurrentUserSelector = (state) => state.setCurrentUser;
export const setStaticSyncSelector = (state) => state.setStaticSync;
export const setStaticStatusSelector = (state) => state.setStaticStatus;
export const setStaticPerformedSelector = (state) => state.setStaticPerformed;

export const unsetAppDataSelector = (state) => state.unsetAppData;

export default useStore;
