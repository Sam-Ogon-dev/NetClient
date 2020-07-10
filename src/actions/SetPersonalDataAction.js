import {SET_PERSONAL_AVATAR, SET_PERSONAL_DATA} from "../reducers/types";
import {getAvatar} from "../components/SERVICES/services";

export function SetPersonalDataAction(user_name, id) {
        return async dispatch => {
            const avatar = await getAvatar(user_name);
            dispatch({
                type: SET_PERSONAL_DATA,
                payload: {
                    user_name,
                    id,
                    avatar: avatar,
                    auth: "true"
                }
            });
        }
}

export function SetPersonalAvatarAction(state) {
    return async dispatch => {
        const avatar = await getAvatar(state.user_name);
        dispatch({
            type: SET_PERSONAL_AVATAR,
            payload: {...state, avatar: avatar}
        });
    }
}