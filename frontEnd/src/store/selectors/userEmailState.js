import { selector } from "recoil";
import { userState } from "../atoms/userState";

export const userEmailState = selector({
    key: "userEmailState",
    get: ({get}) => {
        const state = get(userState);
        return state.userEmail;
    }
});