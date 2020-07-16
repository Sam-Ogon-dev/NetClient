import {EXIT_ACCOUNT} from "../reducers/types";

export function ExitAccountAction() {
    return {
        type: EXIT_ACCOUNT,
        payload: {
            user_name: "",
            id: "",
            avatar: "",
            auth: null,
            favourites: ""
        }
    }
}