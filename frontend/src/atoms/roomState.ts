import { atom, useRecoilState, useSetRecoilState } from "recoil";

export const roomState = atom<string[]>({
  key: "roomState",
  default: [],
});

export function useRoomState() {
  return useRecoilState(roomState);
}

export function useSetRoomState() {
  return useSetRecoilState(roomState);
}
