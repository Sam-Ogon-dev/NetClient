
//GET AVATAR
export async function getAvatar(user_name) {

    return await fetch(`http://localhost:3001/user_files?avatars=${user_name}.jpg`)
        .then(r => r.blob())
        .then(r => {
            return URL.createObjectURL(r);
        });
}