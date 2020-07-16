import React from "react";
import favouritesActive from "../../assets/StarYellow.svg";
import favouritesInactive from "../../assets/Star.svg";


export default function Posts({news, personalDataReducer, SetFavouritesAction, favourites}) {

    return(
        <>
            {news.map(post => (
                <div key={post.id} className="post">
                    <div className="author">
                        <img src={URL.createObjectURL(new Blob([new Uint8Array(post.author.data)]))} className="avatar"/>
                        <div className="user-name">{post.user_name}</div>
                    </div>

                    <div className="post-content">
                        {post.image ?
                            <img src={URL.createObjectURL(new Blob([new Uint8Array(post.image.data)]))} className="post-image"/>
                            : ""
                        }

                        {post.text ?
                            <div className="post-text">
                                {post.text}
                            </div>
                            : ""
                        }


                    </div>

                    <div className="favourites">
                        <img src={favourites.includes(post.id.toString()) ? favouritesActive : favouritesInactive}
                             onClick={ () => SetFavouritesAction(personalDataReducer, post.id.toString()) }/>
                    </div>
                </div>
            ))}
        </>
    );
}

