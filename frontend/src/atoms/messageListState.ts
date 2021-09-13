import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { Message } from "../types/message";

export const messageListState = atom<Message[]>({
  key: "messageListState",
  default: [],
});

export function useMessageListState() {
  return useRecoilState(messageListState);
}

export function useSetMessageListState() {
  return useSetRecoilState(messageListState);
}
