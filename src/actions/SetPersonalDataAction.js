import {SET_PERSONAL_AVATAR, SET_PERSONAL_DATA} from "../reducers/types";
import {getAvatar} from "../components/SERVICES/services";
import cookie from "react-cookies";
import {ADDRESS} from "../config";


function changeFavourites(favourites, id) {
    fetch(ADDRESS + "/changeFavourites", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ favourites: favourites, id })
    }).then(() => {
        cookie.save("favourites",`:${favourites}`);
    });
}





export function SetPersonalDataAction(state, user_name, id, favourites = "") {
        return async dispatch => {
            const avatar = await getAvatar(id);
            dispatch({
                type: SET_PERSONAL_DATA,
                payload: {...state, user_name, id, auth: "true", avatar, favourites: favourites.split(":")}
            });
        }
}

export function SetPersonalAvatarAction(state) {
    return async dispatch => {
        const avatar = await getAvatar(state.id);
        dispatch({
            type: SET_PERSONAL_AVATAR,
            payload: {...state, avatar}
        });
    }
}

export function SetFavouritesAction(state, postID) {

    let favourites = state.favourites;
    const indexPostID = favourites.indexOf(postID);


    if (indexPostID >= 0) {
        favourites.splice(indexPostID, 1);
    } else {
        favourites.push(postID);
    }

    changeFavourites(favourites.join(":"), state.id);


    return {
        type: SET_PERSONAL_DATA,
        payload: { ...state, favourites }
    }

}