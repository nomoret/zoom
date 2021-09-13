import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { User } from "../types/user";

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export function useUserState() {
  return useRecoilState(userState);
}

export function useSetUserState() {
  return useSetRecoilState(userState);
}
