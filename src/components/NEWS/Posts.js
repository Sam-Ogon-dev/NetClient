import React from "react";
import avatar from "../../assets/avatar.jpg";
import favouritesActive from "../../assets/StarYellow.svg";
import favouritesInactive from "../../assets/Star.svg";


export default function Post(news) {

    return(
        <div className="post">
            <div className="author">
                <img src={avatar} className="avatar"/>
                <div className="user-name">Saaam fgfgh</div>
            </div>

            <div className="post-content">
                <img src={avatar} className="post-image"/>
                <div className="post-text">dfvdfv dkvjdlkvmlkdf dnjdnfjvn ndjfnvjdfn njdfnvjfdn ndjfnvjdn
                    jdfnvjdfnn nnn ndfnvjdfnv njdfnvj
                </div>
            </div>

            <div className="favourites">
                <img src={favouritesInactive}/>
            </div>
        </div>
    );
}
