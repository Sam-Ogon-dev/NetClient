import {ADDRESS} from "../../config";


//GET AVATAR
export async function getAvatar(id) {

    return await fetch(ADDRESS + `/user_files?avatar=${id}`)
        .then(r => r.blob())
        .then(r => {
            return URL.createObjectURL(r);
        });
}
