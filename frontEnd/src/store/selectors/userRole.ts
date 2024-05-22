import { selector } from "recoil";
import { userState } from "../atoms/userState";

export const userRole = selector({
    key: "userRole",
    get: ({get})=>{
        const state = get(userState);
        return state.userRole;
    }
});