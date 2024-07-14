import { atom, RecoilState } from "recoil";

export const isSideBarOpen:RecoilState<boolean> = atom<boolean>({
    key:"isSideBarOpen",
    default:false
});

export const theme:RecoilState<boolean> = atom<boolean>({
    key:"theme",
    default: false
});