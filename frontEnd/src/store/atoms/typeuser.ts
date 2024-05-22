import { atom, RecoilState } from "recoil";

export const typeuser:RecoilState<string> = atom<string>({
    key:"typeuser",
    default:""
});