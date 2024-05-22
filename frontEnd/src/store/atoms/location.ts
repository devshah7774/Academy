import { atom } from "recoil";
import { Location } from "react-router-dom";
import { RecoilState } from "recoil";

export const location: RecoilState<Location<any>> = atom<Location>({
  key: "location",
  default: {
    pathname: '/',
    search: '',
    hash: '',
    state: null
  } as Location,
});