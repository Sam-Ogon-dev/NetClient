import {EXIT_ACCOUNT, SET_PERSONAL_AVATAR, SET_PERSONAL_DATA} from "./types";
import cookie from "react-cookies";

function initialState() {
    if (cookie.load("auth") === "true") {
        return {
            user_name: cookie.load("user_name"),
            id: +cookie.load("id"),
            avatar: "",
            auth: cookie.load("auth"),
            favourites: cookie.load("favourites").split(":")
        }
    } else if (cookie.load("auth") === "process") {
        cookie.save("auth", "process");
        return {
            user_name: "",
            id: "",
            avatar: "",
            auth: cookie.load("auth"),
            favourites: ""
        }
    } else {
        cookie.save("auth", "process");
        window.location.assign("/");
        return {
            user_name: "",
            id: "",
            avatar: "",
            auth: cookie.load("auth"),
            favourites: ""
        }
    }
}

export function personalDataReducer(state = initialState(), action) {
    if(action.type === SET_PERSONAL_DATA || action.type === SET_PERSONAL_AVATAR) {
        return {
                user_name: action.payload.user_name,
                id: action.payload.id,
                avatar: action.payload.avatar,
                auth: action.payload.auth,
                favourites: action.payload.favourites
                }
    }

    if(action.type === EXIT_ACCOUNT) {
        return {
            user_name: action.payload.user_name,
            id: action.payload.id,
            avatar: action.payload.avatar,
            auth: action.payload.auth,
            favourites: action.payload.favourites
        }
    }
    return state;
}