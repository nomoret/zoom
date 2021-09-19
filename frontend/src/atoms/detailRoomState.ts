import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { DetailRoom } from "../types/detailRoom";

export const detailRoomState = atom<DetailRoom>({
  key: "detailRoomState",
  default: {
    name: "",
  },
});

export function useDetailRoomState() {
  return useRecoilState(detailRoomState);
}

export function useSetDetailRoomState() {
  return useSetRecoilState(detailRoomState);
}
