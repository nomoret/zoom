import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { Message } from "../types/message";
import { User } from "../types/user";

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export const messageListState = atom<Message[]>({
  key: "messageListState",
  default: [],
});

export function useUserState() {
  return useRecoilState(userState);
}

export function useMessageListState() {
  return useRecoilState(messageListState);
}

export function useSetMessageListState() {
  return useSetRecoilState(messageListState);
}
