import { selector } from "recoil";
import { userState } from "../atoms/userState";

export const name = selector({
    key: "name",
    get: ({get}) => {
        const state = get(userState);
        return state.name;
    }
});